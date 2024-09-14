import React from 'react';
import { Link } from 'react-router-dom';
import ArtCard from '../components/ArtCard';
import cardsData from '../../../assets/cards.db.json';

function ArtBrowserPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white p-4">
      <h1 className="text-4xl font-bold mb-8">Art Card Browser</h1>
      <div className="flex flex-wrap justify-center overflow-y-auto max-h-[calc(100vh-200px)]">
        {cardsData.artCards.map(card => (
          <ArtCard key={card.id} {...card} />
        ))}
      </div>
      <Link to="/" className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
        Return to Home
      </Link>
    </div>
  );
}

export default ArtBrowserPage;