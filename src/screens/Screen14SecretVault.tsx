import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomPhotos } from '../data/photos';

interface Props {
  onComplete: () => void;
}

const wordsWorthKeeping = [
  "You are braver than you believe.",
  "Your kindness matters more than you know.",
  "Every day is a chance to become stronger.",
  "You deserve all the good things coming your way.",
  "Your smile is contagious and powerful.",
  "You have already overcome so much.",
  "Trust yourself more.",
  "Your voice deserves to be heard."
];

const futureWishes = [
  "May your dreams become reality through your determination.",
  "Wishing you success in every path you choose.",
  "May you always believe in your own strength.",
  "I hope you find joy in every moment.",
  "May your future be filled with purpose and peace.",
  "Wishing you growth, happiness, and endless possibilities."
];

export default function Screen14SecretVault({ onComplete }: Props) {
  const [stage, setStage] = useState<'closed' | 'photos' | 'words' | 'wishes' | 'countdown'>('closed');
  const [countdown, setCountdown] = useState(3);
  const vaultPhotos = getRandomPhotos(8);

  const handleCountdown = () => {
    setStage('countdown');
    let count = 3;
    const interval = setInterval(() => {
      count--;
      setCountdown(count);
      if (count === 0) {
        clearInterval(interval);
        setTimeout(onComplete, 1500);
      }
    }, 1000);
  };

  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-b from-transparent via-[#05000D] to-[#000000] relative overflow-auto no-scrollbar">
      <AnimatePresence mode="wait">
        {stage === 'closed' && (
          <motion.div
            key="vault"
            exit={{ scale: 1.5, opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStage('photos')}
              className="w-40 sm:w-48 md:w-56 h-40 sm:h-48 md:h-56 rounded-full flex items-center justify-center cursor-pointer transition-all"
              style={{
                background: 'rgba(255, 217, 138, 0.2)',
                border: '4px solid rgba(255, 217, 138, 0.5)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 50px rgba(255, 217, 138, 0.3)',
              }}
            >
              <span className="text-6xl sm:text-7xl md:text-8xl">💎</span>
            </motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-6 md:mt-8 text-[#FFB703]">Secret Vault</h2>
            <p className="text-gray-400 mt-2 md:mt-3 text-sm sm:text-base">Tap to unlock hidden treasures</p>
          </motion.div>
        )}

        {stage === 'photos' && (
          <motion.div
            key="photos"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="w-full max-w-6xl flex flex-col items-center py-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#FFB703] to-[#FF0A54]">Hidden Photo Collection</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-8 md:mb-12 w-full px-2">
              {vaultPhotos.map((photo, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square rounded-lg md:rounded-xl overflow-hidden cursor-pointer"
                  style={{
                    border: '2px solid rgba(255, 217, 138, 0.3)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <img src={photo} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform" />
                </motion.div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStage('words')}
              className="px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-white text-sm sm:text-base transition-all"
              style={{
                background: 'rgba(255, 217, 138, 0.3)',
                border: '2px solid rgba(255, 217, 138, 0.5)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 15px rgba(255, 217, 138, 0.2)',
              }}
            >
              Continue
            </motion.button>
          </motion.div>
        )}

        {stage === 'words' && (
          <motion.div
            key="words"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="w-full max-w-3xl flex flex-col items-center py-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#9D4EDD] to-[#00F5D4]">Words Worth Keeping</h2>
            <div className="space-y-3 md:space-y-4 mb-8 md:mb-12 w-full px-4 sm:px-0">
              {wordsWorthKeeping.map((word, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-3 sm:p-4 md:p-5 rounded-lg md:rounded-xl text-gray-200 italic text-sm sm:text-base border-l-4"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(183, 157, 255, 0.3)',
                    borderLeftColor: 'rgba(183, 157, 255, 0.6)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  "{word}"
                </motion.div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStage('wishes')}
              className="px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-white text-sm sm:text-base transition-all"
              style={{
                background: 'rgba(183, 157, 255, 0.3)',
                border: '2px solid rgba(183, 157, 255, 0.5)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 15px rgba(183, 157, 255, 0.2)',
              }}
            >
              Continue
            </motion.button>
          </motion.div>
        )}

        {stage === 'wishes' && (
          <motion.div
            key="wishes"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="w-full max-w-3xl flex flex-col items-center py-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#FF0A54] to-[#9D4EDD]">Future Wishes</h2>
            <div className="space-y-3 md:space-y-4 mb-8 md:mb-12 w-full px-4 sm:px-0">
              {futureWishes.map((wish, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-3 sm:p-4 md:p-5 rounded-lg md:rounded-xl text-gray-200 text-sm sm:text-base border-l-4"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 183, 213, 0.3)',
                    borderLeftColor: 'rgba(255, 183, 213, 0.6)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  "✨ {wish}"
                </motion.div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCountdown}
              className="px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold text-white text-sm sm:text-base transition-all"
              style={{
                background: 'rgba(255, 183, 213, 0.3)',
                border: '2px solid rgba(255, 183, 213, 0.5)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 15px rgba(255, 183, 213, 0.2)',
              }}
            >
              Open the Finale
            </motion.button>
          </motion.div>
        )}

        {stage === 'countdown' && (
          <motion.div
            key="countdown"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              className="text-7xl sm:text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF0A54] to-[#9D4EDD] mb-4"
            >
              {countdown}
            </motion.div>
            <p className="text-base sm:text-lg md:text-xl text-gray-300">Preparing something special...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
