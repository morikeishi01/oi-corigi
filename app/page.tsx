'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PinPad from '@/components/PinPad';
import Scene3D from '@/components/3d/Scene3D';

export default function LoginPage() {
  const [step, setStep] = useState<'loading' | 'login' | 'app'>('loading');
  const [mode, setMode] = useState<'create' | 'confirm' | 'enter'>('enter');
  const [firstPin, setFirstPin] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('oi_corigi_pin');
    setMode(stored ? 'enter' : 'create');
    setStep('login');
  }, []);

  const handlePinSubmit = useCallback(async (pin: string) => {
    if (mode === 'create') {
      setFirstPin(pin);
      setMode('confirm');
      setError('');
      return;
    }
    if (mode === 'confirm') {
      if (pin === firstPin) {
        const data = new TextEncoder().encode(pin + 'oi-corigi-salt-2026');
        const hash = await crypto.subtle.digest('SHA-256', data);
        const hex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
        localStorage.setItem('oi_corigi_pin', hex);
        setStep('app');
        return;
      }
      setError('PINが一致しません');
      setMode('create');
      setFirstPin('');
      return;
    }
    // enter mode
    const data = new TextEncoder().encode(pin + 'oi-corigi-salt-2026');
    const hash = await crypto.subtle.digest('SHA-256', data);
    const hex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
    if (hex === localStorage.getItem('oi_corigi_pin')) {
      setStep('app');
    } else {
      setError('PINが違います');
    }
  }, [mode, firstPin]);

  const handleReset = useCallback(() => {
    localStorage.clear();
    setMode('create');
    setFirstPin('');
    setError('');
  }, []);

  if (step === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-6xl">
          🏮
        </motion.div>
      </div>
    );
  }

  if (step === 'app') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
        <motion.div className="text-center">
          <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.6 }} className="text-6xl mb-4">✨</motion.div>
          <p className="text-gray-500 text-sm">ようこそ</p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden px-6">
      <Scene3D />

      {/* Decorative elements */}
      <div className="absolute top-10 left-6 text-4xl opacity-20">🌸</div>
      <div className="absolute top-20 right-8 text-3xl opacity-15">🏮</div>
      <div className="absolute bottom-20 left-10 text-5xl opacity-10">⛩️</div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center mb-8 relative z-10"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="text-7xl mb-3 drop-shadow-lg"
        >
          🏮
        </motion.div>
        <h1 className="text-4xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          お買い物
        </h1>
        <p className="text-sm text-gray-400 mt-1 tracking-widest">
          Oi Corigi
        </p>
        <p className="text-xs text-gray-300 mt-2">
          {mode === 'create' ? 'PINを設定してください' : mode === 'confirm' ? 'もう一度入力してください' : 'PINを入力してください'}
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          <PinPad
            onSubmit={handlePinSubmit}
            mode={mode}
            error={error}
            onReset={handleReset}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}