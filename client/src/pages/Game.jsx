import React, { useEffect, useState } from 'react';
import { socket } from '../socket';
import ArtCardBrowser from '../components/ArtCardBrowser';

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Game Room</h1>
      <p className="mb-8">{connected ? 'Connected to server' : 'Disconnected from server'}</p>
      <ArtCardBrowser />
    </div>
  );
}

export default Game;