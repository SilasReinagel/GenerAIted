// @ts-check
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const navigate = useNavigate();

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  }, []);

  const handleTitleClick = () => {
    navigate('/');
  };

  return (
    <div className="fixed top-0 left-0 right-0 hidden md:flex justify-between items-center w-full bg-gray-800 bg-opacity-0 p-4">
      <h1 
        className="text-4xl font-bold cursor-pointer" 
        onClick={handleTitleClick}
      >
        GenerAIted Playtest
      </h1>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleFullscreen}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>
    </div>
  );
}

export default Header;