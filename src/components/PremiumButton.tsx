import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PremiumButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PremiumButton({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '',
}: PremiumButtonProps) {
  const sizeClasses = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-12 py-4 text-lg',
  };

  const variantStyles = {
    primary: {
      bg: 'rgba(183, 157, 255, 0.3)',
      border: '1px solid rgba(183, 157, 255, 0.5)',
      hover: 'rgba(183, 157, 255, 0.5)',
      glow: 'rgba(183, 157, 255, 0.4)',
    },
    secondary: {
      bg: 'rgba(255, 183, 213, 0.3)',
      border: '1px solid rgba(255, 183, 213, 0.5)',
      hover: 'rgba(255, 183, 213, 0.5)',
      glow: 'rgba(255, 183, 213, 0.4)',
    },
    accent: {
      bg: 'rgba(158, 216, 255, 0.3)',
      border: '1px solid rgba(158, 216, 255, 0.5)',
      hover: 'rgba(158, 216, 255, 0.5)',
      glow: 'rgba(158, 216, 255, 0.4)',
    },
  };

  const style = variantStyles[variant];

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${sizeClasses[size]}
        relative rounded-full font-semibold
        backdrop-blur-xl transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      style={{
        background: style.bg,
        border: style.border,
        boxShadow: `0 0 20px ${style.glow}`,
        color: 'rgba(255, 255, 255, 0.95)',
      }}
      onHoverStart={
        !disabled
          ? undefined
          : undefined
      }
    >
      {children}
    </motion.button>
  );
}
