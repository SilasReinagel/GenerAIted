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

async function loadArtCards() {
  try {
    const artCardsData = await readFile(artCardsPath, 'utf8');
    artCards = JSON.parse(artCardsData).artCards;
  } catch (error) {
    console.error('Error reading art cards:', error);
    artCards = [];
  }
}

loadArtCards();

// Serve static files from the assets directory
app.use('/assets', express.static(join(__dirname, '..', 'assets')));

// Basic route
app.get('/', (req, res) => {
  res.send('GenerAIted Server');
});

// New route to serve art cards
app.get('/api/artcards', (req, res) => {
  console.log('Received request for art cards');
  console.log('Art cards:', artCards);
  res.json({ artCards });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected');

  // ATTN: Implement game logic, matchmaking, and real-time communication

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 7613;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS origin: ${process.env.CLIENT_URL || 'http://localhost:9821'}`);
  console.log(`Serving static files from: ${join(__dirname, '..', 'assets')}`);
});
