import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getRandomPhoto } from '../data/photos';

interface Props {
  onComplete: () => void;
}

const pieceLayouts = [
  { backgroundPosition: 'left top', backgroundSize: '200% 200%' },
  { backgroundPosition: 'right top', backgroundSize: '200% 200%' },
  { backgroundPosition: 'left bottom', backgroundSize: '200% 200%' },
  { backgroundPosition: 'right bottom', backgroundSize: '200% 200%' }
];

const gridPositions = [
  { gridColumn: '1', gridRow: '1' },
  { gridColumn: '2', gridRow: '1' },
  { gridColumn: '1', gridRow: '2' },
  { gridColumn: '2', gridRow: '2' }
];

const createScrambledPieces = () => {
  const base = [0, 1, 2, 3];
  let shuffled = [...base].sort(() => Math.random() - 0.5);
  while (shuffled.every((value, index) => value === index)) {
    shuffled = [...base].sort(() => Math.random() - 0.5);
  }
  return shuffled;
};

// A 4-piece puzzle split into four equal square quadrants
export default function Screen10MosaicPuzzle({ onComplete }: Props) {
  const [photo] = useState(() => getRandomPhoto());
  const [pieces, setPieces] = useState(() => createScrambledPieces());
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    if (pieces.every((value, index) => value === index)) {
      setSolved(true);
    } else {
      setSolved(false);
    }
  }, [pieces]);

  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#9D4EDD] via-[#FF0A54] to-[#00F5D4]">
          Photo Recovery
        </h1>
        <p className="text-sm md:text-lg text-gray-300 max-w-md">
          Drag the pieces to fix this broken memory.
        </p>
      </div>

      {/* Puzzle Container with enhanced glassmorphism */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm sm:max-w-md aspect-[3/4] relative rounded-2xl overflow-hidden glass-panel p-3 sm:p-4"
        style={{
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        {!solved ? (
          <div className="w-full h-full grid grid-cols-2 gap-2" style={{ gridTemplateRows: '1fr 1fr' }}>
            {pieces.map((piece, index) => {
              const layout = pieceLayouts[piece];
              const gridPosition = gridPositions[index];
              const isSelected = selectedIndex === index;
              return (
                <button
                  key={piece}
                  type="button"
                  onClick={() => {
                    if (selectedIndex === null) {
                      setSelectedIndex(index);
                      return;
                    }
                    if (selectedIndex === index) {
                      setSelectedIndex(null);
                      return;
                    }
                    setPieces((current) => {
                      const next = [...current];
                      [next[selectedIndex], next[index]] = [next[index], next[selectedIndex]];
                      return next;
                    });
                    setSelectedIndex(null);
                  }}
                  className={`relative overflow-hidden rounded-2xl border-4 transition ${isSelected ? 'border-pink-400 shadow-[0_0_0_4px_rgba(236,72,153,0.25)]' : 'border-transparent'} focus:outline-none`}
                  style={{ gridColumn: gridPosition.gridColumn, gridRow: gridPosition.gridRow }}
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-full relative overflow-hidden"
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className="w-full h-full pointer-events-none bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(${photo})`,
                        backgroundPosition: layout.backgroundPosition,
                        backgroundSize: layout.backgroundSize,
                        backgroundRepeat: 'no-repeat'
                      }}
                    />
                    {/* Enhanced border glow on hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.6 }}
                      className="absolute inset-0 rounded pointer-events-none"
                      style={{
                        border: '2px solid rgba(255, 255, 255, 0.4)',
                        background: 'linear-gradient(135deg, rgba(183, 157, 255, 0.1), rgba(255, 183, 213, 0.1))',
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.div>
                </button>
              );
            })}
          </div>
        ) : (
          // Solved state with enhanced presentation
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="w-full h-full rounded-xl overflow-hidden"
            style={{
              boxShadow: '0 0 40px rgba(59, 130, 246, 0.5)',
              border: '2px solid rgba(183, 157, 255, 0.3)',
            }}
          >
            <motion.img
              src={photo}
              alt="Solved"
              className="w-full h-full object-cover"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
            />
            {/* Subtle glow effect for solved state */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(183, 157, 255, 0.2) 0%, transparent 70%)',
              }}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Action Button with enhanced styling */}
      <motion.div
        className="h-16 sm:h-20 mt-8 sm:mt-10 flex items-center justify-center"
      >
        <motion.button
          onClick={onComplete}
          disabled={!solved}
          initial={{ opacity: solved ? 1 : 0, y: solved ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: solved ? 0.5 : 0, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-glass-primary px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 rounded-full font-bold text-white text-sm sm:text-base md:text-lg transition-all shadow-lg"
          style={{
            boxShadow: solved
              ? '0 0 30px rgba(183, 157, 255, 0.4)'
              : '0 0 25px rgba(183, 157, 255, 0.3)',
          }}
        >
          {!solved ? 'Keep Trying' : 'Memory Restored'}
        </motion.button>
      </motion.div>
    </div>
  );
}