import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-full h-full object-cover opacity-30"
        style={{ transform: 'scale(1.1)' }}
        ref={(videoElement) => {
          if (videoElement) {
            videoElement.playbackRate = 0.3;
          }
        }}
      >
        <source src="/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-8">Welcome to GenerAIted Playtest</h1>
          <div className="space-y-4">
            <Link to="/game" className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 text-center w-64">
              Start Quick Playtest
            </Link>
            <Link to="/pixi" className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 text-center w-64">
              Start Pixi Playtest
            </Link>
            <Link to="/art-browser" className="block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 text-center w-64">
              Art Card Browser
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;