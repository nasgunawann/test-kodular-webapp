import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Edit, Receipt, ClipboardList, HelpCircle, Gavel, LogOut, X, Camera, Check, ChevronRight } from 'lucide-react';
import { UserProfile } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ProfileScreenProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onNavigateToTab: (tab: 'home' | 'form' | 'status' | 'profile') => void;
  onOpenBills: () => void;
  onOpenHelp: () => void;
  onOpenTerms: () => void;
  onLogout: () => void;
}

export default function ProfileScreen({
  profile,
  onUpdateProfile,
  onNavigateToTab,
  onOpenBills,
  onOpenHelp,
  onOpenTerms,
  onLogout
}: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editCustomerId, setEditCustomerId] = useState(profile.idPelanggan);
  const [editEmail, setEditEmail] = useState(profile.email);
  const [editPhone, setEditPhone] = useState(profile.phone);
  const [editAddress, setEditAddress] = useState(profile.address);
  const [editAvatar, setEditAvatar] = useState(profile.avatar);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      idPelanggan: editCustomerId,
      name: editName,
      email: editEmail,
      phone: editPhone,
      address: editAddress,
      avatar: editAvatar
    });
    setIsEditing(false);
  };

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imgFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setEditAvatar(reader.result);
        }
      };
      reader.readAsDataURL(imgFile);
    }
  };

  return (
    <div className="space-y-6 pb-28 pt-4">
      {/* 1. Header Profile Card with dynamic elements */}
      <section className="relative overflow-hidden bg-white rounded-2xl border border-slate-100 shadow-[0px_4px_16px_rgba(0,0,0,0.03)] p-5 flex flex-col items-center">
        {/* Curved mesh profile header watermark */}
        <div className="absolute top-0 left-0 w-full h-20 profile-mesh opacity-10 pointer-events-none" />

        <div className="relative mt-4">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-slate-100 flex items-center justify-center">
            <img
              alt={profile.name}
              src={profile.avatar}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover select-none"
              onError={(e) => {
                // Fallback icon if img template fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <button
            id="btn-edit-avatar-trigger"
            onClick={() => setIsEditing(true)}
            className="absolute bottom-0 right-0 bg-primary hover:bg-primary-container text-white p-2 rounded-full shadow-md active:scale-90 transition-transform cursor-pointer"
            aria-label="Edit Profile Details"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="text-center mt-3.5">
          <h2 className="text-base font-extrabold text-slate-800 tracking-tight leading-none">{profile.name}</h2>
          <p className="text-[11px] font-bold text-slate-400 mt-1.5 whitespace-nowrap">
            ID Pelanggan: {profile.idPelanggan}
          </p>
        </div>
      </section>

      {/* 2. Account Information Section (Informasi Akun) */}
      <section className="space-y-2.5">
        <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">
          Informasi Akun
        </h3>
        
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0px_4px_16px_rgba(0,0,0,0.02)] overflow-hidden">
          
          {/* Row 1: Email */}
          <div className="flex items-center p-4 border-b border-slate-50 gap-3">
            <div className="w-9 h-9 bg-primary/5 text-primary rounded-xl flex items-center justify-center shrink-0">
              <Mail className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email</p>
              <p className="text-xs font-semibold text-slate-800 truncate mt-0.5">{profile.email}</p>
            </div>
          </div>

          {/* Row 2: Phone */}
          <div className="flex items-center p-4 border-b border-slate-50 gap-3">
            <div className="w-9 h-9 bg-primary/5 text-primary rounded-xl flex items-center justify-center shrink-0">
              <Phone className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nomor Telepon</p>
              <p className="text-xs font-semibold text-slate-800 truncate mt-0.5">{profile.phone}</p>
            </div>
          </div>

          {/* Row 3: Address */}
          <div className="flex items-start p-4 gap-3">
            <div className="w-9 h-9 bg-primary/5 text-primary rounded-xl flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Alamat Lengkap</p>
              <p className="text-xs font-semibold text-slate-700 leading-relaxed mt-0.5">{profile.address}</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Main Menu List Section */}
      <section className="space-y-2.5">
        <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">
          Menu Utama
        </h3>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0px_4px_16px_rgba(0,0,0,0.02)] overflow-hidden">
          
          {/* Menu item 2: Riwayat Pengajuan */}
          <button
            id="profile-menu-submissions"
            onClick={() => onNavigateToTab('status')}
            className="w-full flex items-center justify-between p-4 border-b border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer select-none"
          >
            <div className="flex items-center gap-3">
              <ClipboardList className="w-4.5 h-4.5 text-slate-400" />
              <span className="text-xs font-semibold text-slate-700">Riwayat Pengajuan</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </button>

          {/* Menu item 3: Pusat Bantuan */}
          <button
            id="profile-menu-help"
            onClick={onOpenHelp}
            className="w-full flex items-center justify-between p-4 border-b border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer select-none"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-4.5 h-4.5 text-slate-400" />
              <span className="text-xs font-semibold text-slate-700">Pusat Bantuan</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </button>

          {/* Menu item 4: Ketentuan Layanan */}
          <button
            id="profile-menu-terms"
            onClick={onOpenTerms}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors cursor-pointer select-none"
          >
            <div className="flex items-center gap-3">
              <Gavel className="w-4.5 h-4.5 text-slate-400" />
              <span className="text-xs font-semibold text-slate-700">Ketentuan Layanan</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </button>

        </div>
      </section>

      {/* 4. Logout trigger button */}
      <section className="pt-2">
        <button
          id="btn-logout"
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 p-3.5 bg-white border border-red-200 text-red-500 rounded-2xl shadow-xs hover:bg-red-50/30 transition-colors active:scale-[0.99] cursor-pointer"
        >
          <LogOut className="w-4.5 h-4.5" />
          <span className="text-xs font-bold font-sans">Keluar</span>
        </button>
      </section>

      {/* 5. In-App edit profile Modal drawer */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 mx-auto max-w-md bg-black/45 backdrop-blur-xs flex items-end justify-center">
            <div className="absolute inset-0" onClick={() => setIsEditing(false)} />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 210 }}
              className="relative w-full max-h-[85vh] bg-white rounded-t-2xl shadow-xl flex flex-col z-10 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50">
                <span className="text-xs font-extrabold text-slate-800">Ubah Profil Pengguna</span>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-1 hover:bg-slate-200 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSaveProfile} className="p-5 overflow-y-auto space-y-4 text-xs no-scrollbar">
                
                {/* Photo editor */}
                <div className="flex flex-col items-center py-2">
                  <div className="relative group">
                    <img
                      alt="avatar preload"
                      src={editAvatar}
                      className="w-20 h-20 rounded-full object-cover border-2 border-slate-100 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      aria-label="Upload New Avatar"
                    >
                      <Camera className="w-5 h-5" />
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarSelect}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[10px] font-bold text-primary mt-2 cursor-pointer hover:underline"
                  >
                    Ganti Foto Profil
                  </button>
                </div>

                {/* Name fields */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    required
                  />
                </div>

                {/* ID Pelanggan Field */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">No. Pelanggan</label>
                  <input
                    type="text"
                    value={editCustomerId}
                    onChange={(e) => setEditCustomerId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-mono text-slate-600 bg-slate-50"
                    maxLength={10}
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Alamat Email</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    required
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nomor Handphone</label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                    required
                  />
                </div>

                {/* Address Field */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Alamat Rumah</label>
                  <textarea
                    rows={2}
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-container text-white font-bold py-2.5 rounded-xl border-none flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  Simpan Perubahan
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
