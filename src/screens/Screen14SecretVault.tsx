import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomPhotos } from '../data/photos';

interface Props {
  onComplete: () => void;
}

export default function Screen14SecretVault({ onComplete }: Props) {
  const [opened, setOpened] = useState(false);
  const vaultPhotos = getRandomPhotos(6);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-slate-900 relative">
      <AnimatePresence>
        {!opened ? (
          <motion.div
            key="vault"
            exit={{ scale: 1.5, opacity: 0 }}
            className="flex flex-col items-center"
          >
            <div 
              onClick={() => setOpened(true)}
              className="w-48 h-48 rounded-full border-8 border-yellow-500 bg-yellow-900/50 flex items-center justify-center cursor-pointer hover:bg-yellow-800/50 transition-colors shadow-[0_0_50px_rgba(234,179,8,0.5)]"
            >
              <span className="text-6xl">💎</span>
            </div>
            <h2 className="text-3xl font-bold mt-8 text-yellow-500">Secret Vault</h2>
            <p className="text-gray-400 mt-2">Tap to unlock hidden treasures</p>
          </motion.div>
        ) : (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-5xl flex flex-col items-center"
          >
            <h2 className="text-4xl font-bold mb-8 text-yellow-400">Vault Contents</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {vaultPhotos.map((photo, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="aspect-square rounded-xl overflow-hidden border-2 border-yellow-500/30"
                >
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>

            <button
              onClick={onComplete}
              className="px-8 py-3 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-400 transition-colors"
            >
              Proceed to Finale
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
