'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';

interface PinPadProps {
  onSubmit: (pin: string) => void;
  mode: 'create' | 'confirm' | 'enter';
  onCreate?: (pin: string) => void;
  error?: string;
  onReset?: () => void;
}

export default function PinPad({ onSubmit, mode, onCreate, error, onReset }: PinPadProps) {
  const [pin, setPin] = useState('');
  const [firstPin, setFirstPin] = useState('');
  const [msg, setMsg] = useState('');
  const [shaking, setShaking] = useState(false);

  const handleKey = useCallback((num: string) => {
    if (pin.length >= 4) return;
    const newPin = pin + num;
    setPin(newPin);

    if (newPin.length === 4) {
      if (mode === 'create') {
        setFirstPin(newPin);
        setPin('');
        setMsg('もう一度入力してください');
        onCreate?.(newPin);
      } else if (mode === 'confirm') {
        if (newPin === firstPin) {
          onSubmit(newPin);
        } else {
          setShaking(true);
          setMsg('一致しません');
          setPin('');
          setFirstPin('');
          setTimeout(() => setShaking(false), 500);
        }
      } else {
        onSubmit(newPin);
      }
    }
  }, [pin, mode, firstPin, onSubmit, onCreate]);

  const handleDel = () => {
    if (pin.length > 0) setPin(pin.slice(0, -1));
  };

  const keys = ['1','2','3','4','5','6','7','8','9','','0','⌫'];

  return (
    <div className="flex flex-col items-center gap-6">
      {/* PIN Dots */}
      <div className="flex gap-4">
        {[0,1,2,3].map(i => (
          <motion.div
            key={i}
            animate={shaking ? { x: [0,-8,8,-6,6,-3,3,0] } : {}}
            className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center text-2xl font-bold transition-all duration-200 ${
              i < pin.length
                ? 'border-purple-400 bg-purple-50 text-purple-500 shadow-lg shadow-purple-200/50'
                : 'border-pink-200 bg-white/80 text-pink-300'
            }`}
          >
            {i < pin.length ? '●' : ''}
          </motion.div>
        ))}
      </div>

      {/* Message */}
      <AnimatePresence>
        {(msg || error) && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm font-medium text-pink-500"
          >
            {error || msg}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-3 w-72">
        {keys.map((k, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.9 }}
            onClick={() => k === '⌫' ? handleDel() : k && handleKey(k)}
            className={`aspect-square rounded-2xl text-2xl font-bold transition-all
              ${k === '⌫'
                ? 'bg-pink-50 text-pink-400 text-base shadow-sm'
                : k === ''
                  ? 'invisible'
                  : 'bg-white text-gray-700 shadow-md hover:shadow-lg border border-pink-100/50 active:bg-pink-50'
              }`}
          >
            {k}
          </motion.button>
        ))}
      </div>

      {/* Forgot PIN */}
      {mode === 'enter' && onReset && (
        <button
          onClick={onReset}
          className="text-sm text-pink-300 underline underline-offset-4 hover:text-pink-400 transition-colors"
        >
          パスワードをお忘れですか？
        </button>
      )}
    </div>
  );
}