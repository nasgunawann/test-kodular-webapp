import { X, CheckCheck, Info, Calendar, BellOff } from 'lucide-react';
import { Notification } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

export default function NotificationsModal({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead
}: NotificationsModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 mx-auto max-w-md flex items-end justify-center bg-black/45 backdrop-blur-xs">
        {/* Backdrop clickable */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          id="notifications-modal-container"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative w-full max-h-[85vh] bg-white rounded-t-2xl shadow-xl flex flex-col z-10 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-primary/10 rounded-lg">
                <CheckCheck className="w-5 h-5 text-primary" />
              </span>
              <h2 className="text-base font-bold text-slate-800">Notifikasi</h2>
            </div>
            
            <div className="flex items-center gap-2">
              {notifications.some(n => !n.isRead) && (
                <button
                  id="btn-mark-all-read"
                  onClick={onMarkAllAsRead}
                  className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                >
                  Tandai semua dibaca
                </button>
              )}
              <button
                id="btn-close-notif"
                onClick={onClose}
                className="p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto px-5 py-4 no-scrollbar space-y-3 bg-slate-50">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <BellOff className="w-12 h-12 stroke-1 mb-3" />
                <p className="text-sm font-medium">Tidak ada notifikasi dalam sistem</p>
              </div>
            ) : (
              notifications.map((notif) => {
                const getIcon = () => {
                  if (notif.title.includes('Tagihan')) {
                    return <Info className="w-5 h-5 text-blue-500" />;
                  } else if (notif.title.includes('Survey')) {
                    return <Calendar className="w-5 h-5 text-amber-500" />;
                  }
                  return <CheckCheck className="w-5 h-5 text-emerald-500" />;
                };

                const getBg = () => {
                  if (notif.title.includes('Tagihan')) return 'bg-blue-50';
                  if (notif.title.includes('Survey')) return 'bg-amber-50';
                  return 'bg-emerald-50';
                };

                return (
                  <motion.div
                    key={notif.id}
                    layoutId={notif.id}
                    onClick={() => onMarkAsRead(notif.id)}
                    className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                      notif.isRead
                        ? 'bg-white border-slate-100 text-slate-500 opacity-75'
                        : 'bg-white border-primary/20 shadow-xs text-slate-800 ring-1 ring-primary/5'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getBg()}`}>
                        {getIcon()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className={`text-sm tracking-tight ${notif.isRead ? 'font-medium' : 'font-bold text-slate-900'}`}>
                            {notif.title}
                          </h3>
                          {!notif.isRead && (
                            <span className="w-2 h-2 bg-primary rounded-full shrink-0" />
                          )}
                        </div>
                        <p className="text-xs mt-1 leading-relaxed text-slate-600">
                          {notif.message}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-2 font-medium">
                          {notif.time}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
