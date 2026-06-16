import { FileText, Receipt, Gauge, Headset, Plus, ChevronRight } from 'lucide-react';
import { UserProfile, Submission } from '../types';
import { motion } from 'motion/react';

interface HomeScreenProps {
  profile: UserProfile;
  latestSubmission: Submission | undefined;
  onNavigateToTab: (tab: 'home' | 'form' | 'status' | 'profile') => void;
  onOpenBills: () => void;
  onOpenHelp: () => void;
  onSelectFormType: (type: string) => void;
}

export default function HomeScreen({
  profile,
  latestSubmission,
  onNavigateToTab,
  onOpenBills,
  onOpenHelp,
  onSelectFormType
}: HomeScreenProps) {
  
  // Custom navigation handler to auto pre-filter or scroll to specific item
  const handleCekDetail = () => {
    onNavigateToTab('status');
  };

  const handleLayananPasangMeter = () => {
    onSelectFormType('Pasang Meter');
    onNavigateToTab('form');
  };

  const handleBuatPengajuanBaru = () => {
    onSelectFormType('Pasang Baru');
    onNavigateToTab('form');
  };

  return (
    <div className="space-y-6 pb-28 pt-4">
      {/* Greetings Header Section */}
      <div className="px-1">
        <p className="text-xs text-slate-400 font-medium tracking-wide">Selamat Datang,</p>
        <h2 className="text-xl font-extrabold text-primary tracking-tight mt-0.5 select-none">
          {profile.name}
        </h2>
      </div>

      {/* Latest Trackable Submission Card (Pengajuan Terakhir) */}
      {latestSubmission && (
        <section className="bg-white rounded-2xl border border-slate-100 shadow-[0px_4px_16px_rgba(0,0,0,0.03)] p-4 flex flex-col space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest leading-none">
              Pengajuan Terakhir
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide shrink-0 ${
              latestSubmission.status === 'SEDANG DIPROSES' || latestSubmission.status === 'SURVEY LOKASI'
                ? 'bg-blue-50 text-blue-600 border border-blue-100'
                : latestSubmission.status === 'SELESAI'
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                : 'bg-red-50 text-red-600 border border-red-100'
            }`}>
              🚗 {latestSubmission.status}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
              <FileText className="w-5.5 h-5.5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-slate-800 truncate leading-snug">
                {latestSubmission.type} - {latestSubmission.subType}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                Update: {latestSubmission.updateTime}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-50 pt-3">
            {/* Attachment icons */}
            <div className="flex items-center -space-x-2">
              <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-slate-500">
                pdf
              </div>
              <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-slate-500">
                jpg
              </div>
              <div className="w-6 h-6 rounded-full bg-primary text-white border-2 border-white flex items-center justify-center text-[9px] font-extrabold font-mono shrink-0 select-none">
                +2
              </div>
            </div>

            <button
              id="btn-cek-detail"
              onClick={handleCekDetail}
              className="text-[11px] font-bold text-primary hover:text-primary-container flex items-center gap-0.5 underline cursor-pointer"
            >
              Cek Detail <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </section>
      )}

      {/* Buat Pengajuan Baru Promo Banner card */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-container text-white p-5 shadow-sm">
          {/* Subtle watermark background plus pattern */}
          <div className="absolute right-[-15px] bottom-[-15px] opacity-15 text-[150px] font-light leading-none pointer-events-none font-mono">
            +
          </div>
          
          <div className="relative flex flex-col justify-between h-full space-y-4 z-10">
            <div className="inline-flex items-center gap-2">
              <div className="p-1 bg-white/10 rounded-lg">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-sm tracking-tight">Buat Pengajuan Baru</h3>
            </div>
            
            <p className="text-xs text-white/80 leading-relaxed max-w-[210px] select-none">
              Layanan sambungan baru atau perubahan status pelanggan lebih cepat.
            </p>

            <button
              id="btn-mulai-pengajuan"
              onClick={handleBuatPengajuanBaru}
              className="mt-2 self-start bg-white hover:bg-slate-50 text-primary text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer active:scale-95"
            >
              Mulai Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid (Layanan Kami) */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest px-1">
          Layanan Kami
        </h3>
        <div className="grid grid-cols-2 gap-3">
          
          {/* Layanan 1: Pasang Meter */}
          <button
            id="layanan-pasang-meter"
            onClick={handleLayananPasangMeter}
            className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col items-center justify-center text-center shadow-3xs cursor-pointer hover:border-primary/10 hover:shadow-xs hover:-translate-y-0.5 transition-all active:scale-95 duration-150"
          >
            <div className="w-11 h-11 rounded-full bg-blue-50 text-primary flex items-center justify-center mb-2.5">
              <Gauge className="w-5.5 h-5.5" />
            </div>
            <span className="text-[11px] font-bold text-slate-700 tracking-tight">
              Pasang Meter
            </span>
          </button>

          {/* Layanan 2: Layanan CS */}
          <button
            id="layanan-hubungi-cs"
            onClick={onOpenHelp}
            className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col items-center justify-center text-center shadow-3xs cursor-pointer hover:border-primary/10 hover:shadow-xs hover:-translate-y-0.5 transition-all active:scale-95 duration-150"
          >
            <div className="w-11 h-11 rounded-full bg-blue-50 text-primary flex items-center justify-center mb-2.5">
              <Headset className="w-5.5 h-5.5" />
            </div>
            <span className="text-[11px] font-bold text-slate-700 tracking-tight">
              Layanan CS
            </span>
          </button>

        </div>
      </section>
    </div>
  );
}
