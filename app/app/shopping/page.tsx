'use client';
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { shopMain, shopSup, amazonItems } from '@/lib/data';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { ShopItem } from '@/lib/types';

function ShopSection({ title, badge, items, listKey }: { title: string; badge?: string; items: ShopItem[]; listKey: string }) {
  const [checks, setChecks] = useLocalStorage<Record<string, boolean>>('oi_corigi_shop', {});
  const toggle = useCallback((key: string) => {
    setChecks(prev => ({ ...prev, [key]: !prev[key] }));
  }, [setChecks]);

  const total = items.reduce((s, i) => s + i.price, 0);

  return (
    <GlassCard delay={0.1}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-gray-700">{title}</h2>
        {badge && <span className="text-[10px] bg-purple-100 text-purple-500 px-2 py-0.5 rounded-full font-medium">{badge}</span>}
      </div>
      <div className="space-y-1">
        {items.map((item, i) => {
          const key = `${listKey}_${i}`;
          const done = checks[key];
          return (
            <motion.div
              key={key}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggle(key)}
              className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0 cursor-pointer"
            >
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                done ? 'bg-green-400 border-green-400' : 'border-gray-200'
              }`}>
                {done && <span className="text-white text-xs font-bold">✓</span>}
              </div>
              <span className={`flex-1 text-sm ${done ? 'line-through text-gray-300' : 'text-gray-600'}`}>
                {item.name}
              </span>
              <span className="text-xs text-gray-400">{item.qty}</span>
              <span className="text-sm font-bold text-gray-600 w-16 text-right">¥{item.price}</span>
            </motion.div>
          );
        })}
      </div>
      <div className="text-right mt-3 pt-2 border-t border-gray-100">
        <span className="text-sm font-black text-purple-500">計: ¥{total.toLocaleString()}</span>
      </div>
    </GlassCard>
  );
}

export default function ShoppingPage() {
  return (
    <div className="px-4 pt-4 space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/50 rounded-2xl p-5 shadow-lg border border-white/40"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-black text-gray-800">🛒 買い物リスト</h1>
          <span className="text-xs bg-pink-100 text-pink-500 px-3 py-1 rounded-full font-medium">今週</span>
        </div>
      </motion.div>

      <ShopSection title="メイン — 土曜日 (OK)" badge="メイン" items={shopMain} listKey="main" />
      <ShopSection title="追加 — 水曜日" badge="追加" items={shopSup} listKey="sup" />
      <ShopSection title="📦 Amazon" badge="今月" items={amazonItems} listKey="amazon" />
    </div>
  );
}