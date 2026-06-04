import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface Props {
  onCaught: () => void;
}

export default function Screen8CatchCake({ onCaught }: Props) {
  const [hits, setHits] = useState(0);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [message, setMessage] = useState('');

  const messages = [
    "Stop!",
    "Why are you chasing me?",
    "I'm innocent.",
    "This is cake abuse.",
    "I regret existing.",
    "Ouch!",
    "Please spare me!",
    "I'm just a cake!",
    "Why Yachie, why?",
    "Almost dead..."
  ];

  const moveCake = () => {
    setPosition({
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80
    });
  };

  useEffect(() => {
    const interval = setInterval(moveCake, Math.max(800 - hits * 50, 300));
    return () => clearInterval(interval);
  }, [hits]);

  const handleHit = () => {
    const newHits = hits + 1;
    setHits(newHits);
    setMessage(messages[Math.min(newHits - 1, messages.length - 1)]);
    
    if (newHits >= 10) {
      confetti({
        particleCount: 200,
        spread: 160,
        origin: { x: position.x / 100, y: position.y / 100 }
      });
      setTimeout(onCaught, 2000);
    } else {
      moveCake();
    }
  };

  if (hits >= 10) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4">
        <motion.h2 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-4xl md:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500"
        >
          CAKE DESTROYED!
        </motion.h2>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative overflow-hidden p-4">
      <div className="absolute top-10 left-0 w-full text-center pointer-events-none">
        <h2 className="text-2xl font-bold text-white mb-2">Catch the Escaping Cake</h2>
        <p className="text-pink-400">Hits: {hits} / 10</p>
        <p className="text-xl mt-4 text-red-300 font-bold">{message}</p>
      </div>

      <motion.div
        animate={{ left: `${position.x}%`, top: `${position.y}%` }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        onClick={handleHit}
        onTouchStart={handleHit}
        className="absolute w-20 h-20 -ml-10 -mt-10 text-6xl cursor-pointer select-none active:scale-75 transition-transform"
        style={{ zIndex: 50 }}
      >
        🎂
      </motion.div>
    </div>
  );
}
