import { ReactNode } from 'react';
import { colors } from '../styles/colors';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'interactive';
}

export function GlassCard({ children, className = '', variant = 'default' }: GlassCardProps) {
  const baseClasses = 'rounded-3xl backdrop-blur-2xl transition-all duration-300';
  const baseStyle = {
    background: colors.glass.background,
    border: `1px solid ${colors.glass.border}`,
  };

  const variantClasses = {
    default: 'shadow-xl shadow-black/20',
    elevated: 'shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105',
    interactive: 'hover:shadow-lg hover:shadow-purple-500/30 hover:scale-102',
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={baseStyle}
    >
      {children}
    </div>
  );
}
