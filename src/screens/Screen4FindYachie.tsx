import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onFound: () => void;
}

const decoys = [
  { id: 'decoy1', src: new URL('../../find_the_real_Yachie/b15a123cf4c902f0084fad278baad508.jpg', import.meta.url).href, type: 'decoy' },
  { id: 'decoy2', src: new URL('../../find_the_real_Yachie/images (3).jpg', import.meta.url).href, type: 'decoy' },
];

const realYachie = {
  id: 'real',
  src: new URL('../../find_the_real_Yachie/real_yachie.jpg', import.meta.url).href,
  type: 'yachie'
};

export default function Screen4FindYachie({ onFound }: Props) {
  const [errorMsg, setErrorMsg] = useState('');

  const gridItems = useMemo(() => {
    const items = [...decoys, realYachie];
    return items.sort(() => Math.random() - 0.5);
  }, []);

  const handleItemClick = (type: string) => {
    if (type === 'yachie') {
      setErrorMsg('');
      onFound();
    } else if (type === 'cat') {
      setErrorMsg("That is a cat. Please schedule an eye exam.");
    } else if (type === 'potato') {
      setErrorMsg("That is literally a potato.");
    } else {
      setErrorMsg("Absolutely incorrect.");
    }
  };

  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center p-4 sm:p-6 relative min-h-screen">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 z-10 glass-panel p-4 sm:p-6 rounded-2xl max-w-lg w-full">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#FF0A54' }}>
          Find the Real Yachie
        </h2>
        <p className="text-gray-300 text-sm sm:text-base">Identify the true birthday girl among these imposters.</p>
        
        {errorMsg && (
          <motion.div 
            key={errorMsg}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 font-bold text-sm"
          >
            {errorMsg}
          </motion.div>
        )}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl w-full z-10">
        {gridItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => handleItemClick(item.type)}
            className="aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 border-white/10 hover:border-[#FF0A54] hover:shadow-[0_0_20px_rgba(255,10,84,0.4)] transition-all transform hover:scale-105 active:scale-95"
          >
            <img
              src={item.src}
              alt="grid item"
              className="w-full h-full object-cover object-top"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
