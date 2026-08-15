'use client';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function GlassCard({ children, className = '', delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={`backdrop-blur-xl bg-white/60 rounded-2xl p-5 shadow-lg shadow-black/5 border border-white/40 ${className}`}
    >
      {children}
    </motion.div>
  );
}