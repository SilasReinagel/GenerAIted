import React from 'react';

function ArtCard({ imagePath, title, isOrdinary, isBrowsing }) {
  return (
    <div className="max-w-xs rounded-3xl overflow-hidden shadow-lg bg-gray-800 m-3 relative">
      <img className="w-full rounded-t-3xl" src={imagePath} alt={title} />
      {isBrowsing && isOrdinary && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-red font-bold">X</span>
        </div>
      )}
    </div>
  );
}

export default ArtCard;