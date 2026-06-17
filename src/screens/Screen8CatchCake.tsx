import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface Props {
  onCaught: () => void;
}

export default function Screen8CatchCake({ onCaught }: Props) {
  const [hits, setHits] = useState(0);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [message, setMessage] = useState('');
  const [caught, setCaught] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const messages = [
    "Got me! 🎯",
    "Here we go again! 🏃",
    "Almost done! 🎉"
  ];

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const moveCake = useCallback(() => {
    setPosition({
      x: Math.max(5, Math.min(92, Math.random() * 90)),
      y: 10 + Math.random() * 70
    });
  }, []);

  useEffect(() => {
    if (caught) return;
    const delay = isMobile ? Math.max(650 - hits * 120, 250) : Math.max(900 - hits * 100, 400);
    const interval = setInterval(moveCake, delay);
    return () => clearInterval(interval);
  }, [hits, caught, moveCake, isMobile]);

  const handleHit = () => {
    if (caught) return;
    const newHits = hits + 1;
    setHits(newHits);
    setMessage(messages[Math.min(newHits - 1, messages.length - 1)]);
    
    if (newHits >= 3) {
      setCaught(true);
      confetti({
        particleCount: 200,
        spread: 160,
        origin: { x: position.x / 100, y: position.y / 100 }
      });
      setTimeout(onCaught, 2500);
    } else {
      moveCake();
    }
  };

  if (caught) {
    return (
      <div className="w-full flex-grow flex flex-col items-center justify-center p-6 min-h-screen">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="text-center"
        >
          <div className="text-7xl sm:text-8xl mb-6">🎂</div>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            style={{
              background: 'linear-gradient(90deg, #FFB703, #FF0A54)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            CAKE CAUGHT!
          </h2>
          <p className="text-xl text-gray-300">Great reflexes! 🎉</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full flex-grow flex flex-col min-h-screen relative">
      {/* Header - Fixed at top */}
      <div className="w-full text-center py-6 sm:py-8 px-4 z-20 relative">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ color: '#FFB703' }}>
          🎂 Catch the Cake!
        </h2>
        <div className="flex justify-center gap-6 text-base">
          <p style={{ color: '#FF0A54' }}>
            Taps: <span className="font-bold text-xl" style={{ color: '#FFB703' }}>{hits}</span> / 3
          </p>
        </div>
        {message && (
          <motion.p
            key={message}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-lg sm:text-xl mt-3 font-semibold"
            style={{ color: '#00F5D4' }}
          >
            {message}
          </motion.p>
        )}
      </div>

      {/* Game Area */}
      <div className="flex-grow relative w-full" style={{ minHeight: '60vh' }}>
        {/* Cake */}
        <motion.button
          animate={{ 
            left: `${position.x}%`, 
            top: `${position.y}%` 
          }}
          transition={{ type: 'spring', stiffness: isMobile ? 220 : 120, damping: isMobile ? 16 : 18 }}
          onClick={handleHit}
          onTouchEnd={(e) => { e.preventDefault(); handleHit(); }}
          className={`absolute ${isMobile ? 'text-4xl' : 'text-5xl'} sm:text-6xl md:text-7xl cursor-pointer select-none active:scale-75 transition-transform z-30 -translate-x-1/2 -translate-y-1/2`}
          style={{ touchAction: 'manipulation' }}
        >
          🎂
        </motion.button>

        {/* Guide Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <p className="text-white/10 text-xl font-bold">TAP THE CAKE!</p>
        </div>
      </div>
    </div>
  );
}
