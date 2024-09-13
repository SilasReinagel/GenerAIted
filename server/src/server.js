// @ts-check
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { app as firebaseApp, db } from './firebase.js';
import cors from 'cors';

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

// Basic route
app.get('/', (req, res) => {
  res.send('GenerAIted Server');
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
});
