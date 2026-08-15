'use client';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { meals } from '@/lib/data';

export default function MealsPage() {
  let weekTotal = 0;
  meals.forEach(m => { weekTotal += m.items.reduce((s, i) => s + i.price, 0); });

  return (
    <div className="px-4 pt-4 space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/50 rounded-2xl p-5 shadow-lg border border-white/40"
      >
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-lg font-black text-gray-800">🍽️ 今週の献立</h1>
          <span className="text-xs bg-pink-100 text-pink-500 px-3 py-1 rounded-full font-medium">7日間</span>
        </div>
        <div className="space-y-3">
          {meals.map((day, di) => {
            const dt = day.items.reduce((s, i) => s + i.price, 0);
            return (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: di * 0.05 }}
                className="bg-white/60 rounded-xl p-3 border border-pink-100/30"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-sm text-gray-700">{day.day}</span>
                  <span className="text-sm font-bold text-purple-500">¥{dt.toLocaleString()}</span>
                </div>
                {day.items.map((item, ii) => (
                  <div key={ii} className="flex items-center gap-2 py-1 border-t border-pink-50 last:border-0">
                    <span className="text-lg">{item.icon}</span>
                    <span className="flex-1 text-xs text-gray-600">{item.text}</span>
                    <span className="text-xs font-bold text-gray-500">¥{item.price}</span>
                  </div>
                ))}
              </motion.div>
            );
          })}
        </div>
        <div className="text-right mt-3 pt-3 border-t border-pink-100">
          <span className="text-sm font-black text-purple-500">合計: ¥{weekTotal.toLocaleString()} / ¥23,000</span>
        </div>
      </motion.div>
    </div>
  );
}