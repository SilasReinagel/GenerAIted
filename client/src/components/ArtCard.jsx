import React from 'react';

function ArtCard({ imagePath, title, description }) {
  return (
    <div className="max-w-xs rounded-3xl overflow-hidden shadow-lg bg-gray-800 m-3">
      <img className="w-full rounded-t-3xl" src={imagePath} alt={title} />
    </div>
  );
}

export default ArtCard;