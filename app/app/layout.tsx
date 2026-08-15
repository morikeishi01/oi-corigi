'use client';
import { ReactNode } from 'react';
import BottomNav from '@/components/BottomNav';
import Scene3D from '@/components/3d/Scene3D';
import { motion } from 'framer-motion';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/50 via-white to-purple-50/50 relative">
      <Scene3D />
      <div className="pb-20 relative z-10">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}