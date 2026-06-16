import { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onContinue: () => void;
}

export default function Screen12TimeMachine({ onContinue }: Props) {
  const [activeEra, setActiveEra] = useState<'past' | 'present' | 'future'>('past');

  const eras = {
    past: {
      title: "Past Yachie",
      color: "from-amber-700 to-orange-500",
      content: "A heart that always believed the best in people. Kindness came naturally, even when life wasn't always kind in return. A person who trusted easily because her intentions were always genuine."
    },
    present: {
      title: "Present Yachie",
      color: "from-pink-500 to-purple-600",
      content: "Stronger than before, yet still carrying the same kindness. Life taught lessons, but never took away your good heart. More confident, more resilient, and still wonderfully yourself."
    },
    future: {
      title: "Future Yachie",
      color: "from-cyan-400 to-blue-600",
      content: "A future filled with accomplishments earned through determination. The best chapters are still waiting to be written. A future achiever whose kindness will remain her greatest strength."
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-b from-transparent via-[#0A0E1A] to-[#050811] overflow-hidden">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#B79DFF] to-[#FFB7D5] tracking-wide"
      >
        Time Machine
      </motion.h2>

      {/* Timeline Selector */}
      <div className="flex gap-3 sm:gap-4 md:gap-6 mb-8 md:mb-12 w-full max-w-md justify-between relative px-2 sm:px-0">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-[#B79DFF]/20 via-[#FFB7D5]/20 to-[#9ED8FF]/20 -translate-y-1/2 -z-10" />

        {(['past', 'present', 'future'] as const).map((era) => (
          <motion.button
            key={era}
            onClick={() => setActiveEra(era)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`w-12 sm:w-14 h-12 sm:h-14 rounded-full font-bold flex items-center justify-center transition-all text-lg sm:text-xl ${
              activeEra === era
                ? 'scale-125'
                : 'hover:scale-110'
            }`}
            style={
              activeEra === era
                ? {
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '2px solid rgba(183, 157, 255, 0.6)',
                  boxShadow: '0 0 20px rgba(183, 157, 255, 0.4)',
                  color: '#FFD98A',
                }
                : {
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.5)',
                }
            }
          >
            {era === 'past' ? '🔙' : era === 'present' ? '📍' : '🔮'}
          </motion.button>
        ))}
      </div>

      {/* Content Card */}
      <motion.div
        key={activeEra}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-2xl rounded-2xl md:rounded-3xl overflow-hidden p-6 sm:p-8 md:p-10 text-center min-h-[280px] sm:min-h-[320px] flex flex-col items-center justify-center"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="absolute top-0 left-0 w-full h-1" style={{
          background: `linear-gradient(90deg, ${
            activeEra === 'past'
              ? '#FFD98A'
              : activeEra === 'present'
                ? '#FFB7D5'
                : '#9ED8FF'
          }, transparent)`,
        }} />

        <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r ${
          activeEra === 'past'
            ? 'from-[#FFD98A] to-[#FFB7D5]'
            : activeEra === 'present'
              ? 'from-[#FFB7D5] to-[#B79DFF]'
              : 'from-[#9ED8FF] to-[#B79DFF]'
        }`}>
          {eras[activeEra].title}
        </h3>

        <p className="text-base sm:text-lg md:text-xl text-gray-200 italic leading-relaxed">
          "{eras[activeEra].content}"
        </p>
      </motion.div>

      {/* Continue Button - Only visible on future */}
      <motion.button
        animate={{ opacity: activeEra === 'future' ? 1 : 0, pointerEvents: activeEra === 'future' ? 'auto' : 'none' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => activeEra === 'future' && onContinue()}
        className="mt-8 md:mt-12 px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 rounded-full font-semibold text-white text-sm sm:text-base md:text-lg transition-all"
        style={{
          background: 'rgba(183, 157, 255, 0.3)',
          border: '2px solid rgba(183, 157, 255, 0.5)',
          backdropFilter: 'blur(20px)',
        }}
      >
        Return to Present
      </motion.button>
    </div>
  );
}
