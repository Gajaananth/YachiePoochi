import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { getRandomPhoto } from '../data/photos';

interface Props {
  onComplete: () => void;
}

const rewards = [
  "Kind Heart 💖",
  "Strong Spirit 💪",
  "Bright Smile ✨",
  "Courageous Soul 🦋",
  "Growing Stronger 🌱",
  "Birthday Star ⭐"
];

export default function Screen7EmbarrassmentWheel({ onComplete }: Props) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const controls = useAnimation();

  const spin = async () => {
    if (spinning || result) return;
    setSpinning(true);
    setResult(null);
    setPhoto(null);
    
    // Spin animation
    const targetRotation = 360 * 5 + Math.floor(Math.random() * 360);
    
    await controls.start({
      rotate: targetRotation,
      transition: { duration: 4, ease: "circOut" }
    });

    const index = Math.floor(((targetRotation % 360) / 360) * rewards.length);
    const selectedReward = rewards[index] || rewards[0];
    const selectedPhoto = getRandomPhoto();
    
    setResult(selectedReward);
    setPhoto(selectedPhoto);
    setSpinning(false);
  };

  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center p-4">
      <h2
        className="text-3xl font-bold mb-8 text-center"
        style={{
          background: 'linear-gradient(90deg, #FF0A54, #9D4EDD)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Spin the Wheel!
      </h2>

      <div className="relative w-64 h-64 md:w-80 md:h-80 mb-12">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-white drop-shadow-md" />
        
        <motion.div 
          animate={controls}
          className="w-full h-full rounded-full border-4 border-white/20 relative overflow-hidden shadow-[0_0_30px_rgba(236,72,153,0.3)]"
          style={{ background: 'conic-gradient(#ff69b4 0 60deg, #9370db 60deg 120deg, #00bfff 120deg 180deg, #ff69b4 180deg 240deg, #9370db 240deg 300deg, #00bfff 300deg 360deg)' }}
        >
          {rewards.map((reward, i) => {
            const rotation = i * 60;
            return (
              <div 
                key={i} 
                className="absolute w-full h-full flex items-start justify-center origin-center pointer-events-none"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <div className="mt-4 text-xs font-bold text-white max-w-[80px] text-center drop-shadow-md" style={{ transform: 'rotate(30deg)' }}>
                  {reward}
                </div>
              </div>
            );
          })}
        </motion.div>

        <button 
          onClick={spin}
          disabled={spinning || result !== null}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full text-black font-bold shadow-xl z-10 hover:scale-110 transition-transform disabled:opacity-50"
        >
          SPIN
        </button>
      </div>

      {result && photo && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center max-w-sm"
        >
          <h3 className="text-xl font-bold mb-4 text-yellow-400">You won: {result}</h3>
          <img src={photo} alt="Reward" className="w-full h-48 object-cover rounded-xl mb-4 border border-white/20" />
          <button 
            onClick={onComplete}
            className="px-6 py-2 bg-pink-500 rounded-full font-bold hover:bg-pink-400 transition-colors"
          >
            Claim & Continue
          </button>
        </motion.div>
      )}
    </div>
  );
}
