import { motion } from 'framer-motion';

interface Props {
  onContinue: () => void;
}

const achievements = [
  { id: 1, title: "Professional Food Thief", icon: "🍕" },
  { id: 2, title: "Selfie Expert", icon: "📸" },
  { id: 3, title: "Certified Drama Queen", icon: "👑" },
  { id: 4, title: "Chaos Generator", icon: "🌪️" },
  { id: 5, title: "Birthday Legend", icon: "🎉" },
  { id: 6, title: "Main Character", icon: "✨" },
  { id: 7, title: "Snack Collector", icon: "🍪" }
];

export default function Screen9Achievements({ onContinue }: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center p-6 pt-12 overflow-y-auto bg-slate-900 no-scrollbar">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600">
          Achievements Unlocked
        </h2>
        <p className="text-gray-400 text-lg">A testament to your legendary existence.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full mb-12">
        {achievements.map((ach, idx) => (
          <motion.div
            key={ach.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.15, type: 'spring' }}
            whileHover={{ scale: 1.05 }}
            className="glass-panel p-6 rounded-2xl flex items-center gap-4 border-2 border-yellow-500/30 hover:border-yellow-400 transition-colors shadow-lg shadow-yellow-500/10"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-3xl shadow-inner">
              {ach.icon}
            </div>
            <div>
              <p className="text-xs text-yellow-500 font-bold uppercase tracking-wider mb-1">UNLOCKED</p>
              <h3 className="text-lg font-bold text-white leading-tight">{ach.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={onContinue}
        className="px-10 py-4 mb-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl font-bold text-xl text-white hover:scale-105 transition-transform shadow-xl shadow-orange-500/30"
      >
        Next Challenge
      </motion.button>
    </div>
  );
}
