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
    <div className="w-full flex-grow flex flex-col items-center justify-center p-6 sm:p-8 bg-gradient-to-b from-transparent via-[#05000D] to-[#000000]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#9D4EDD] to-[#FF0A54]">
          Wait...
        </h1>
        <p className="text-sm md:text-lg text-gray-300 max-w-md">Is it actually your birthday today?</p>
      </motion.div>

      <div className="relative w-full max-w-sm h-[200px] sm:h-[250px] flex items-center justify-center gap-6 sm:gap-8">
        <motion.button
          animate={{ x: yesPosition.x, y: yesPosition.y }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onMouseEnter={handleHoverOrTouch}
          onClick={() => tired && onVerify()}
          onTouchStart={handleHoverOrTouch}
          className="btn-glass-primary flex-1 flex sm:flex-none sm:w-[80px] sm:h-[80px] md:w-[90px] md:h-[90px] items-center justify-center text-sm sm:text-base font-bold"
          style={{
            boxShadow: '0 0 25px rgba(183, 157, 255, 0.3)',
            border: 'none',
          }}
        >
          YES
        </motion.button>

        <motion.button
          onClick={() => {}}
          onTouchStart={() => {}}
          className="btn-glass-outline flex-1 flex sm:flex-none sm:w-[80px] sm:h-[80px] md:w-[90px] md:h-[90px] items-center justify-center text-sm sm:text-base font-bold"
          style={{
            boxShadow: '0 0 25px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          NO
        </motion.button>
      </div>

      <div className="h-16 sm:h-20 mt-6 sm:mt-8 text-center flex flex-col items-center justify-center">
        {escapes > 0 && !tired && (
          <motion.p
            key={escapes}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-pink-400 font-bold text-sm sm:text-lg"
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
            <p className="text-xl sm:text-2xl font-bold text-yellow-400 mb-2">Okay okay...</p>
            <p className="text-sm md:text-lg text-gray-300">You win 😭</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}