'use client';
import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { CAT_COLORS, CAT_NAMES } from '@/lib/data';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { Expense } from '@/lib/types';

export default function ExpensesPage() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('oi_corigi_expenses', []);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState('');
  const [store, setStore] = useState('');
  const [cat, setCat] = useState('');
  const [toast, setToast] = useState('');

  const addExpense = useCallback(() => {
    const a = parseInt(amount);
    if (!a || a <= 0) { setToast('金額を入力してください'); return; }
    const newExp: Expense = {
      id: Date.now().toString(),
      date, amount: a, store, cat: cat || 'Khác',
      added: new Date().toISOString()
    };
    setExpenses(prev => [newExp, ...prev]);
    setAmount(''); setToast('✓ 追加しました');
    setTimeout(() => setToast(''), 2000);
  }, [date, amount, store, cat, setExpenses]);

  const deleteExpense = useCallback((id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  }, [setExpenses]);

  const sorted = useMemo(() => [...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), [expenses]);

  return (
    <div className="px-4 pt-4 space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/50 rounded-2xl p-5 shadow-lg border border-white/40"
      >
        <h1 className="text-lg font-black text-gray-800 mb-4">💰 支出を追加</h1>

        <div className="space-y-3">
          <div className="flex gap-2">
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
              className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 bg-white/70 text-sm focus:outline-none focus:border-pink-300" />
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="金額 (¥)"
              className="w-28 px-3 py-2.5 rounded-xl border border-gray-200 bg-white/70 text-sm focus:outline-none focus:border-pink-300" />
          </div>
          <div className="flex gap-2">
            <select value={store} onChange={e => setStore(e.target.value)}
              className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 bg-white/70 text-sm focus:outline-none focus:border-pink-300">
              <option value="">🏪 お店</option>
              <option>OK新用賀</option><option>FUJI用賀</option><option>York Mart</option>
              <option>My Basket</option><option>Seven-Eleven</option><option>Hanamasa</option><option>その他</option>
            </select>
            <select value={cat} onChange={e => setCat(e.target.value)}
              className="flex-1 px-3 py-2.5 rounded-xl border border-gray-200 bg-white/70 text-sm focus:outline-none focus:border-pink-300">
              <option value="">📂 カテゴリー</option>
              {CAT_NAMES.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={addExpense}
            className="w-full py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold rounded-xl shadow-lg shadow-pink-200/50"
          >
            追加する
          </motion.button>
        </div>
      </motion.div>

      <GlassCard delay={0.1}>
        <h2 className="text-sm font-bold text-gray-700 mb-3">📝 履歴</h2>
        {sorted.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <div className="text-4xl mb-2">📋</div>
            <p className="text-sm">まだ支出がありません</p>
          </div>
        ) : (
          <div className="space-y-1">
            {sorted.map((e, i) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0"
              >
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: CAT_COLORS[e.cat] || '#B2BEC3' }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-700 truncate">{e.store || 'その他'}</p>
                  <p className="text-[10px] text-gray-400">{e.date}</p>
                </div>
                <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full text-gray-500">{e.cat}</span>
                <span className="text-sm font-bold text-pink-500">¥{e.amount.toLocaleString()}</span>
                <button onClick={() => deleteExpense(e.id)} className="text-gray-300 hover:text-red-400 text-xs px-1">✕</button>
              </motion.div>
            ))}
          </div>
        )}
      </GlassCard>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full text-sm font-medium shadow-xl z-50"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}