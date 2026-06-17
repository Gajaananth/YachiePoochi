import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { photoFiles } from '../data/photos';
import monkeyPic from '../assets/monkey.jpg';

export default function Screen15GrandFinale() {
  const [phase, setPhase] = useState<'fade' | 'text1' | 'text2' | 'photos' | 'lights' | 'fireworks' | 'message' | 'final'>('fade');

  useEffect(() => {
    const phases = [
      { phase: 'fade', delay: 500 },
      { phase: 'text1', delay: 2000 },
      { phase: 'text2', delay: 3000 },
      { phase: 'photos', delay: 3500 },
      { phase: 'lights', delay: 4500 },
      { phase: 'fireworks', delay: 5000 },
      { phase: 'message', delay: 5500 },
      { phase: 'final', delay: 7000 }
    ] as const;

    const timers = phases.map(({ phase: p, delay }) =>
      setTimeout(() => setPhase(p as any), delay)
    );

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  useEffect(() => {
    if (phase === 'fireworks') {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 8,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff69b4', '#00bfff', '#ffd700', '#ff6b9d']
        });
        confetti({
          particleCount: 8,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff69b4', '#00bfff', '#ffd700', '#ff6b9d']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [phase]);

  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center p-4 relative bg-black">
      {/* Phase: Fade to black */}
      {phase !== 'fade' && (
        <>
          {/* Phase: First message */}
          {phase === 'text1' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center z-20"
            >
              <motion.p
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl md:text-6xl font-light text-center text-gray-300 max-w-3xl px-4"
              >
                Every year changes a person.
              </motion.p>
            </motion.div>
          )}

          {/* Phase: Second message */}
          {(phase === 'text2' || phase === 'photos' || phase === 'lights' || phase === 'fireworks' || phase === 'message' || phase === 'final') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center z-20"
            >
              <motion.p
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl md:text-5xl font-light text-center text-gray-400 max-w-3xl px-4"
              >
                But some qualities are worth keeping forever.
              </motion.p>
            </motion.div>
          )}

          {/* Photo Collage Background */}
          {(phase === 'photos' || phase === 'lights' || phase === 'fireworks' || phase === 'message' || phase === 'final') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'photos' ? 0.3 : 0.5 }}
              className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 gap-2 p-4 z-0"
            >
              {photoFiles.map((photo, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="rounded-lg overflow-hidden"
                >
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                </motion.div>
              ))}
              <div className="absolute inset-0 bg-black/40" />
            </motion.div>
          )}

          {/* Floating Lights */}
          {(phase === 'lights' || phase === 'fireworks' || phase === 'message' || phase === 'final') && (
            <div className="absolute inset-0 z-10 pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-pink-400 shadow-[0_0_10px_#ec4899]"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: window.innerHeight,
                    opacity: 0
                  }}
                  animate={{
                    y: -100,
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    delay: i * 0.15,
                    repeat: Infinity
                  }}
                />
              ))}
            </div>
          )}

          {/* Main Message */}
          {(phase === 'message' || phase === 'final') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 flex items-center justify-center z-30"
            >
              <div className="text-center">
                <motion.h1
                  className="text-5xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 drop-shadow-lg"
                >
                  🎂 HAPPY BIRTHDAY YACHIE 🎂
                </motion.h1>
              </div>
            </motion.div>
          )}

          {/* Final Button */}
          {phase === 'final' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="absolute bottom-12 z-40"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPhase('final')}
                className="px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-bold text-lg text-white shadow-xl shadow-pink-500/30 hover:shadow-2xl transition-all"
              >
                One Last Surprise
              </motion.button>
            </motion.div>
          )}

          {/* Final Monkey Picture Message */}
          {phase === 'final' && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3, type: 'spring' }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 text-center"
            >
              <img src={monkeyPic} alt="Happy Birthday" className="max-w-[80vw] max-h-[60vh] object-contain rounded-2xl shadow-2xl border-4 border-pink-500 mb-6" />
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
