// @ts-check
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArtCard from '../components/ArtCard';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isDrawing, setIsDrawing] = useState(false);

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
        setIsDrawing(true);
        const newCard = deck[0];
        setTimeout(() => {
          setHand(prevHand => [...prevHand, newCard]);
          setDeck(prevDeck => prevDeck.slice(1));
          setIsDrawing(false);
        }, 500);
      }
      setCurrentPrompt(getRandomPrompt());
      setPlayedCard(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-cover bg-center text-white p-4" style={{ backgroundImage: `url(${bgImage})`, backgroundColor: 'rgba(0, 0, 0, 0.7)', backgroundBlendMode: 'darken' }}>
      <Header />

      <div className="flex w-full mt-8">
        <div className="w-full p-4 flex flex-col items-center justify-center">
          <div className="mb-8 max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-2">Current Prompt:</h2>
            <p className="text-xl bg-gray-800 bg-opacity-75 p-4 rounded-lg">{currentPrompt}</p>
          </div>

          <AnimatePresence>
            {playedCard && (
              <motion.div
                key={playedCard.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="mb-8 flex flex-col items-center justify-center"
              >
                <div className="flex" style={{ transform: 'scale(0.75) translateY(-3rem)' }}>
                  <ArtCard {...playedCard} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="fixed bottom-[-300px] left-0 right-0 flex justify-center items-end pb-4 overflow-hidden h-[900px]">
        <div className="flex space-x-[-100px]">
          {hand.map((card, index) => {
            const isCenter = index === Math.floor(HAND_SIZE / 2);
            const isLeft = index < Math.floor(HAND_SIZE / 2);
            const translateY = -60 - Math.abs(Math.sin((index / (HAND_SIZE - 1)) * Math.PI)) * 20;
            const rotate = isCenter ? 0 : isLeft ? -10 + (index * (20 / (HAND_SIZE - 1))) : 10 - ((HAND_SIZE - 1 - index) * (20 / (HAND_SIZE - 1)));
            return (
              <motion.div 
                key={card.id} 
                className="cursor-pointer"
                initial={{
                  y: translateY,
                  rotate: rotate,
                  zIndex: 0,
                  filter: 'drop-shadow(0 40px 40px rgba(0, 0, 0, 0.6))'
                }}
                animate={{
                  y: translateY,
                  rotate: rotate,
                  zIndex: 0,
                  filter: 'drop-shadow(0 40px 40px rgba(0, 0, 0, 0.6))'
                }}
                whileHover={{
                  y: -300,
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
          {isDrawing && (
            <motion.div
              className="absolute right-[-100px] bottom-[240px]"
              initial={{ x: 100, y: -100, opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-[200px] h-[280px] bg-gray-800 rounded-lg"></div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Game;