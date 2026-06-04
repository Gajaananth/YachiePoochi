import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(() => new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')); // Placeholder

  useEffect(() => {
    audio.loop = true;
    audio.volume = 0.3;
    return () => {
      audio.pause();
    };
  }, [audio]);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => console.log("Audio play failed", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={togglePlay}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all shadow-lg"
    >
      {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
    </button>
  );
}
