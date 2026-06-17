import { motion } from 'framer-motion';

interface Balloon {
  id: string;
  x: number;
  y: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  oscillationSpeed: number;
}

const balloonColors = ['#9D4EDD', '#FF0A54', '#00F5D4', '#FFB703'];

function generateRandomBalloon(fromLeft: boolean): Balloon {
  // Determine if balloon comes from left or right side
  const startX = fromLeft ? Math.random() * -20 : window.innerWidth + Math.random() * 20;

  return {
    id: `balloon-${Math.random().toString(36).substr(2, 9)}`,
    x: startX,
    y: window.innerHeight + Math.random() * 100,
    color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
    size: 15 + Math.random() * 35, // Size between 15-50px
    duration: 12 + Math.random() * 18, // Duration between 12-30 seconds
    delay: Math.random() * 5, // Delay between 0-5 seconds
    drift: (Math.random() - 0.5) * 30, // Random drift amount
    oscillationSpeed: 0.5 + Math.random() * 1.5, // Speed of side-to-side movement
  };
}

const generateBalloons = (count: number): Balloon[] => {
  const balloons: Balloon[] = [];
  // Generate balloons from both sides
  for (let i = 0; i < count; i++) {
    const fromLeft = i % 2 === 0; // Alternate between left and right
    balloons.push(generateRandomBalloon(fromLeft));
  }
  return balloons;
};

export function FloatingBalloons() {
  const balloons = generateBalloons(25); // Increased count for richer effect

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          initial={{
            y: balloon.y,
            x: balloon.x,
            opacity: 0,
          }}
          animate={{
            y: -100, // Float above the viewport
            x: balloon.x +
               Math.sin(balloon.delay + balloon.oscillationSpeed * 0) * balloon.drift,
            opacity: [0, 0.7, 0.7, 0], // Fade in, stay, fade out
          }}
          transition={{
            duration: balloon.duration,
            delay: balloon.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute rounded-full"
          style={{
            width: balloon.size,
            height: balloon.size,
            background: balloon.color,
            boxShadow: `0 0 ${balloon.size * 0.8}px ${balloon.color}40`,
            filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.3))',
          }}
        />
      ))}
    </div>
  );
}