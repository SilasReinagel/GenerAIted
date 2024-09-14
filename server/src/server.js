// @ts-check
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { app as firebaseApp, db } from './firebase.js';
import cors from 'cors';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:9821',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Read art cards from JSON file
const artCardsPath = join(__dirname, '..', 'assets', 'cards.db.json');
let artCards;

// Read prompts from JSON file
const promptsPath = join(__dirname, '..', 'assets', 'prompts.json');
let prompts;

async function loadData() {
  try {
    const artCardsData = await readFile(artCardsPath, 'utf8');
    artCards = JSON.parse(artCardsData).artCards;

    const promptsData = await readFile(promptsPath, 'utf8');
    prompts = JSON.parse(promptsData).prompts;
  } catch (error) {
    console.error('Error reading data:', error);
    artCards = [];
    prompts = [];
  }
}

loadData();

// Serve static files from the assets directory
app.use('/assets', express.static(join(__dirname, '..', 'assets')));

// Basic route
app.get('/', (req, res) => {
  res.send('GenerAIted Server');
});

// Route to serve art cards
app.get('/api/artcards', (req, res) => {
  res.json({ artCards });
});

// Route to serve prompts
app.get('/api/prompts', (req, res) => {
  res.json({ prompts });
});

// Game state
const games = new Map();
const waitingPlayers = [];

// ATTN: Implement game logic, matchmaking, and real-time communication
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle player joining the queue
  socket.on('joinQueue', (playerName) => {
    console.log(`${playerName} joined the queue`);
    waitingPlayers.push({ id: socket.id, name: playerName });
    
    // Check if we have enough players to start a game
    if (waitingPlayers.length >= 3) {
      const gamePlayers = waitingPlayers.splice(0, 3);
      const gameId = Date.now().toString();
      const game = {
        id: gameId,
        players: gamePlayers,
        currentRound: 0,
        maxRounds: 10,
        scores: {},
        currentJudge: 0,
        currentPrompt: null,
        submissions: [],
      };
      games.set(gameId, game);

      // Notify players that the game is starting
      gamePlayers.forEach((player) => {
        io.to(player.id).emit('gameStarting', { gameId, players: gamePlayers });
      });

      startNewRound(gameId);
    }
  });

  // Handle player submission
  socket.on('submitCard', ({ gameId, cardId }) => {
    const game = games.get(gameId);
    if (game && game.currentPrompt) {
      game.submissions.push({ playerId: socket.id, cardId });
      
      // Check if all non-judge players have submitted
      if (game.submissions.length === game.players.length - 1) {
        io.to(gameId).emit('judgePhase', { submissions: game.submissions });
      }
    }
  });

  // Handle judge's decision
  socket.on('judgeDecision', ({ gameId, winningSubmission }) => {
    const game = games.get(gameId);
    if (game) {
      const winner = game.players.find(p => p.id === winningSubmission.playerId);
      game.scores[winner.id] = (game.scores[winner.id] || 0) + 1;
      
      io.to(gameId).emit('roundResult', { 
        winner: winner.name, 
        winningCard: winningSubmission.cardId,
        scores: game.scores
      });

      // Check if the game is over
      if (game.currentRound >= game.maxRounds) {
        endGame(gameId);
      } else {
        startNewRound(gameId);
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    // Remove player from waiting queue if they disconnect
    const index = waitingPlayers.findIndex(p => p.id === socket.id);
    if (index !== -1) {
      waitingPlayers.splice(index, 1);
    }
    // ATTN: Handle player disconnection during a game
  });
});

function startNewRound(gameId) {
  const game = games.get(gameId);
  if (game) {
    game.currentRound++;
    game.currentJudge = (game.currentJudge + 1) % game.players.length;
    game.currentPrompt = getRandomPrompt();
    game.submissions = [];

    io.to(gameId).emit('newRound', {
      round: game.currentRound,
      judge: game.players[game.currentJudge].name,
      prompt: game.currentPrompt
    });
  }
}

function endGame(gameId) {
  const game = games.get(gameId);
  if (game) {
    const winner = Object.entries(game.scores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    io.to(gameId).emit('gameOver', { 
      winner: game.players.find(p => p.id === winner).name, 
      finalScores: game.scores 
    });
    games.delete(gameId);
  }
}

function getRandomPrompt() {
  // ATTN: Implement actual prompts
  const prompts = [
    "The most innovative AI application",
    "The funniest use of machine learning",
    "The most surprising result of a neural network",
    "The AI that's most likely to take over the world",
    "The best AI-generated pickup line"
  ];
  return prompts[Math.floor(Math.random() * prompts.length)];
}

// Start the server
const PORT = process.env.PORT || 7613;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS origin: ${process.env.CLIENT_URL || 'http://localhost:9821'}`);
  console.log(`Serving static files from: ${join(__dirname, '..', 'assets')}`);
});
