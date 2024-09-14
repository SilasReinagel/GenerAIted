import React from 'react';

function FullscreenButton({ isFullscreen, setIsFullscreen }) {
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <button
      onClick={toggleFullscreen}
      className="fixed top-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
    >
      {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
    </button>
  );
}

export default FullscreenButton;