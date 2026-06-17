import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { photoFiles } from '../data/photos';
import monkeyPic from '../assets/monkey.jpg';

interface Props {
  onStartFinalSong: () => void;
}

type FinalePhase = 'fade' | 'text1' | 'text2' | 'photos' | 'lights' | 'fireworks' | 'message' | 'final';

export default function Screen15GrandFinale({ onStartFinalSong }: Props) {
  const [phase, setPhase] = useState<FinalePhase>('fade');
  const [loadingFinal, setLoadingFinal] = useState(false);
  const [showFinalImage, setShowFinalImage] = useState(false);

  useEffect(() => {
    // We stop at 'message'. 'final' is triggered by button click!
    const phases: Array<{ phase: Exclude<FinalePhase, 'final'>; delay: number }> = [
      { phase: 'fade', delay: 500 },
      { phase: 'text1', delay: 2000 },
      { phase: 'text2', delay: 3500 },
      { phase: 'photos', delay: 4500 },
      { phase: 'lights', delay: 5500 },
      { phase: 'fireworks', delay: 6500 },
      { phase: 'message', delay: 8000 }
    ];

    const timers = phases.map(({ phase: p, delay }) =>
      setTimeout(() => setPhase(p), delay)
    );

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  useEffect(() => {
    if (phase === 'fireworks' || phase === 'message' || phase === 'final') {
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
      if (phase === 'fireworks') frame();
    }
  }, [phase]);

  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center p-4 relative bg-black">
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
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl md:text-6xl font-light text-center text-gray-300 max-w-3xl px-4"
              >
                Every year changes a person.
              </motion.p>
            </motion.div>
          )}

          {/* Phase: Second message (Hides when message appears to clean up screen) */}
          {(phase === 'text2' || phase === 'photos' || phase === 'lights' || phase === 'fireworks') && (
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

          {/* Photo Collage Background (Fades out when message appears) */}
          {(phase === 'photos' || phase === 'lights' || phase === 'fireworks') && !loadingFinal && (
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
              <div className="absolute inset-0 bg-black/60" />
            </motion.div>
          )}

          {/* Main Happy Birthday Message */}
          {(phase === 'message' || phase === 'final') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center z-30"
            >
              <div className="text-center">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 drop-shadow-lg">
                  🎂 HAPPY BIRTHDAY YACHIE 🎂
                </h1>
              </div>

              {/* Show the button ONLY in 'message' phase, so it disappears after clicked */}
              {phase === 'message' && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (loadingFinal || showFinalImage) return;
                    setLoadingFinal(true);
                    onStartFinalSong();
                    setTimeout(() => {
                      setLoadingFinal(false);
                      setShowFinalImage(true);
                    }, 1000);
                  }}
                  className="mt-12 px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-bold text-lg text-white shadow-xl shadow-pink-500/30 hover:shadow-2xl transition-all cursor-pointer"
                >
                  One Last Surprise
                </motion.button>
              )}
            </motion.div>
          )}

          {/* Final Monkey Picture Surprise */}
          {loadingFinal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 text-white text-xl font-bold"
            >
              Loading...
            </motion.div>
          )}

          {showFinalImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring' }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-16 z-50 text-center"
            >
              <img src={monkeyPic} alt="Happy Birthday" className="max-w-[90vw] max-h-[50vh] object-contain rounded-2xl shadow-2xl border-4 border-pink-500" />
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
