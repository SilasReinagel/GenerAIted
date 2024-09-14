import React, { useState, useEffect } from 'react';
import ArtCard from './ArtCard';

function ArtCardBrowser() {
  const [artCards, setArtCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:7613';
    console.log('Server URL:', serverUrl);
    const requestUrl = `${serverUrl}/api/artcards`;
    console.log('Fetching art cards from:', requestUrl);
    
    fetch(requestUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        console.log('Raw response:', data);
        return JSON.parse(data);
      })
      .then(jsonData => {
        console.log('Parsed data:', jsonData);
        setArtCards(jsonData.artCards);
      })
      .catch(error => {
        console.error('Error fetching art cards:', error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center overflow-y-auto max-h-[calc(100vh-200px)]">
      {artCards.map(card => (
        <ArtCard key={card.id} {...card} />
      ))}
    </div>
  );
}

export default ArtCardBrowser;