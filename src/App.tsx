import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Screen1SecretArchive from './screens/Screen1SecretArchive';
import Screen2IdentityVerification from './screens/Screen2IdentityVerification';
import Screen3BirthdayScanner from './screens/Screen3BirthdayScanner';
import Screen4FindYachie from './screens/Screen4FindYachie';
import Screen5MemoryTunnel from './screens/Screen5MemoryTunnel';
import Screen6PersonalityTest from './screens/Screen6PersonalityTest';
import Screen7EmbarrassmentWheel from './screens/Screen7EmbarrassmentWheel';
import Screen8CatchCake from './screens/Screen8CatchCake';
import Screen9Achievements from './screens/Screen9Achievements';
import Screen10MosaicPuzzle from './screens/Screen10MosaicPuzzle';
import Screen11SecretLetter from './screens/Screen11SecretLetter';
import Screen12TimeMachine from './screens/Screen12TimeMachine';
import Screen13SystemFailure from './screens/Screen13SystemFailure';
import Screen14SecretVault from './screens/Screen14SecretVault';
import Screen15GrandFinale from './screens/Screen15GrandFinale';

import { AudioController } from './components/AudioController';
import { FloatingBalloons } from './components/FloatingBalloons';
import { AnimatedBackground } from './components/AnimatedBackground';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(1);

  const nextScreen = () => {
    setCurrentScreen((prev) => Math.min(prev + 1, 15));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 1: return <Screen1SecretArchive onUnlock={nextScreen} />;
      case 2: return <Screen2IdentityVerification onVerify={nextScreen} />;
      case 3: return <Screen3BirthdayScanner onScanComplete={nextScreen} />;
      case 4: return <Screen4FindYachie onFound={nextScreen} />;
      case 5: return <Screen5MemoryTunnel onComplete={nextScreen} />;
      case 6: return <Screen6PersonalityTest onComplete={nextScreen} />;
      case 7: return <Screen7EmbarrassmentWheel onComplete={nextScreen} />;
      case 8: return <Screen8CatchCake onCaught={nextScreen} />;
      case 9: return <Screen9Achievements onContinue={nextScreen} />;
      case 10: return <Screen10MosaicPuzzle onComplete={nextScreen} />;
      case 11: return <Screen11SecretLetter onContinue={nextScreen} />;
      case 12: return <Screen12TimeMachine onContinue={nextScreen} />;
      case 13: return <Screen13SystemFailure onRecover={nextScreen} />;
      case 14: return <Screen14SecretVault onComplete={nextScreen} />;
      case 15: return <Screen15GrandFinale />;
      default: return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0B001A] via-[#05000D] to-[#000000] text-white relative overflow-x-hidden flex flex-col">
      <AudioController />

      {/* Premium Global Components */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <FloatingBalloons />
      </div>
      
      {/* Animated background that changes subtly */}
      <div className="fixed inset-0 opacity-30 pointer-events-none -z-10">
        <AnimatedBackground variant="moving-glow" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-full flex-grow flex flex-col relative z-10"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}