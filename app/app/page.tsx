'use client';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { WEEKLY_BUDGET, CAT_COLORS, CAT_NAMES } from '@/lib/data';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { Expense } from '@/lib/types';

export default function DashboardPage() {
  const [expenses] = useLocalStorage<Expense[]>('oi_corigi_expenses', []);

  const { totalSpent, pct, catData } = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 86400000);
    const weekExp = expenses.filter(e => new Date(e.date) >= weekAgo);
    const ts = weekExp.reduce((s, e) => s + e.amount, 0);
    const p = Math.min(100, Math.round((ts / WEEKLY_BUDGET) * 100));

    const cats: Record<string, number> = {};
    CAT_NAMES.forEach(n => cats[n] = 0);
    weekExp.forEach(e => { cats[e.cat] = (cats[e.cat] || 0) + e.amount; });

    return { totalSpent: ts, pct: p, catData: Object.entries(cats) };
  }, [expenses]);

  const remain = WEEKLY_BUDGET - totalSpent;

  return (
    <div className="px-4 pt-4 space-y-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/50 rounded-2xl p-5 shadow-lg border border-white/40"
      >
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-lg font-black text-gray-800">お買い物 🏮</h1>
          <span className="text-xs bg-pink-100 text-pink-500 px-3 py-1 rounded-full font-medium">今週</span>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 bg-pink-50/50 rounded-xl p-3 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">支出</p>
            <p className="text-2xl font-black text-pink-500">¥{totalSpent.toLocaleString()}</p>
          </div>
          <div className="flex-1 bg-green-50/50 rounded-xl p-3 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">残り</p>
            <p className={`text-2xl font-black ${remain < 0 ? 'text-red-500' : 'text-green-500'}`}>
              ¥{remain.toLocaleString()}
            </p>
          </div>
        </div>
        {/* Progress */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{pct}%</span><span>¥{WEEKLY_BUDGET.toLocaleString()}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              className={`h-full rounded-full ${pct > 90 ? 'bg-red-400' : pct > 70 ? 'bg-yellow-400' : 'bg-green-400'}`}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      <GlassCard delay={0.1}>
        <h2 className="text-sm font-bold text-gray-700 mb-3">カテゴリー</h2>
        <div className="space-y-2">
          {catData.map(([name, val], i) => {
            const p = totalSpent > 0 ? Math.round((val / totalSpent) * 100) : 0;
            return (
              <motion.div
                key={name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="flex items-center gap-2 text-xs"
              >
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: CAT_COLORS[name] }} />
                <span className="flex-1 text-gray-600 truncate">{name}</span>
                <span className="font-bold text-gray-700">¥{val.toLocaleString()}</span>
                <div className="w-14 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${p}%`, background: CAT_COLORS[name] }} />
                </div>
                <span className="w-7 text-right text-gray-400">{p}%</span>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>

      {/* Monthly summary */}
      <GlassCard delay={0.2}>
        <h2 className="text-sm font-bold text-gray-700 mb-3">月間サマリー</h2>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-pink-50/50 rounded-xl p-3">
            <p className="text-[10px] text-gray-400">スーパー</p>
            <p className="text-lg font-black text-gray-700">¥100k</p>
          </div>
          <div className="bg-purple-50/50 rounded-xl p-3">
            <p className="text-[10px] text-gray-400">Amazon</p>
            <p className="text-lg font-black text-gray-700">¥16.7k</p>
          </div>
          <div className="col-span-2 bg-green-50/50 rounded-xl p-3">
            <p className="text-[10px] text-gray-400">月間節約</p>
            <p className="text-xl font-black text-green-500">¥35,500</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}