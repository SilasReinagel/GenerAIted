import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold mb-8">GenerAIted</h1>
      <div className="flex flex-col space-y-4">
        <Link
          to="/game"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-xl transition duration-300 text-center"
        >
          Quick Play
        </Link>
        <Link
          to="/art-browser"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-xl transition duration-300 text-center"
        >
          Browse Art Cards
        </Link>
      </div>
    </div>
  );
}

export default Home;