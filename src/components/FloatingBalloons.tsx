import { motion } from 'framer-motion';

interface Balloon {
  id: string;
  x: number;
  y: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
}

const balloonColors = ['#9D4EDD', '#FF0A54', '#00F5D4', '#FFB703'];

function generateRandomBalloon(fromLeft: boolean): Balloon {
  return {
    id: `balloon-${Math.random().toString(36).substr(2, 9)}`,
    // Spawns balloons in the left 15% or right 15% of the screen
    x: fromLeft ? Math.random() * 15 : 85 + Math.random() * 15,
    y: 100 + Math.random() * 20, // start below viewport
    color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
    size: 15 + Math.random() * 30, // slightly larger balloons
    duration: 12 + Math.random() * 10,
    delay: Math.random() * 5,
  };
}

const generateBalloons = (count: number): Balloon[] => {
  return Array.from({ length: count }, (_, i) => generateRandomBalloon(i % 2 === 0));
};

export function FloatingBalloons() {
  const balloons = generateBalloons(18);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" style={{ width: '100%', height: '100%' }}>
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: balloon.duration,
            delay: balloon.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute rounded-full"
          style={{
            left: `${balloon.x}%`,
            bottom: 0,
            width: balloon.size,
            height: balloon.size,
            background: balloon.color,
            boxShadow: `0 0 ${balloon.size * 0.6}px ${balloon.color}50`,
            animation: `balloonRise ${balloon.duration}s linear ${balloon.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes balloonRise {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.5; }
          85% { opacity: 0.5; }
          100% { transform: translateY(-110vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}