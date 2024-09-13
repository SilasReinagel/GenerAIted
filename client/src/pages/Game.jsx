import React, { useEffect, useState } from 'react';
import { socket } from '../socket';

function Game() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      setConnected(true);
    });

    socket.on('disconnect', () => {
      setConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Game Room</h1>
      <p>{connected ? 'Connected to server' : 'Disconnected from server'}</p>
      {/* ATTN: Implement game UI and logic */}
    </div>
  );
}

export default Game;