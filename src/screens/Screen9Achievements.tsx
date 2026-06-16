import { motion } from 'framer-motion';

interface Props {
  onContinue: () => void;
}

const achievements = [
  { id: 1, title: "Kind Heart", icon: "💖" },
  { id: 2, title: "Strong Spirit", icon: "💪" },
  { id: 3, title: "Bright Smile", icon: "✨" },
  { id: 4, title: "Courageous Soul", icon: "🦋" },
  { id: 5, title: "Growing Stronger", icon: "🌱" },
  { id: 6, title: "Birthday Star", icon: "⭐" },
  { id: 7, title: "Inspiring Journey", icon: "🌟" }
];

export default function Screen9Achievements({ onContinue }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center p-4 sm:p-6 md:p-8 lg:p-12 overflow-y-auto bg-gradient-to-b from-transparent via-[#0A0E1A] to-[#050811] no-scrollbar">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 md:mb-16 mt-4 md:mt-0"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#B79DFF] via-[#FFB7D5] to-[#9ED8FF]">
          Achievements Unlocked
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-md">Celebrating your remarkable qualities.</p>
      </motion.div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl w-full mb-12 md:mb-16">
        {achievements.map((ach, idx) => (
          <motion.div
            key={ach.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1, type: 'spring', stiffness: 100 }}
            whileHover={{ scale: 1.03, translateY: -3 }}
            className="relative group"
          >
            {/* Glass Card Background */}
            <div className="absolute inset-0 rounded-2xl md:rounded-3xl">
              <div className="glass-card p-4 sm:p-6 md:p-8">
                {/* Icon Circle */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-14 sm:w-16 h-14 sm:h-16 rounded-full flex items-center justify-center text-3xl sm:text-4xl flex-shrink-0 mb-4 sm:mb-5"
                  style={{
                    background: 'linear-gradient(135deg, rgba(183, 157, 255, 0.3), rgba(255, 183, 213, 0.3))',
                    border: '2px solid rgba(183, 157, 255, 0.4)',
                  }}
                >
                  {ach.icon}
                </motion.div>

                {/* Content */}
                <div className="text-center">
                  <p className="text-xs sm:text-sm text-[#FFD98A] font-bold uppercase tracking-wider mb-1">Unlocked</p>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white leading-tight group-hover:text-[#FFB7D5] transition-colors">
                    {ach.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Hover Effect Glass Shine */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.3 }}
              className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, transparent, rgba(255,255,255,0.1), transparent)',
                transform: 'translateX(-100%)',
              }}
              transition={{
                opacity: 0.3,
                x: ['-100%', '100%', '100%'],
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Continue Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onContinue}
        className="btn-glass-primary px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 rounded-full font-bold text-white text-sm sm:text-base md:text-lg mb-8"
        style={{
          boxShadow: '0 0 30px rgba(183, 157, 255, 0.3)',
        }}
      >
        Next Challenge
      </motion.button>
    </div>
  );
}