import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = "", 
  hover = true,
  onClick 
}) => {
  return (
    <motion.div
      whileHover={hover ? { 
        scale: 1.02, 
        y: -4,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      } : {}}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`
        backdrop-blur-md bg-white/10 
        border border-white/20 
        rounded-2xl 
        shadow-xl shadow-black/10
        hover:bg-white/15 
        transition-all duration-300
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;