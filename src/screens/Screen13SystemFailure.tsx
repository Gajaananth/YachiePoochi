import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface Props {
  onRecover: () => void;
}

export default function Screen13SystemFailure({ onRecover }: Props) {
  const [stage, setStage] = useState<'glitch' | 'countdown' | 'frozen' | 'reveal'>('glitch');
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (stage === 'glitch') {
      setTimeout(() => setStage('countdown'), 2000);
    } else if (stage === 'countdown') {
      if (count > 0) {
        setTimeout(() => setCount(c => c - 1), 1000);
      } else {
        setStage('frozen');
        setTimeout(() => {
          setStage('reveal');
          confetti({ particleCount: 300, spread: 200, origin: { y: 0.4 } });
        }, 2000);
      }
    }
  }, [stage, count]);

  if (stage === 'reveal') {
    return (
      <div className="w-full flex-grow flex flex-col items-center justify-center p-6 bg-pink-500">
        <motion.h1 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="text-5xl md:text-8xl font-bold text-white text-center mb-8 drop-shadow-2xl"
        >
          JUST KIDDING 😭
        </motion.h1>
        <button
          onClick={onRecover}
          className="px-8 py-4 bg-white text-pink-500 font-bold rounded-xl text-xl hover:scale-105 transition-transform shadow-xl"
        >
          Phew... Next!
        </button>
      </div>
    );
  }

  return (
    <div className={`w-full flex-grow flex flex-col items-center justify-center p-6 min-h-screen ${stage === 'frozen' ? 'bg-red-900' : 'bg-red-600'}`}>
      <motion.div
        animate={stage === 'glitch' ? { x: [-5, 5, -5, 5, 0], y: [5, -5, 5, -5, 0] } : {}}
        transition={{ repeat: Infinity, duration: 0.2 }}
        className="text-center"
      >
        <h1 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter">
          WARNING
        </h1>
        <p className="text-2xl md:text-4xl text-white font-mono uppercase">
          Birthday License Expired
        </p>
        
        {stage === 'countdown' && (
          <motion.div 
            key={count}
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-[150px] font-black text-white mt-8"
          >
            {count}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
