import React, { useState } from 'react';
import ArtCard from '../components/ArtCard';
import cardsData from '../../../assets/cards.db.json';
import Header from '../components/Header';

function ArtBrowserPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCards = cardsData.artCards.filter(card =>
    card.imagePath.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-4xl font-bold mb-8 text-center">Art Card Browser</h1>
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search cards..."
            className="w-full p-2 rounded bg-gray-800 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCards.map((card) => (
            <div key={card.id} className="bg-gray-800 p-4 rounded-lg">
              <ArtCard {...card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArtBrowserPage;