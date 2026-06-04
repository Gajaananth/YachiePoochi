import { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import { getRandomPhoto } from '../data/photos';

interface Props {
  onComplete: () => void;
}

// A simple 3-piece vertical puzzle to keep it easy to build and play on mobile
export default function Screen10MosaicPuzzle({ onComplete }: Props) {
  const [photo] = useState(() => getRandomPhoto());
  const [pieces, setPieces] = useState([0, 1, 2]);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    // Shuffle pieces on mount
    setPieces([1, 2, 0].sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    if (pieces[0] === 0 && pieces[1] === 1 && pieces[2] === 2) {
      setSolved(true);
    } else {
      setSolved(false);
    }
  }, [pieces]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-400 mb-2">Photo Recovery</h2>
        <p className="text-gray-300">Drag the pieces to fix this broken memory.</p>
      </div>

      <div className="w-full max-w-sm aspect-[3/4] relative rounded-2xl overflow-hidden glass p-2 border border-white/20">
        {!solved ? (
          <Reorder.Group axis="y" values={pieces} onReorder={setPieces} className="w-full h-full flex flex-col">
            {pieces.map((piece) => (
              <Reorder.Item 
                key={piece} 
                value={piece} 
                className="w-full flex-1 relative cursor-grab active:cursor-grabbing overflow-hidden border-b border-white/10 last:border-0"
              >
                <img 
                  src={photo} 
                  alt="" 
                  className="absolute w-full h-[300%] object-cover pointer-events-none"
                  style={{ top: `-${piece * 100}%` }}
                />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full rounded-xl overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.5)]"
          >
            <img src={photo} alt="Solved" className="w-full h-full object-cover" />
          </motion.div>
        )}
      </div>

      <motion.div 
        className="h-16 mt-8 flex items-center justify-center"
        animate={{ opacity: solved ? 1 : 0 }}
      >
        <button
          onClick={onComplete}
          disabled={!solved}
          className="px-8 py-3 bg-blue-500 rounded-xl font-bold text-white hover:bg-blue-400 transition-colors"
        >
          Memory Restored
        </button>
      </motion.div>
    </div>
  );
}
