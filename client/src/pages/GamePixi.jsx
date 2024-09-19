// @ts-check
import React, { useState, useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import cardsData from '../../../assets/cards.db.json';
import promptsData from '../../../assets/prompts.json';
import bgImage from '../assets/bg.jpg';
import Header from '../components/Header';
import { Random } from 'random-js';
import { trackEvent } from '../analytics';

const HAND_SIZE = 7;
const CARD_WIDTH = 250;
const CARD_HEIGHT = 350;

/**
 * @typedef {Object} Card
 * @property {number} id
 * @property {string} imagePath
 */

/**
 * @typedef {Object} Prompt
 * @property {number} id
 * @property {string} text
 */

function GamePixi() {
  /** @type {[Card[], React.Dispatch<React.SetStateAction<Card[]>>]} */
  const [hand, setHand] = useState([]);
  /** @type {[Card[], React.Dispatch<React.SetStateAction<Card[]>>]} */
  const [deck, setDeck] = useState([]);
  /** @type {[Prompt, React.Dispatch<React.SetStateAction<Prompt>>]} */
  const [currentPrompt, setCurrentPrompt] = useState({ id: 0, text: '' });
  /** @type {[Card | null, React.Dispatch<React.SetStateAction<Card | null>>]} */
  const [playedCard, setPlayedCard] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const random = new Random();
  const [usedPrompts, setUsedPrompts] = useState(new Set());
  const [availablePrompts, setAvailablePrompts] = useState([...promptsData.prompts]);

  const pixiContainerRef = useRef(null);
  const appRef = useRef(/** @type {PIXI.Application | null} */ (null));

  useEffect(() => {
    initializeGame();
    initializePixiApp();

    return () => {
      if (appRef.current) {
        appRef.current?.destroy(true, { children: true, texture: true, baseTexture: true });
      }
    };
  }, []);

  useEffect(() => {
    if (appRef.current) {
      updatePixiStage();
    }
  }, [hand, playedCard, isDrawing]);

  const initializePixiApp = () => {
    if (pixiContainerRef.current && !appRef.current) {
      appRef.current = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x1099bb,
        resolution: window.devicePixelRatio || 1,
      });
      pixiContainerRef.current?.appendChild(appRef.current.view);

      // Add background
      PIXI.Assets.load(bgImage).then((texture) => {
        const background = new PIXI.Sprite(texture);
        background.width = window.innerWidth;
        background.height = window.innerHeight;
        appRef.current?.stage.addChild(background);
      });
    }
  };

  const updatePixiStage = () => {
    if (!appRef.current) return;

    // Clear existing children (except background)
    while (appRef.current.stage.children.length > 1) {
      appRef.current.stage.removeChildAt(1);
    }

    // Add hand cards
    const handContainer = new PIXI.Container();
    hand.forEach((card, index) => {
      PIXI.Assets.load(card.imagePath).then((texture) => {
        const cardSprite = new PIXI.Sprite(texture);
        cardSprite.width = CARD_WIDTH;
        cardSprite.height = CARD_HEIGHT;
        cardSprite.x = index * (CARD_WIDTH / 2);
        cardSprite.y = window.innerHeight - CARD_HEIGHT + Math.sin(index / (HAND_SIZE - 1) * Math.PI) * 50;
        cardSprite.interactive = true;
        cardSprite.cursor = 'pointer';
        cardSprite.on('pointerdown', () => playCard(card));
        handContainer.addChild(cardSprite);
      });
    });
    handContainer.x = (window.innerWidth - handContainer.width) / 2;
    appRef.current.stage.addChild(handContainer);

    // Add played card
    if (playedCard) {
      PIXI.Assets.load(playedCard.imagePath).then((texture) => {
        const playedCardSprite = new PIXI.Sprite(texture);
        playedCardSprite.width = CARD_WIDTH;
        playedCardSprite.height = CARD_HEIGHT;
        playedCardSprite.x = (window.innerWidth - CARD_WIDTH) / 2;
        playedCardSprite.y = (window.innerHeight - CARD_HEIGHT) / 2 - 100;
        appRef.current?.stage.addChild(playedCardSprite);
      });
    }

    // Add drawing card animation
    if (isDrawing && deck.length > 0) {
      PIXI.Assets.load(deck[0].imagePath).then((texture) => {
        const drawingCardSprite = new PIXI.Sprite(texture);
        drawingCardSprite.width = CARD_WIDTH;
        drawingCardSprite.height = CARD_HEIGHT;
        drawingCardSprite.x = window.innerWidth;
        drawingCardSprite.y = window.innerHeight - CARD_HEIGHT;
        appRef.current?.stage.addChild(drawingCardSprite);

        // Animate the drawing card
        const animate = () => {
          if (drawingCardSprite.x > window.innerWidth - CARD_WIDTH) {
            drawingCardSprite.x -= 10;
            requestAnimationFrame(animate);
          }
        };
        animate();
      });
    }
  };

  const initializeGame = () => {
    const shuffledCards = random.shuffle([...cardsData.artCards]);
    setHand(shuffledCards.slice(0, HAND_SIZE));
    setDeck(shuffledCards.slice(HAND_SIZE));
    setCurrentPrompt(getNextRandomPrompt());
  };

  const getNextRandomPrompt = () => {
    if (availablePrompts.length === 0) {
      // Reset available prompts when all have been used
      setAvailablePrompts([...promptsData.prompts]);
      setUsedPrompts(new Set());
    }

    const index = random.integer(0, availablePrompts.length - 1);
    const selectedPrompt = availablePrompts[index];

    // Remove the selected prompt from available prompts
    setAvailablePrompts(prevPrompts => prevPrompts.filter((_, i) => i !== index));
    
    // Add the selected prompt to used prompts
    setUsedPrompts(prevUsed => new Set(prevUsed).add(selectedPrompt.id));

    return selectedPrompt;
  };

  const playCard = (card) => {
    setPlayedCard(card);
    const updatedHand = hand.filter(c => c.id !== card.id);
    setHand(updatedHand);
    
    // Track the selected card event
    trackEvent('selectedCard', {
      cardId: card.id,
      promptId: currentPrompt.id,
      handCardIds: updatedHand.map(c => c.id)
    });
    
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
      const newPrompt = getNextRandomPrompt();
      setCurrentPrompt(newPrompt);
      setPlayedCard(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen text-white p-4">
      <Header />

      <div className="flex w-full mt-8">
        <div className="w-full p-4 flex flex-col items-center justify-center">
          <div className="mb-8 max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-2">Current Prompt:</h2>
            <p className="text-xl bg-gray-800 bg-opacity-75 p-4 rounded-lg">{currentPrompt.text}</p>
          </div>
        </div>
      </div>

      <div ref={pixiContainerRef} className="absolute inset-0"></div>
    </div>
  );
}

export default GamePixi;