import { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNavBar from './components/BottomNavBar';
import HomeScreen from './components/HomeScreen';
import FormScreen from './components/FormScreen';
import StatusScreen from './components/StatusScreen';
import ProfileScreen from './components/ProfileScreen';
import LoginScreen from './components/LoginScreen';

// Secondary Modals / Overlay Drawers
import NotificationsModal from './components/NotificationsModal';
import BillsModal from './components/BillsModal';
import HelpCenterModal from './components/HelpCenterModal';
import TermsModal from './components/TermsModal';

// Storage Helper
import {
  getProfile,
  saveProfile,
  getSubmissions,
  saveSubmissions,
  getBills,
  saveBills,
  getNotifications,
  saveNotifications,
  getIsLoggedIn,
  setIsLoggedIn,
  payBill,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  resetLocalStorage,
  initializeEmptyAccount
} from './utils/storage';

import { UserProfile, Submission, Bill, Notification } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isLoggedIn, setIsLoggedInState] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'home' | 'form' | 'status' | 'profile'>('home');
  const [selectedFormType, setSelectedFormType] = useState<string>(''); // For auto-populating from cards

  // Core domain states
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Overlay Modals states
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isBillsOpen, setIsBillsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // Initialize data from localstorage on load
  useEffect(() => {
    // Read state from storage
    const authStatus = getIsLoggedIn();
    setIsLoggedInState(authStatus);

    setProfile(getProfile());
    setSubmissions(getSubmissions());
    setBills(getBills());
    setNotifications(getNotifications());
  }, []);

  // Sync state helpers
  const handleLoginSuccess = () => {
    setIsLoggedInState(true);
    setIsLoggedIn(true);
    // Reload state triggers
    setProfile(getProfile());
    setSubmissions(getSubmissions());
    setBills(getBills());
    setNotifications(getNotifications());
  };

  const handleLogout = () => {
    setIsLoggedInState(false);
    setIsLoggedIn(false);
    setActiveTab('home');
  };

  // Profile save updates
  const handleUpdateProfile = (updated: UserProfile) => {
    setProfile(updated);
    saveProfile(updated);

    // Update notifications list
    const newNotif: Notification = {
      id: `NOTIF-${Date.now()}`,
      title: 'Profil Diperbarui',
      message: 'Ubah data informasi akun berhasil disimpan.',
      time: 'Baru saja',
      isRead: false
    };
    const updatedNotifs = [newNotif, ...notifications];
    setNotifications(updatedNotifs);
    saveNotifications(updatedNotifs);
  };

  // Submission Form callback
  const handleSubmissionSuccess = (newSubmission: Submission) => {
    const updatedSubs = [newSubmission, ...submissions];
    setSubmissions(updatedSubs);
    saveSubmissions(updatedSubs);

    // Create a notification for it
    const newNotif: Notification = {
      id: `NOTIF-${Date.now()}`,
      title: 'Registrasi Terkirim',
      message: `Permohonan ${newSubmission.type} berhasil diajukan dengan nomor ${newSubmission.id}.`,
      time: 'Baru saja',
      isRead: false
    };
    const updatedNotifs = [newNotif, ...notifications];
    setNotifications(updatedNotifs);
    saveNotifications(updatedNotifs);
  };

  // Bills payment callback
  const handlePayBillSuccess = (billId: string) => {
    const updatedBills = payBill(billId);
    setBills(updatedBills);

    // Add paid water bill notification
    const matchedBill = bills.find(b => b.id === billId);
    if (!matchedBill) return;

    const newNotif: Notification = {
      id: `NOTIF-${Date.now()}`,
      title: 'Pembayaran Diterima',
      message: `Terima kasih! Pembayaran air bersih untuk bulan ${matchedBill.month} telah lunas terbayarkan.`,
      time: 'Baru saja',
      isRead: false
    };
    const updatedNotifs = [newNotif, ...notifications];
    setNotifications(updatedNotifs);
    saveNotifications(updatedNotifs);
  };

  // Notification action helpers
  const handleMarkAsRead = (id: string) => {
    const updated = markNotificationAsRead(id);
    setNotifications(updated);
  };

  const handleMarkAllAsRead = () => {
    const updated = markAllNotificationsAsRead();
    setNotifications(updated);
  };

  // Calculate unread notifications count
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Active submission display on Home screen (e.g. the first index item if active)
  const latestActiveSubmission = submissions.find(
    s => s.status === 'SEDANG DIPROSES' || s.status === 'SURVEY LOKASI'
  ) || submissions[0];

  // Render proper header titles
  const getHeaderTitle = () => {
    if (activeTab === 'profile') return 'Profil';
    if (activeTab === 'form') return 'Pengajuan';
    if (activeTab === 'status') return 'Status';
    return 'PDAM Tirtanadi';
  };

  // Dev tools quick reset helper for tester
  const handleResetAppLocalState = () => {
    if (window.confirm('Simulasi: Reset data localstorage ke kondisi bawaan awal?')) {
      resetLocalStorage();
      setProfile(getProfile());
      setSubmissions(getSubmissions());
      setBills(getBills());
      setNotifications(getNotifications());
      setActiveTab('home');
      alert('Data localstorage berhasil disetel ulang!');
    }
  };

  const handleLoginDemoEmpty = () => {
    initializeEmptyAccount();
    setIsLoggedInState(true);
    // Reload state triggers
    setProfile(getProfile());
    setSubmissions(getSubmissions());
    setBills(getBills());
    setNotifications(getNotifications());
  };

  if (!isLoggedIn || !profile) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center py-0 sm:py-6 md:py-10 bg-radial from-slate-800 to-slate-950 font-sans text-slate-800 antialiased overflow-x-hidden">
        <div className="relative w-full sm:max-w-md sm:h-[880px] bg-slate-50 sm:rounded-[36px] sm:shadow-2xl sm:border-[10px] sm:border-slate-800 overflow-hidden flex flex-col flex-1 sm:flex-initial">
          <LoginScreen onLoginSuccess={handleLoginSuccess} onLoginDemoEmpty={handleLoginDemoEmpty} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center py-0 sm:py-6 md:py-10 bg-radial from-slate-800 to-slate-950 font-sans text-slate-800 antialiased overflow-x-hidden">
      
      {/* Smartphone frame container simulation (only active on desktop view sizes) */}
      <div className="relative w-full sm:max-w-md sm:h-[880px] bg-slate-50 sm:rounded-[36px] sm:shadow-2xl sm:border-[10px] sm:border-slate-800 overflow-hidden flex flex-col flex-1 sm:flex-initial">
        
        {/* Dynamic Header */}
        <Header 
          title={getHeaderTitle()} 
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          unreadCount={unreadCount}
        />

        {/* Dynamic sub-screen rendering with sliding transition animations */}
        <main className="flex-1 overflow-y-auto px-4 pt-16 no-scrollbar pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {activeTab === 'home' && (
                <HomeScreen 
                  profile={profile}
                  latestSubmission={latestActiveSubmission}
                  onNavigateToTab={setActiveTab}
                  onOpenBills={() => setIsBillsOpen(true)}
                  onOpenHelp={() => setIsHelpOpen(true)}
                  onSelectFormType={(type) => setSelectedFormType(type)}
                />
              )}

              {activeTab === 'form' && (
                <FormScreen 
                  profile={profile}
                  selectedType={selectedFormType}
                  onClearSelectedType={() => setSelectedFormType('')}
                  onSubmitSuccess={handleSubmissionSuccess}
                />
              )}

              {activeTab === 'status' && (
                <StatusScreen 
                  submissions={submissions}
                  onOpenHelp={() => setIsHelpOpen(true)}
                />
              )}

              {activeTab === 'profile' && (
                <ProfileScreen 
                  profile={profile}
                  onUpdateProfile={handleUpdateProfile}
                  onNavigateToTab={setActiveTab}
                  onOpenBills={() => setIsBillsOpen(true)}
                  onOpenHelp={() => setIsHelpOpen(true)}
                  onOpenTerms={() => setIsTermsOpen(true)}
                  onLogout={handleLogout}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Quick Reset LocalStorage button floating in bottom corner for testing and reviewer convenience */}
        <button
          onClick={handleResetAppLocalState}
          className="absolute bottom-20 right-4 z-30 bg-slate-800/80 hover:bg-slate-800 backdrop-blur-xs text-white p-2 rounded-full cursor-pointer opacity-40 hover:opacity-100 transition-opacity flex items-center justify-center shadow-md select-none text-[9px] font-bold"
          title="Reset Default LocalStorage"
        >
          Reset Demo
        </button>

        {/* Navigation Tabs Bar */}
        <BottomNavBar activeTab={activeTab} onChangeTab={setActiveTab} />

        {/* Overlay Drawers & Screens */}
        <NotificationsModal 
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onMarkAllAsRead={handleMarkAllAsRead}
        />

        <BillsModal 
          isOpen={isBillsOpen}
          onClose={() => setIsBillsOpen(false)}
          bills={bills}
          onPayBill={handlePayBillSuccess}
          idPelanggan={profile.idPelanggan}
        />

        <HelpCenterModal 
          isOpen={isHelpOpen}
          onClose={() => setIsHelpOpen(false)}
        />

        <TermsModal 
          isOpen={isTermsOpen}
          onClose={() => setIsTermsOpen(false)}
        />

      </div>
    </div>
  );
}
