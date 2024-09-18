// @ts-check
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import HowToPlay from './HowToPlay';

function Header() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 hidden md:flex justify-between items-center w-full bg-gray-800 bg-opacity-0 p-4">
        <h1 
          className="text-4xl font-bold cursor-pointer" 
          onClick={handleTitleClick}
        >
          <img
            src="/apple-touch-icon.png"
            alt="GenerAIted Logo"
            className="w-8 h-8 mr-2 inline-block"
          />
          GenerAIted
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-2 rounded-full transition duration-300 relative group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-bold">
              How to Play
            </span>
          </button>
          <div className="relative group">
            <button
              onClick={toggleFullscreen}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-2 rounded-full transition duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isFullscreen ? "M9 20H5a2 2 0 01-2-2V6a2 2 0 012-2h4M15 20h4a2 2 0 002-2V6a2 2 0 00-2-2h-4M5 12h14" : "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"} />
              </svg>
            </button>
            <span className="absolute top-full right-0 mt-2 bg-gray-800 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-bold">
              Toggle Fullscreen
            </span>
          </div>
        </div>
      </div>

      {isModalOpen && <HowToPlay onClose={toggleModal} />}
    </>
  );
}

export default Header;