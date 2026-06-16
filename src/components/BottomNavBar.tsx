import { Home, FileText, ClipboardCheck, User } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavBarProps {
  activeTab: 'home' | 'form' | 'status' | 'profile';
  onChangeTab: (tab: 'home' | 'form' | 'status' | 'profile') => void;
}

export default function BottomNavBar({ activeTab, onChangeTab }: BottomNavBarProps) {
  const tabs = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'form' as const, label: 'Form', icon: FileText },
    { id: 'status' as const, label: 'Status', icon: ClipboardCheck },
    { id: 'profile' as const, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 mx-auto max-w-md bg-white border-t border-surface-container/65 shadow-[0px_-8px_24px_rgba(0,85,170,0.06)] px-4 py-2 flex justify-around items-center rounded-t-2xl">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            id={`nav-tab-${tab.id}`}
            onClick={() => onChangeTab(tab.id)}
            className="relative flex flex-col items-center justify-center py-1 px-4 rounded-full select-none cursor-pointer group"
          >
            {/* Active Glow Pill Background */}
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-primary/10 rounded-full"
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              />
            )}

            <div className={`relative flex flex-col items-center gap-0.5 z-10 transition-transform duration-150 active:scale-90 ${
              isActive 
                ? 'text-primary scale-105' 
                : 'text-secondary hover:text-primary transition-colors'
            }`}>
              <Icon 
                className="w-5.5 h-5.5" 
                strokeWidth={isActive ? 2.5 : 2} 
                fill={isActive && tab.id === 'profile' ? 'currentColor' : 'none'} 
              />
              <span className="text-[11px] font-medium tracking-wide">
                {tab.label}
              </span>
            </div>
          </button>
        );
      })}
    </nav>
  );
}
