import { useRef } from 'react';
import { motion } from 'framer-motion';
import { photoFiles } from '../data/photos';

interface Props {
  onComplete: () => void;
}

const captions = [
  "Every chapter of your journey adds something beautiful to your story.",
  "A quiet reminder of how far you have come.",
  "Strength and kindness can exist together, and you prove it.",
  "Some moments don't need words to be meaningful.",
  "A smile that continues to inspire those around you.",
  "A memory captured, a journey still unfolding.",
  "Confidence grows beautifully when kindness stays with it.",
  "Every year reveals a stronger version of yourself.",
  "Your story deserves many more beautiful chapters.",
  "Not every achievement is visible, but every step matters.",
  "A moment frozen in time, filled with quiet grace.",
  "You carry more strength than you know.",
  "In every frame, a reminder of your resilience.",
  "Your kindness has a ripple effect you may never see.",
  "Growing stronger while staying true to yourself.",
  "A beautiful reminder that you are enough.",
  "Time reveals what character truly means.",
  "Your presence makes a difference, even in silence.",
  "Building dreams, one quiet moment at a time.",
  "A journey toward becoming who you want to be.",
  "Your light shines brightest when you believe in yourself.",
  "With each passing moment, you grow into something greater.",
  "A testament to the strength within you.",
  "Today's growth is tomorrow's strength."
];

export default function Screen5MemoryTunnel({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full h-full bg-gradient-to-b from-transparent via-[#0A0E1A] to-[#050811] flex flex-col items-center relative px-4 py-8 md:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-6 md:top-10 z-20 text-center"
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B79DFF] to-[#FFB7D5] tracking-wide">
          Memory Tunnel
        </h1>
        <p className="text-xs md:text-sm text-gray-400 mt-2">Scroll to explore →</p>
      </motion.div>

      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-x-auto overflow-y-hidden flex items-center px-[10vw] md:px-[15vw] lg:px-[20vw] no-scrollbar snap-x snap-mandatory pt-16 md:pt-12"
      >
        <div className="flex gap-6 md:gap-12 lg:gap-16 items-center pr-[10vw] md:pr-[15vw] lg:pr-[20vw]">
          {photoFiles.map((photo, idx) => {
            const caption = captions[idx % captions.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ margin: "-100px" }}
                whileHover={{ scale: 1.05 }}
                className="relative snap-center shrink-0 w-[70vw] sm:w-[60vw] md:w-[40vw] lg:w-[35vw] max-w-md aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden flex flex-col group"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                }}
              >
                <div className="w-full h-full rounded-2xl md:rounded-3xl overflow-hidden relative">
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 md:p-6">
                    <p className="text-base md:text-lg lg:text-xl font-semibold text-white leading-relaxed">{caption}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="snap-center shrink-0 w-[70vw] sm:w-[60vw] md:w-[40vw] lg:w-[35vw] max-w-md flex items-center justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="btn-glass-primary px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-white text-sm md:text-base transition-all shadow-lg"
              style={{
                boxShadow: '0 0 30px rgba(183, 157, 255, 0.3)',
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