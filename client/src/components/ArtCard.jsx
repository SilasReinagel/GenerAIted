import React from 'react';

function ArtCard({ imagePath, title, description }) {
  const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:7613';
  const fullImagePath = `${serverUrl}${imagePath}`;

  return (
    <div className="max-w-xs rounded-3xl overflow-hidden shadow-lg bg-gray-800 m-3">
      <img className="w-full rounded-t-3xl" src={fullImagePath} alt={title} />
    </div>
  );
}

export default ArtCard;