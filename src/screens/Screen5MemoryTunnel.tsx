import { useRef } from 'react';
import { motion } from 'framer-motion';
import { photoFiles } from '../data/photos';

interface Props {
  onComplete: () => void;
}

const captions = [
  "This photo still makes me laugh.",
  "Main character energy.",
  "One of my favorite memories.",
  "Iconic moment.",
  "Legendary chaos.",
  "Too much cuteness.",
  "Unforgettable vibes.",
  "A masterpiece.",
  "When the drama started.",
  "Absolute perfection."
];

export default function Screen5MemoryTunnel({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full h-full bg-slate-950 flex flex-col items-center relative">
      <div className="absolute top-10 z-20 text-center glass-panel px-8 py-4 rounded-full pointer-events-none">
        <h2 className="text-2xl font-bold text-pink-400">Memory Tunnel</h2>
        <p className="text-sm text-gray-300">Scroll to explore &rarr;</p>
      </div>

      <div 
        ref={containerRef}
        className="w-full h-full overflow-x-auto overflow-y-hidden flex items-center px-[50vw] no-scrollbar snap-x snap-mandatory"
      >
        <div className="flex gap-16 md:gap-32 items-center pr-[50vw]">
          {photoFiles.map((photo, idx) => {
            const caption = captions[idx % captions.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ margin: "-100px" }}
                whileHover={{ scale: 1.05 }}
                className="relative snap-center shrink-0 w-[80vw] md:w-[40vw] max-w-lg aspect-[3/4] rounded-3xl overflow-hidden glass p-4 flex flex-col group"
              >
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <p className="text-xl md:text-2xl font-bold text-white shadow-sm">{caption}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}

          <div className="snap-center shrink-0 w-[80vw] md:w-[40vw] flex items-center justify-center">
            <button
              onClick={onComplete}
              className="px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl font-bold text-xl hover:scale-110 transition-transform shadow-xl shadow-pink-500/30"
            >
              Continue Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
