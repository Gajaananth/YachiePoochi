import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

const questions = [
  {
    q: "Who steals snacks?",
    opts: ["A) Me", "B) Definitely Me"],
    ans: "Both",
    reaction: "We all know the truth. 🍿"
  },
  {
    q: "Who takes 100 photos for one upload?",
    opts: ["A) Yachie", "B) Yachie"],
    ans: "Both",
    reaction: "And 99 of them are exactly the same. 📸"
  },
  {
    q: "Who wins arguments?",
    opts: ["A) Yachie", "B) Yachie"],
    ans: "Both",
    reaction: "Even when you're wrong, you're right. 🙄"
  }
];

export default function Screen6PersonalityTest({ onComplete }: Props) {
  const [currentQ, setCurrentQ] = useState(0);
  const [showReaction, setShowReaction] = useState(false);

  const handleAnswer = () => {
    setShowReaction(true);
  };

  const nextQuestion = () => {
    setShowReaction(false);
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const q = questions[currentQ];

  return (
    <div className="w-full flex-grow flex items-center justify-center p-4">
      <div className="glass-panel p-8 md:p-12 rounded-3xl max-w-xl w-full text-center relative overflow-hidden">
        <h2 className="text-sm font-bold text-purple-400 tracking-widest mb-8 uppercase">Yachie Personality Test</h2>
        
        <AnimatePresence mode="wait">
          {!showReaction ? (
            <motion.div
              key={`q-${currentQ}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col gap-8"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white">{q.q}</h3>
              <div className="flex flex-col gap-4">
                {q.opts.map((opt, i) => (
                  <button
                    key={i}
                    onClick={handleAnswer}
                    className="p-4 rounded-xl border border-white/20 bg-white/5 hover:bg-pink-500/20 hover:border-pink-500 transition-all font-bold text-lg"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`a-${currentQ}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="flex flex-col items-center gap-8 py-8"
            >
              <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                {q.reaction}
              </p>
              <button
                onClick={nextQuestion}
                className="mt-4 px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-pink-200 transition-colors"
              >
                {currentQ < questions.length - 1 ? 'Next Question' : 'Finish Test'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
