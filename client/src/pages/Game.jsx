// @ts-check
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArtCard from '../components/ArtCard';
import { motion } from 'framer-motion';
import cardsData from '../../../assets/cards.db.json';
import promptsData from '../../../assets/prompts.json';
import bgImage from '../assets/bg.jpg';
import Header from '../components/Header';

const HAND_SIZE = 5;

function Game() {
  const [hand, setHand] = useState([]);
  const [deck, setDeck] = useState([]);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [playedCard, setPlayedCard] = useState(null);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...cardsData.artCards].sort(() => Math.random() - 0.5);
    setHand(shuffledCards.slice(0, HAND_SIZE));
    setDeck(shuffledCards.slice(HAND_SIZE));
    setCurrentPrompt(getRandomPrompt());
  };

  const getRandomPrompt = () => {
    return promptsData.prompts[Math.floor(Math.random() * promptsData.prompts.length)];
  };

  const playCard = (card) => {
    setPlayedCard(card);
    setHand(hand.filter(c => c.id !== card.id));
    
    setTimeout(() => {
      if (deck.length > 0) {
        const newCard = deck[0];
        setHand(prevHand => [...prevHand, newCard]);
        setDeck(prevDeck => prevDeck.slice(1));
      }
      setCurrentPrompt(getRandomPrompt());
      setPlayedCard(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-cover bg-center text-white p-4" style={{ backgroundImage: `url(${bgImage})`, backgroundColor: 'rgba(0, 0, 0, 0.7)', backgroundBlendMode: 'darken' }}>
      <Header />

      <div className="flex flex-col items-center w-full mt-20">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">Current Prompt:</h2>
          <p className="text-xl bg-gray-800 bg-opacity-75 p-4 rounded-lg">{currentPrompt}</p>
        </div>

        {playedCard && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Played Card:</h2>
            <ArtCard {...playedCard} />
          </div>
        )}
      </div>

      <div className="fixed bottom-[-240px] left-0 right-0 flex justify-center items-end pb-4 overflow-hidden h-[900px]">
        <div className="flex space-x-[-100px]">
          {hand.map((card, index) => {
            const isCenter = index === Math.floor(HAND_SIZE / 2);
            const isLeft = index < Math.floor(HAND_SIZE / 2);
            const translateY = -60 - Math.abs(Math.sin((index / (HAND_SIZE - 1)) * Math.PI)) * 20;
            const rotate = isCenter ? 0 : isLeft ? -10 + (index * (20 / (HAND_SIZE - 1))) : 10 - ((HAND_SIZE - 1 - index) * (20 / (HAND_SIZE - 1)));
            return (
              <motion.div 
                key={index} 
                className="cursor-pointer"
                initial={{
                  y: translateY,
                  rotate: rotate,
                  zIndex: 0,
                  filter: 'drop-shadow(0 40px 40px rgba(0, 0, 0, 0.6))'
                }}
                whileHover={{
                  y: -260,
                  zIndex: 100,
                  filter: 'drop-shadow(0 40px 40px rgba(0, 0, 0, 0.8))',
                  transition: { duration: 0.2, ease: "easeIn" }
                }}
                onClick={() => playCard(card)}
              >
                <ArtCard {...card} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Game;