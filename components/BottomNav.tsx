'use client';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

const tabs = [
  { path: '/app', icon: '📅', label: '献立' },
  { path: '/app/shopping', icon: '🛒', label: '買い物' },
  { path: '/app/expenses', icon: '💰', label: '支出' },
  { path: '/app/settings', icon: '⚙️', label: '設定' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-lg mx-auto">
      <div className="backdrop-blur-xl bg-white/70 border-t border-white/40 flex px-2 pb-[env(safe-area-inset-bottom,0px)]">
        {tabs.map(tab => {
          const active = pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => router.push(tab.path)}
              className="flex-1 flex flex-col items-center justify-center py-2 relative"
            >
              <span className="text-xl">{tab.icon}</span>
              <span className={`text-[10px] font-medium mt-0.5 ${active ? 'text-pink-500' : 'text-gray-400'}`}>
                {tab.label}
              </span>
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 w-8 h-0.5 bg-pink-400 rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}