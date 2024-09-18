// @ts-check
import React from 'react';

function HowToPlay({ onClose }) {
  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={handleBackgroundClick}
    >
      <div className="bg-gray-800 text-white p-8 rounded-lg max-w-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-3xl font-bold mb-4">How to Play GenerAIted Quick Playtest</h2>
        <p className="mb-4">
          Welcome to the GenerAIted Quick Playtest! In this version, you'll play as an AI Image Model, interpreting and describing images based on prompts.
        </p>
        <h3 className="text-2xl font-semibold mb-2">How to Play:</h3>
        <ol className="list-decimal list-inside mb-4">
          <li>You'll be shown a prompt describing an image.</li>
          <li>Interpret the prompt creatively, as if you were an AI image generator.</li>
          <li>Select an image from your hand that you would generate based on that prompt.</li>
          <li>Be as creative, absurd, or hilarious as you like!</li>
          <li>Repeat with new prompts to explore different creative possibilities.</li>
        </ol>
        <p className="mb-4">
          <strong>Remember:</strong> There's no scoring or winning in this playtest. The goal is to have fun and be as creative as possible!
        </p>
        <p className="mb-4">
          Enjoy unleashing your inner AI and coming up with outrageous interpretations. Let your imagination run wild!
        </p>
        <button
          onClick={onClose}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default HowToPlay;