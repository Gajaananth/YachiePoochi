import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { photoFiles } from '../data/photos';

export default function Screen15GrandFinale() {
  useEffect(() => {
    const duration = 15 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0000', '#00ff00', '#0000ff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0000', '#00ff00', '#0000ff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 grid-rows-4 opacity-20">
        {photoFiles.map((photo, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
            className="w-full h-full"
          >
            <img src={photo} alt="" className="w-full h-full object-cover" />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="z-10 text-center glass-panel p-8 md:p-12 rounded-[3rem] max-w-3xl w-full border border-pink-500/30 shadow-[0_0_100px_rgba(236,72,153,0.3)]"
      >
        <motion.h1 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 drop-shadow-lg"
        >
          🎂 HAPPY BIRTHDAY YACHIE 🎂
        </motion.h1>

        <p className="text-xl md:text-2xl text-gray-200 mb-6 font-semibold">
          Thank you for being the amazing sister you are.
        </p>
        
        <p className="text-lg md:text-xl text-gray-400 leading-relaxed italic">
          May your year be filled with happiness, laughter, success, adventure, unforgettable memories, and endless reasons to smile.
        </p>

        <div className="mt-12 flex justify-center gap-4">
          <span className="text-4xl animate-bounce">💖</span>
          <span className="text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>✨</span>
          <span className="text-4xl animate-bounce" style={{ animationDelay: '0.4s' }}>👑</span>
        </div>
      </motion.div>
    </div>
  );
}
