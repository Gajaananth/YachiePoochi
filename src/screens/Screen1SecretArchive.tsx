import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getRandomPhotos } from '../data/photos';

interface Props {
  onUnlock: () => void;
}

const backgroundPhotos = getRandomPhotos(10);

export default function Screen1SecretArchive({ onUnlock }: Props) {
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const errorMessages = [
    "Nice try stranger.",
    "Suspicious activity detected.",
    "You are definitely not Yachie.",
    "Birthday security has been alerted.",
    "Identity mismatch."
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase().trim() === 'yachie') {
      setIsUnlocked(true);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        onUnlock();
      }, 2500);
    } else {
      setIsShaking(true);
      setErrorMsg(errorMessages[Math.floor(Math.random() * errorMessages.length)]);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* Blurred Background Photos */}
      <div className={`absolute inset-0 grid grid-cols-5 grid-rows-2 gap-2 transition-all duration-[2000ms] ${isUnlocked ? 'blur-none opacity-100' : 'blur-xl opacity-40'}`}>
        {backgroundPhotos.map((photo, idx) => (
          <div key={idx} className="relative w-full h-full">
            <img src={photo} alt="" className="object-cover w-full h-full opacity-50" />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <motion.div
        animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="relative z-10 glass-panel p-8 md:p-12 rounded-3xl max-w-md w-11/12 text-center"
      >
        <motion.div
          animate={isUnlocked ? { scale: 1.2, color: '#4ade80' } : {}}
          className="flex justify-center mb-6"
        >
          {isUnlocked ? <Unlock size={64} className="text-green-400" /> : <Lock size={64} className="text-pink-400" />}
        </motion.div>

        <h1 className="text-2xl md:text-3xl font-bold mb-2 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
          SECRET BIRTHDAY ARCHIVE
        </h1>
        <p className="text-red-400 font-semibold mb-6 tracking-widest uppercase text-sm">
          Access Restricted
          <br />
          <span className="text-gray-300 text-xs">Only Yachie May Enter</span>
        </p>

        {!isUnlocked ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className={`px-4 py-3 rounded-xl bg-white/10 border outline-none focus:ring-2 focus:ring-pink-400 transition-all text-center tracking-widest uppercase ${errorMsg ? 'border-red-500' : 'border-white/20'}`}
            />
            {errorMsg && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm"
              >
                {errorMsg}
              </motion.p>
            )}
            <button
              type="submit"
              className="mt-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-bold text-white hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-pink-500/20"
            >
              Verify Identity
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-green-400 text-xl font-bold mt-4"
          >
            Access Granted. Welcome, Yachie.
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
