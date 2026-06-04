import { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onVerify: () => void;
}

export default function Screen2IdentityVerification({ onVerify }: Props) {
  const [escapes, setEscapes] = useState(0);
  const [yesPosition, setYesPosition] = useState({ x: 0, y: 0 });
  const [tired, setTired] = useState(false);

  const taunts = [
    "Too slow.",
    "Try again.",
    "Not convinced.",
    "Birthday proof required.",
    "You almost got me.",
    "Haha nope.",
    "Are you really Yachie?"
  ];

  const handleHoverOrTouch = () => {
    if (tired) return;

    if (escapes >= 7) {
      setTired(true);
      setYesPosition({ x: 0, y: 0 });
      return;
    }

    const randomX = (Math.random() - 0.5) * 300; // -150 to 150
    const randomY = (Math.random() - 0.5) * 300;

    setYesPosition({ x: randomX, y: randomY });
    setEscapes((prev) => prev + 1);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Wait...</h2>
        <p className="text-xl md:text-2xl text-gray-300">Is it actually your birthday today?</p>
      </motion.div>

      <div className="relative w-full max-w-md h-64 flex items-center justify-center gap-8">
        <motion.button
          animate={{ x: yesPosition.x, y: yesPosition.y }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onMouseEnter={handleHoverOrTouch}
          onClick={() => tired && onVerify()}
          onTouchStart={handleHoverOrTouch}
          className={`px-8 py-4 rounded-xl font-bold text-xl shadow-lg transition-colors ${tired ? 'bg-green-500 text-white' : 'bg-pink-500 text-white'}`}
          style={{ zIndex: 10 }}
        >
          YES
        </motion.button>

        <button
          onClick={() => {}} // Does absolutely nothing
          className="px-8 py-4 rounded-xl font-bold text-xl bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors shadow-lg"
        >
          NO
        </button>
      </div>

      <div className="h-16 mt-8 text-center flex flex-col items-center justify-center">
        {escapes > 0 && !tired && (
          <motion.p
            key={escapes}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-pink-400 font-bold text-lg"
          >
            {taunts[(escapes - 1) % taunts.length]}
          </motion.p>
        )}
        
        {tired && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <p className="text-2xl font-bold text-yellow-400 mb-2">Okay okay...</p>
            <p className="text-xl text-gray-300">You win 😭</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
