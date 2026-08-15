'use client';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { Expense } from '@/lib/types';

export default function SettingsPage() {
  const [, setExpenses] = useLocalStorage<Expense[]>('oi_corigi_expenses', []);
  const [, setShop] = useLocalStorage('oi_corigi_shop', {});

  const exportData = () => {
    const data = {
      expenses: JSON.parse(localStorage.getItem('oi_corigi_expenses') || '[]'),
      shop: JSON.parse(localStorage.getItem('oi_corigi_shop') || '{}'),
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `oi-corigi-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click(); URL.revokeObjectURL(url);
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (data.expenses) localStorage.setItem('oi_corigi_expenses', JSON.stringify(data.expenses));
        if (data.shop) localStorage.setItem('oi_corigi_shop', JSON.stringify(data.shop));
        window.location.reload();
      } catch { /* ignore */ }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const resetAll = () => {
    if (confirm('すべてのデータを削除しますか？')) {
      localStorage.removeItem('oi_corigi_pin');
      localStorage.removeItem('oi_corigi_expenses');
      localStorage.removeItem('oi_corigi_shop');
      window.location.href = '/';
    }
  };

  return (
    <div className="px-4 pt-4 space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/50 rounded-2xl p-5 shadow-lg border border-white/40"
      >
        <h1 className="text-lg font-black text-gray-800">⚙️ 設定</h1>
      </motion.div>

      <GlassCard delay={0.1}>
        <div className="space-y-1">
          <div className="flex items-center justify-between py-3 border-b border-gray-50">
            <span className="text-sm text-gray-600">PINを変更</span>
            <button onClick={() => { localStorage.removeItem('oi_corigi_pin'); window.location.href = '/'; }}
              className="text-xs px-4 py-2 rounded-xl bg-pink-50 text-pink-500 font-medium hover:bg-pink-100 transition-colors">
              変更
            </button>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-50">
            <span className="text-sm text-gray-600">データをエクスポート</span>
            <button onClick={exportData}
              className="text-xs px-4 py-2 rounded-xl bg-blue-50 text-blue-500 font-medium hover:bg-blue-100 transition-colors">
              📥 出力
            </button>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-50">
            <span className="text-sm text-gray-600">データをインポート</span>
            <label className="text-xs px-4 py-2 rounded-xl bg-green-50 text-green-500 font-medium hover:bg-green-100 transition-colors cursor-pointer">
              📤 読込
              <input type="file" accept=".json" onChange={importData} className="hidden" />
            </label>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-gray-600">データを削除</span>
            <button onClick={resetAll}
              className="text-xs px-4 py-2 rounded-xl bg-red-50 text-red-400 font-medium hover:bg-red-100 transition-colors">
              🗑️ 削除
            </button>
          </div>
        </div>
      </GlassCard>

      <GlassCard delay={0.2}>
        <div className="text-center text-xs text-gray-400">
          <p className="font-bold text-gray-500 mb-1">お買い物 — Oi Corigi</p>
          <p>🛒 家族のための予算管理アプリ</p>
          <p className="mt-1">Made with ❤️ in Tokyo</p>
        </div>
      </GlassCard>
    </div>
  );
}