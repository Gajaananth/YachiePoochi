import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getRandomPhotos } from '../data/photos';

interface Props {
  onFound: () => void;
}

const decoys = [
  { id: 'decoy1', src: new URL('../../find_the_real_Yachie/b15a123cf4c902f0084fad278baad508.jpg', import.meta.url).href, type: 'decoy' },
  { id: 'decoy2', src: new URL('../../find_the_real_Yachie/images (3).jpg', import.meta.url).href, type: 'decoy' },
  { id: 'decoy3', src: new URL('../../find_the_real_Yachie/images (4).jpg', import.meta.url).href, type: 'decoy' },
  { id: 'decoy4', src: new URL('../../find_the_real_Yachie/images (5).jpg', import.meta.url).href, type: 'decoy' },
  { id: 'decoy5', src: new URL('../../find_the_real_Yachie/images (6).jpg', import.meta.url).href, type: 'decoy' },
];

export default function Screen4FindYachie({ onFound }: Props) {
  const [errorMsg, setErrorMsg] = useState('');

  // We need exactly one real Yachie photo among the decoys.
  const gridItems = useMemo(() => {
    const realPhoto = getRandomPhotos(1)[0];
    const items = [...decoys, { id: 'real', src: realPhoto, type: 'yachie' }];
    // Shuffle
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
    <div className="w-full h-full flex flex-col items-center justify-center p-4 relative">
      <div className="text-center mb-8 z-10 glass-panel p-6 rounded-2xl max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-2 text-pink-400">Find the Real Yachie</h2>
        <p className="text-gray-300">Identify the true birthday girl among these imposters.</p>
        
        {errorMsg && (
          <motion.div 
            key={errorMsg}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 font-bold"
          >
            {errorMsg}
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl w-full z-10">
        {gridItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => handleItemClick(item.type)}
            className="aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-pink-500 hover:shadow-[0_0_15px_#ec4899] transition-all transform hover:scale-105 active:scale-95"
          >
            <img src={item.src} alt="grid item" className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
