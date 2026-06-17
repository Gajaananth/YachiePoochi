import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScanFace } from 'lucide-react';

interface Props {
  onScanComplete: () => void;
}

export default function Screen3BirthdayScanner({ onScanComplete }: Props) {
  const [scanning, setScanning] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        setProgress(p => Math.min(p + Math.floor(Math.random() * 15) + 5, 100));
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setScanning(false), 1000);
    }
  }, [progress]);

  const results = [
    { label: "Cuteness", value: "9999%", color: "text-pink-400" },
    { label: "Drama Level", value: "87%", color: "text-purple-400" },
    { label: "Snack Consumption", value: "Maximum", color: "text-yellow-400" },
    { label: "Sleep Schedule", value: "Questionable", color: "text-red-400" },
    { label: "Birthday Energy", value: "Infinite", color: "text-blue-400" },
    { label: "Sister Status", value: "Legendary", color: "text-green-400" }
  ];

  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center p-6 bg-slate-900">
      <div className="max-w-md w-full glass-panel p-8 rounded-3xl">
        {scanning ? (
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mb-8 relative"
            >
              <ScanFace size={100} className="text-cyan-400" />
              <motion.div 
                animate={{ y: [0, 100, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee]"
              />
            </motion.div>
            <h2 className="text-2xl font-bold mb-4 font-mono text-cyan-400">Scanning Yachie...</h2>
            
            <div className="w-full bg-gray-800 rounded-full h-4 mb-2 overflow-hidden border border-gray-700">
              <motion.div 
                className="bg-cyan-500 h-4 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <p className="text-gray-400 font-mono">{progress}% Complete</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">
              SCAN COMPLETE
            </h2>
            
            <div className="w-full space-y-4 mb-8">
              {results.map((res, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/10"
                >
                  <span className="font-semibold text-gray-300">{res.label}</span>
                  <span className={`font-bold ${res.color} font-mono`}>{res.value}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              onClick={onScanComplete}
              className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-colors shadow-[0_0_20px_rgba(34,211,238,0.4)]"
            >
              Continue to Database
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
