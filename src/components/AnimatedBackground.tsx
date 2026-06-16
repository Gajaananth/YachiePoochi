import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  variant?: 'soft' | 'particles' | 'orbs' | 'gradient' |
            'floating-particles' | 'light-orbs' | 'blurred-gradient' | 'moving-glow';
}

export function AnimatedBackground({ variant = 'soft' }: AnimatedBackgroundProps) {
  // Floating Particles - Enhanced version
  if (variant === 'floating-particles') {
    return (
      <div className="absolute inset-0 overflow-hidden z-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              background: [
                'rgba(183, 157, 255, 0.3)',   // Soft Purple
                'rgba(255, 183, 213, 0.3)',   // Soft Pink
                'rgba(158, 216, 255, 0.3)',   // Soft Blue
                'rgba(255, 217, 138, 0.3)'    // Soft Gold
              ][Math.floor(Math.random() * 4)],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${6 + Math.random() * 6}px
                         ${[
                           'rgba(183, 157, 255, 0.5)',
                           'rgba(255, 183, 213, 0.5)',
                           'rgba(158, 216, 255, 0.5)',
                           'rgba(255, 217, 138, 0.5)'
                         ][Math.floor(Math.random() * 4)]}`
            }}
            animate={{
              y: [0, -120, 0],
              x: [
                0,
                Math.sin(i * 0.5) * 20,
                Math.sin(i * 0.5 + Math.PI) * 15,
                0
              ],
              opacity: [0.3, 0.8, 0.5, 0.3]
            }}
            transition={{
              duration: 10 + Math.random() * 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    );
  }

  // Soft Light Orbs - Enhanced version
  if (variant === 'light-orbs') {
    return (
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(183, 157, 255, 0.4), transparent)',
            top: '-15%',
            left: '-5%',
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-12"
          style={{
            background: 'radial-gradient(circle, rgba(255, 183, 213, 0.35), transparent)',
            bottom: '-10%',
            right: '-5%',
          }}
          animate={{
            x: [0, -35, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-60 h-60 rounded-full blur-2xl opacity-18"
          style={{
            background: 'radial-gradient(circle, rgba(158, 216, 255, 0.4), transparent)',
            top: '60%',
            left: '10%',
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, 20, -20, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    );
  }

  // Blurred Gradient Background
  if (variant === 'blurred-gradient') {
    return (
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(45deg, ' +
              'rgba(183, 157, 255, 0.08) 0%, ' +
              'rgba(255, 183, 213, 0.06) 25%, ' +
              'rgba(158, 216, 255, 0.08) 50%, ' +
              'rgba(255, 217, 138, 0.06) 75%, ' +
              'rgba(183, 157, 255, 0.08) 100%)',
            backgroundSize: '400% 400%',
          }}
          animate={{
            backgroundPosition: [
              '0% 50%',
              '50% 100%',
              '100% 50%',
              '50% 0%',
              '0% 50%'
            ]
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, ' +
              'rgba(183, 157, 255, 0.06) 0%, ' +
              'transparent 50%)',
          }}
          animate={{
            backgroundPosition: [
              '0% 0%',
              '100% 100%',
              '0% 0%'
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    );
  }

  // Moving Glow Effects
  if (variant === 'moving-glow') {
    return (
      <div className="absolute inset-0 overflow-hidden z-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${80 + Math.random() * 120}px`,
              height: `${80 + Math.random() * 120}px`,
              background: [
                'radial-gradient(circle, rgba(183, 157, 255, 0.15), transparent)',
                'radial-gradient(circle, rgba(255, 183, 213, 0.15), transparent)',
                'radial-gradient(circle, rgba(158, 216, 255, 0.15), transparent)',
                'radial-gradient(circle, rgba(255, 217, 138, 0.15), transparent)'
              ][Math.floor(Math.random() * 4)],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(80px)',
            }}
            animate={{
              x: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`
              ],
              y: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`
              ],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    );
  }

  // Original Variants (keeping for backward compatibility)
  if (variant === 'particles') {
    return (
      <div className="absolute inset-0 overflow-hidden z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: ['#B79DFF', '#FFB7D5', '#9ED8FF'][Math.floor(Math.random() * 3)],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${8 + Math.random() * 8}px currentColor`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'orbs') {
    return (
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute w-64 h-64 rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, #B79DFF, transparent)',
            top: '-20%',
            left: '-10%',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-15"
          style={{
            background: 'radial-gradient(circle, #FFB7D5, transparent)',
            bottom: '-20%',
            right: '-10%',
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    );
  }

  // Default soft variant
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(183, 157, 255, 0.1) 0%, transparent 50%)',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 80% 50%, rgba(255, 183, 213, 0.08) 0%, transparent 50%)',
        }}
        animate={{
          backgroundPosition: ['100% 100%', '0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}