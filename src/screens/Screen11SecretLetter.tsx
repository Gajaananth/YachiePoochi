import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onContinue: () => void;
}

const letterLines = [
  "Dear Yachie,",
  "",
  "I couldn't just give you a normal birthday card.",
  "You deserve something as unique and dramatic as you are.",
  "",
  "Thank you for being the amazing sister you are.",
  "From stealing my snacks to taking 100 selfies on my phone...",
  "I wouldn't trade any of it.",
  "",
  "I hope this year brings you endless happiness, success,",
  "and a few less arguments (that you always win anyway).",
  "",
  "Happy Birthday!",
  "",
  "Love always."
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
      }, 50); // Typing speed
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setVisibleChars(0);
      }, line === "" ? 400 : 800); // Pause at end of line
      return () => clearTimeout(timer);
    }
  }, [currentLine, visibleChars]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-50" />
      
      <div className="z-10 w-full max-w-2xl font-serif text-gray-300 text-lg md:text-2xl leading-relaxed">
        {letterLines.slice(0, currentLine).map((line, idx) => (
          <p key={idx} className="min-h-[1.5em]">{line}</p>
        ))}
        {currentLine < letterLines.length && (
          <p className="min-h-[1.5em]">
            {letterLines[currentLine].substring(0, visibleChars)}
            <motion.span 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              |
            </motion.span>
          </p>
        )}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: finished ? 1 : 0 }}
        className="z-10 mt-16"
      >
        <button
          onClick={onContinue}
          disabled={!finished}
          className="px-8 py-3 border border-white/30 rounded-full hover:bg-white hover:text-black transition-colors"
        >
          Open the Vault
        </button>
      </motion.div>
    </div>
  );
}
