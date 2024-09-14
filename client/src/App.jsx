import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import ArtBrowserPage from './pages/ArtBrowserPage';

function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <Router>
      <div className={`min-h-screen bg-gray-800 text-white relative ${isFullscreen ? 'fullscreen' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/art-browser" element={<ArtBrowserPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;