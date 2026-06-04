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
      content: "Tiny, chaotic, and already plotting to steal snacks."
    },
    present: {
      title: "Present Yachie",
      color: "from-pink-500 to-purple-600",
      content: "Certified drama queen with legendary main character energy."
    },
    future: {
      title: "Future Yachie",
      color: "from-cyan-400 to-blue-600",
      content: "Will still win arguments. Will still steal snacks. Will still be awesome."
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-slate-950">
      <h2 className="text-3xl font-bold mb-12 text-gray-300 tracking-widest uppercase">Time Machine</h2>

      <div className="flex gap-4 mb-12 w-full max-w-md justify-between relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 -z-10 -translate-y-1/2" />
        
        {(['past', 'present', 'future'] as const).map((era) => (
          <button
            key={era}
            onClick={() => setActiveEra(era)}
            className={`w-12 h-12 rounded-full font-bold flex items-center justify-center transition-all ${
              activeEra === era ? 'bg-white text-black scale-125 shadow-[0_0_20px_white]' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {era === 'past' ? '🔙' : era === 'present' ? '📍' : '🔮'}
          </button>
        ))}
      </div>

      <motion.div
        key={activeEra}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 rounded-3xl max-w-md w-full text-center min-h-[250px] flex flex-col items-center justify-center border-t-4 border-transparent relative overflow-hidden"
      >
        <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${eras[activeEra].color}`} />
        <h3 className={`text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r ${eras[activeEra].color}`}>
          {eras[activeEra].title}
        </h3>
        <p className="text-xl text-gray-300 italic">"{eras[activeEra].content}"</p>
      </motion.div>

      <motion.button
        animate={{ opacity: activeEra === 'future' ? 1 : 0 }}
        onClick={() => activeEra === 'future' && onContinue()}
        className="mt-12 px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
      >
        Return to Present
      </motion.button>
    </div>
  );
}
