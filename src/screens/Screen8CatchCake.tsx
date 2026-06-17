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
    "Got me!",
    "Here we go again!",
    "Almost done!"
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
    
    if (newHits >= 3) {
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

  if (hits >= 3) {
    return (
      <div className="w-full flex-grow flex flex-col items-center justify-center p-4">
        <motion.h2 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-4xl md:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500"
        >
          CAKE CAUGHT! 🎉
        </motion.h2>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative overflow-hidden p-4 md:p-6 flex flex-col items-center justify-center">
      {/* Header Section */}
      <div className="absolute top-6 md:top-10 left-0 w-full text-center pointer-events-none z-10">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-3">Catch the Cake!</h2>
        <div className="flex justify-center gap-4 md:gap-6 text-sm md:text-base">
          <p className="text-[#FF0A54]">Taps: <span className="font-bold text-lg md:text-xl text-[#FFB703]">{hits}</span> / 3</p>
        </div>
        {message && (
          <motion.p
            key={message}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-lg md:text-2xl mt-3 md:mt-4 text-[#00F5D4] font-semibold"
          >
            {message}
          </motion.p>
        )}
      </div>

      {/* Cake - Larger on Mobile */}
      <motion.div
        animate={{ left: `${position.x}%`, top: `${position.y}%` }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        onClick={handleHit}
        onTouchStart={handleHit}
        className="absolute -ml-10 md:-ml-12 -mt-10 md:-mt-12 text-5xl md:text-7xl cursor-pointer select-none active:scale-75 transition-transform"
        style={{ zIndex: 50 }}
      >
        🎂
      </motion.div>

      {/* Completion Message */}
      {hits >= 3 && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
        >
          <div className="text-center">
            <motion.h2
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFB703] to-[#FF0A54]"
            >
              CAKE CAUGHT! 🎉
            </motion.h2>
          </div>
        </motion.div>
      )}
    </div>
  );
}
