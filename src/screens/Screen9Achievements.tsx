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
    <div className="w-full flex-grow flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 overflow-y-auto no-scrollbar min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4"
          style={{
            background: 'linear-gradient(90deg, #9D4EDD, #FF0A54, #00F5D4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Achievements Unlocked
        </h1>
        <p className="text-gray-300 text-sm md:text-base max-w-md">
          Celebrating your remarkable qualities.
        </p>
      </motion.div>

      {/* Achievements Grid - No absolute positioning */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-5xl w-full mb-10 sm:mb-12">
        {achievements.map((ach, idx) => (
          <motion.div
            key={ach.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1, type: 'spring', stiffness: 100 }}
            whileHover={{ scale: 1.03, translateY: -3 }}
            className="glass-card p-4 sm:p-5 md:p-6 flex flex-col items-center text-center group cursor-default"
          >
            {/* Icon Circle */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-14 sm:w-16 h-14 sm:h-16 rounded-full flex items-center justify-center text-3xl sm:text-4xl mb-3 sm:mb-4"
              style={{
                background: 'linear-gradient(135deg, rgba(157, 78, 221, 0.3), rgba(255, 10, 84, 0.3))',
                border: '2px solid rgba(157, 78, 221, 0.4)',
              }}
            >
              {ach.icon}
            </motion.div>

            {/* Content */}
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-1" style={{ color: '#FFB703' }}>
              Unlocked
            </p>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white leading-tight group-hover:text-[#FF0A54] transition-colors">
              {ach.title}
            </h3>
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
        className="px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 rounded-full font-bold text-white text-sm sm:text-base md:text-lg mb-8 flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, rgba(157, 78, 221, 0.4), rgba(255, 10, 84, 0.4))',
          border: '2px solid rgba(157, 78, 221, 0.5)',
          boxShadow: '0 0 30px rgba(157, 78, 221, 0.3)',
        }}
      >
        Next Challenge →
      </motion.button>
    </div>
  );
}