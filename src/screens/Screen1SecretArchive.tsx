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
    <div className="relative w-full flex-grow flex flex-col items-center justify-center px-4 py-8">
      {/* Premium Blurred Background */}
      <div className={`absolute inset-0 grid grid-cols-3 md:grid-cols-5 gap-1 transition-all duration-[2000ms] ${isUnlocked ? 'blur-none opacity-100' : 'blur-2xl opacity-30'}`}>
        {backgroundPhotos.map((photo, idx) => (
          <div key={idx} className="relative w-full h-full">
            <img src={photo} alt="" className="object-cover w-full h-full" />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Main Card */}
      <motion.div
        animate={isShaking ? { x: [-8, 8, -8, 8, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-sm"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        <div className="p-6 sm:p-8 md:p-10 rounded-3xl text-center">
          {/* Icon */}
          <motion.div
            animate={isUnlocked ? { scale: 1.1, color: '#FFB703' } : {}}
            transition={{ type: 'spring' }}
            className="flex justify-center mb-6"
          >
            {isUnlocked ? (
              <Unlock size={56} className="text-[#FFB703]" />
            ) : (
              <Lock size={56} className="text-[#FF0A54]" />
            )}
          </motion.div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#9D4EDD] via-[#FF0A54] to-[#00F5D4]">
            SECRET ARCHIVE
          </h1>

          {/* Subtitle */}
          <p className="text-[#FFB703] font-semibold mb-2 tracking-widest uppercase text-xs sm:text-sm">
            ACCESS RESTRICTED
          </p>
          <p className="text-gray-300 text-xs sm:text-sm mb-6">
            Only Yachie May Enter
          </p>

          {!isUnlocked ? (
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className={`w-full px-4 py-3 sm:py-4 rounded-xl text-center uppercase tracking-widest transition-all ${
                  errorMsg
                    ? 'bg-red-500/20 border-2 border-red-500/50 text-red-100'
                    : 'bg-white/10 border border-white/20 text-white placeholder-white/50'
                } focus:outline-none focus:ring-2 focus:ring-[#9D4EDD] focus:bg-white/15 text-sm sm:text-base`}
              />
              {errorMsg && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-300 text-xs sm:text-sm"
                >
                  {errorMsg}
                </motion.p>
              )}
              <button
                type="submit"
                className="mt-2 px-6 py-3 sm:py-4 bg-gradient-to-r from-[#9D4EDD] to-[#FF0A54] rounded-xl font-bold text-white hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#9D4EDD]/30 text-sm sm:text-base"
              >
                Verify Identity
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[#FFB703] text-lg sm:text-xl font-bold mt-4"
            >
              ✓ Access Granted
              <p className="text-sm text-gray-300 mt-2">Welcome, Yachie</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
