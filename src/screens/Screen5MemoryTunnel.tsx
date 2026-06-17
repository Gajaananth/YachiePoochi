import { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { photoFiles } from '../data/photos';

interface Props {
  onComplete: () => void;
}

const uniqueCaptions = [
  "Wishing you a year filled with as much happiness as you bring to others.",
  "Your kindness is a superpower—never lose that beautiful trait.",
  "May every dream you hold in your heart become a reality this year.",
  "You have the strength to overcome any challenge that comes your way.",
  "Keep believing in yourself, because you are capable of amazing things.",
  "Your radiant smile has the power to light up even the darkest rooms.",
  "May your journey ahead be paved with success, love, and endless peace.",
  "You inspire those around you simply by being your authentic self.",
  "Celebrate how far you've come, and look forward to how far you'll go.",
  "Always remember that you are deeply loved and appreciated."
];

export default function Screen5MemoryTunnel({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Pick exactly 10 random photos to match the 10 captions
  const tunnelPhotos = useMemo(() => {
    return [...photoFiles].sort(() => 0.5 - Math.random()).slice(0, 10);
  }, []);

  return (
    <div className="w-full flex-grow bg-gradient-to-b from-transparent via-[#05000D] to-[#000000] flex flex-col items-center relative px-4 py-8 md:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-6 md:top-10 z-20 text-center"
      >
        <h1 
          className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide"
          style={{
            background: 'linear-gradient(90deg, #9D4EDD, #FF0A54)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Memory Tunnel
        </h1>
        <p className="text-xs md:text-sm text-gray-400 mt-2">Scroll to explore →</p>
      </motion.div>

      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-x-auto overflow-y-hidden flex items-center px-[10vw] md:px-[15vw] lg:px-[20vw] no-scrollbar snap-x snap-mandatory pt-32 md:pt-28"
      >
        <div className="flex gap-6 md:gap-12 lg:gap-16 items-center pr-[10vw] md:pr-[15vw] lg:pr-[20vw]">
          {tunnelPhotos.map((photo, idx) => {
            const caption = uniqueCaptions[idx];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ margin: "-100px" }}
                whileHover={{ scale: 1.05 }}
                // Reduced width sizes below
                className="relative snap-center shrink-0 w-[65vw] sm:w-[45vw] md:w-[30vw] lg:w-[25vw] max-w-sm flex flex-col group"
              >
                <div 
                  className="w-full aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                </div>
                {/* Caption stays below image, perfectly visible on mobile */}
                <div className="mt-4 px-2 min-h-[80px] flex items-center justify-center">
                  <p className="text-sm md:text-base lg:text-lg font-semibold text-gray-200 leading-relaxed text-center w-full">
                    {caption}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="snap-center shrink-0 w-[55vw] sm:w-[45vw] md:w-[30vw] lg:w-[25vw] max-w-sm flex items-center justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-white text-sm md:text-base transition-all shadow-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(157, 78, 221, 0.5), rgba(255, 10, 84, 0.5))',
                boxShadow: '0 0 30px rgba(183, 157, 255, 0.3)',
                border: '2px solid rgba(157, 78, 221, 0.5)'
              }}
            >
              Continue Journey
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}