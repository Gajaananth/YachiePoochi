import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioControllerProps {
  track: string;
  loop?: boolean;
}

export function AudioController({ track, loop = true }: AudioControllerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(() => new Audio(track));

  useEffect(() => {
    audio.preload = 'auto';
    audio.loop = loop;
    audio.volume = 0.3;
    audio.src = track;
    audio.load();
    audio.play().then(() => setIsPlaying(true)).catch(() => {
      // Autoplay may be blocked until user interaction.
      setIsPlaying(false);
    });
    return () => {
      audio.pause();
    };
  }, [audio, loop, track]);

  useEffect(() => {
    if (audio.src !== track) {
      audio.pause();
      audio.src = track;
      audio.load();
      audio.play().then(() => setIsPlaying(true)).catch(() => {
        setIsPlaying(false);
      });
    }
  }, [track, audio]);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(e => {
        console.log('Audio play failed', e);
        setIsPlaying(false);
      });
    }
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
