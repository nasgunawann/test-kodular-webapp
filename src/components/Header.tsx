import { Droplet, Bell } from 'lucide-react';

interface HeaderProps {
  title: string;
  onOpenNotifications: () => void;
  unreadCount: number;
}

export default function Header({ title, onOpenNotifications, unreadCount }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 mx-auto max-w-md h-16 bg-white border-b border-surface-container/60 shadow-sm flex items-center justify-between px-4 transition-colors">
      <div className="flex items-center gap-2.5">
        <div className="bg-primary-container/10 p-1.5 rounded-lg flex items-center justify-center">
          <Droplet className="w-6 h-6 text-primary" fill="currentColor" />
        </div>
        <h1 className="font-semibold text-lg text-primary tracking-tight select-none">
          {title}
        </h1>
      </div>
      
      <button 
        id="btn-bell-notif"
        onClick={onOpenNotifications}
        className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95 cursor-pointer"
        aria-label="Notification Bell"
      >
        <Bell className="w-5.5 h-5.5 text-on-surface-variant hover:text-primary transition-colors" />
        {unreadCount > 0 && (
          <span 
            id="notif-badge-dot"
            className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse" 
          />
        )}
      </button>
    </header>
  );
}
