import React from 'react';
import { Link } from 'react-router-dom';
import ArtCardBrowser from '../components/ArtCardBrowser';

function ArtBrowserPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-8">Art Card Browser</h1>
      <ArtCardBrowser />
      <Link to="/" className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
        Return to Home
      </Link>
    </div>
  );
}

export default ArtBrowserPage;