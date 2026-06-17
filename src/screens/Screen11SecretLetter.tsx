import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import serupadiPic from '../assets/serupadi.jpg';

interface Props {
  onContinue: () => void;
}

const letterLines = [
  "Dear Yachie,",
  "",
  "I didn't want to give you an ordinary birthday message.",
  "So I created something a little different, just for you.",
  "",
  "On your special day, I simply want to wish you happiness,",
  "good health, success, and peace in everything you do.",
  "",
  "You have always carried kindness within you,",
  "even during difficult moments.",
  "",
  "As time passes, I hope you continue growing stronger,",
  "believing in yourself more, and never losing that beautiful",
  "smile that makes you who you are.",
  "",
  "May this new year of your life bring wonderful opportunities,",
  "meaningful memories, and reasons to be proud of yourself.",
  "",
  "Stay strong.",
  "Keep smiling.",
  "Keep moving forward.",
  "",
  "Happy Birthday, Yachie."
];

export default function Screen11SecretLetter({ onContinue }: Props) {
  const [currentLine, setCurrentLine] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (currentLine >= letterLines.length) {
      setFinished(true);
      return;
    }

    const line = letterLines[currentLine];
    
    if (visibleChars < line.length) {
      const timer = setTimeout(() => {
        setVisibleChars(prev => prev + 1);
      }, 40);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setVisibleChars(0);
      }, line === "" ? 300 : 600);
      return () => clearTimeout(timer);
    }
  }, [currentLine, visibleChars]);

  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B001A] via-[#05000D] to-[#000000]" />

      {/* Content Container */}
      <div className="w-full flex flex-col lg:flex-row gap-8 items-center justify-center z-10">
        
        {/* Letter Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-xl rounded-2xl md:rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="p-6 sm:p-8 md:p-10 min-h-[50vh] flex flex-col justify-center">
            {/* Letter Text */}
            <div className="font-light text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed md:leading-8">
              {letterLines.slice(0, currentLine).map((line, idx) => (
                <p key={idx} className="min-h-[1.5em] md:min-h-[2em] mb-2 md:mb-3">
                  {line}
                </p>
              ))}
              {currentLine < letterLines.length && (
                <p className="min-h-[1.5em] md:min-h-[2em]">
                  {letterLines[currentLine].substring(0, visibleChars)}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="text-[#9D4EDD]"
                  >
                    |
                  </motion.span>
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bonus Serupadi Pop-Zoom (only visible after letter finishes) */}
        {finished && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.1, 1], opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
            className="flex flex-col items-center justify-center max-w-sm mt-4 lg:mt-0"
          >
            <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-pink-500 mb-4 w-64 h-64">
              <img src={serupadiPic} alt="Surprise" className="w-full h-full object-cover" />
            </div>
            <motion.p
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-xl md:text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-[#FF0A54]"
            >
              PLEASE TRY NOT TO COLLECT ANY MORE SERUPADIS THIS YEAR!
            </motion.p>
          </motion.div>
        )}
      </div>

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: finished ? 1 : 0 }}
        transition={{ delay: finished ? 2.5 : 0 }}
        className="mt-8 md:mt-12 z-10"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          disabled={!finished}
          className="px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 rounded-full font-semibold text-white text-sm sm:text-base md:text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: finished ? 'rgba(183, 157, 255, 0.4)' : 'rgba(183, 157, 255, 0.2)',
            border: '2px solid rgba(183, 157, 255, 0.4)',
            backdropFilter: 'blur(20px)',
            boxShadow: finished ? '0 0 20px rgba(183, 157, 255, 0.3)' : 'none',
          }}
        >
          Open the Vault
        </motion.button>
      </motion.div>
    </div>
  );
}
