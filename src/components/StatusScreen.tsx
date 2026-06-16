import { useState } from 'react';
import { Search, SlidersHorizontal, Check, AlertTriangle, ChevronRight, HelpCircle, PhoneCall, Trash2 } from 'lucide-react';
import { Submission } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface StatusScreenProps {
  submissions: Submission[];
  onOpenHelp: () => void;
}

export default function StatusScreen({ submissions, onOpenHelp }: StatusScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'SEDANG DIPROSES' | 'SURVEY LOKASI' | 'SELESAI' | 'DIBATALKAN'>('ALL');
  const [showFilters, setShowFilters] = useState(false);
  
  // Track which registration ID is currently expanded and visualised in the top vertical timeline
  const [selectedRegId, setSelectedRegId] = useState<string>(
    submissions.length > 0 ? submissions[0].id : ''
  );

  // Filter submissions
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch = sub.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sub.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sub.subType.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === 'ALL') return matchesSearch;
    return matchesSearch && sub.status === statusFilter;
  });

  // Find the currently tracked submission for the top vertical timeline view
  const activeTrackedSub = submissions.find(s => s.id === selectedRegId) || submissions[0];

  return (
    <div className="space-y-6 pb-28 pt-4">
      {/* Search Header and Filter Actions */}
      <section className="flex gap-2.5">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            id="search-registrasi"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari No. Registrasi atau jenis layanan..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl text-xs transition-shadow"
          />
        </div>
        <button
          id="btn-toggle-filters"
          onClick={() => setShowFilters(!showFilters)}
          className={`w-11 h-11 flex items-center justify-center rounded-xl border border-slate-200 transition-colors cursor-pointer ${
            showFilters || statusFilter !== 'ALL' 
              ? 'bg-primary text-white border-primary' 
              : 'bg-white text-slate-600 hover:bg-slate-50'
          }`}
          aria-label="Filter Options"
        >
          <SlidersHorizontal className="w-4.5 h-4.5" />
        </button>
      </section>

      {/* Filter Options Panel Drawer */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-white border border-slate-100 rounded-xl p-3 shadow-xs space-y-2 text-xs"
          >
            <p className="font-bold text-[10px] text-slate-400 uppercase tracking-wider px-1">Saring Status Pengajuan</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {(['ALL', 'SEDANG DIPROSES', 'SURVEY LOKASI', 'SELESAI', 'DIBATALKAN'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setStatusFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-transform active:scale-95 cursor-pointer uppercase ${
                    statusFilter === filter
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {filter === 'ALL' ? 'Semua' : filter}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main timeline tracker: focus card based on selection */}
      {activeTrackedSub ? (
        <section className="bg-white rounded-2xl border border-slate-100 shadow-[0px_4px_16px_rgba(0,0,0,0.03)] p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider select-none">No. Registrasi</span>
              <h3 className="font-mono text-sm font-extrabold text-slate-800 mt-0.5">{activeTrackedSub.id}</h3>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide ${
              activeTrackedSub.status === 'SEDANG DIPROSES' || activeTrackedSub.status === 'SURVEY LOKASI'
                ? 'bg-blue-50 text-blue-600 border border-blue-100'
                : activeTrackedSub.status === 'SELESAI'
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                : 'bg-red-50 text-red-600 border border-red-100'
            }`}>
              {activeTrackedSub.status}
            </span>
          </div>

          <p className="text-xs font-bold text-slate-700 leading-snug">
            Detail Pengajuan: {activeTrackedSub.type}
          </p>

          {/* Stepper timeline */}
          <div className="relative pl-7 space-y-6 before:absolute before:left-3 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
            {activeTrackedSub.steps.map((step, idx) => {
              const isDone = step.status === 'completed';
              const isCurrent = step.status === 'current';

              return (
                <div key={idx} className="relative">
                  {/* Bullet Indicator */}
                  <div className={`absolute -left-7 top-0.5 w-6.5 h-6.5 rounded-full flex items-center justify-center border-3 ring-4 ring-white ${
                    isDone 
                      ? 'bg-primary border-primary text-white' 
                      : isCurrent
                      ? 'bg-white border-primary text-primary animate-pulse'
                      : 'bg-white border-slate-200 text-slate-300'
                  }`}>
                    {isDone ? (
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    ) : (
                      <div className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-primary' : 'bg-slate-200'}`} />
                    )}
                  </div>

                  {/* Step texts */}
                  <div>
                    <h4 className={`text-xs tracking-tight ${isCurrent ? 'font-bold text-primary' : isDone ? 'font-bold text-slate-800' : 'font-medium text-slate-400'}`}>
                      {step.title}
                    </h4>
                    {step.time && (
                      <span className="text-[10px] font-medium text-slate-400 block mt-0.5">{step.time}</span>
                    )}
                    <p className={`text-[11px] leading-relaxed mt-1 ${isCurrent ? 'text-primary/95 bg-primary/5 p-2.5 rounded-xl border border-primary/10 font-medium' : isDone ? 'text-slate-500' : 'text-slate-400'}`}>
                      {step.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <div className="bg-white rounded-xl py-12 text-center text-slate-400 border border-slate-100">
          <SlidersHorizontal className="w-10 h-10 stroke-1 mx-auto mb-2 text-slate-300" />
          <p className="text-xs font-semibold">Tidak ada pengajuan ditemukan</p>
        </div>
      )}

      {/* Submission history list */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-slate-850 uppercase tracking-widest leading-none">
            Riwayat Pengajuan
          </h3>
          {filteredSubmissions.length > 3 && (
            <span className="text-[10px] font-bold text-primary-container">Lihat Semua</span>
          )}
        </div>

        <div className="space-y-2.5">
          {filteredSubmissions.map((sub) => {
            const isSelected = sub.id === selectedRegId;
            return (
              <button
                key={sub.id}
                id={`history-card-${sub.id}`}
                onClick={() => setSelectedRegId(sub.id)}
                className={`w-full text-left p-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-primary/5 border-primary shadow-xs ring-1 ring-primary/10'
                    : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-3xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white ${
                    sub.status === 'SELESAI' 
                      ? 'bg-emerald-500' 
                      : sub.status === 'DIBATALKAN'
                      ? 'bg-red-500' 
                      : 'bg-blue-600'
                  }`}>
                    <small className="font-extrabold text-[12px] uppercase select-none">
                      {sub.type === 'Pasang Baru' ? 'PB' : sub.type === 'Pasang Meter' ? 'PM' : sub.type.includes('Laporan') ? 'LK' : 'PG'}
                    </small>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800 leading-none">{sub.type}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold leading-none ${
                        sub.status === 'SELESAI'
                          ? 'bg-emerald-50 text-emerald-700'
                          : sub.status === 'DIBATALKAN'
                          ? 'bg-red-50 text-red-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}>
                        {sub.status === 'SELESAI' ? 'SELESAI' : sub.status === 'DIBATALKAN' ? 'BATAL' : 'PROSES'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 font-mono">{sub.id} • {sub.createdAt}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
              </button>
            );
          })}
        </div>
      </section>

      {/* Butuh Bantuan Contact CS Banner */}
      <section className="bg-primary-container/10 border border-primary-container/20 rounded-2xl p-5 text-center flex flex-col items-center">
        <HelpCircle className="w-10 h-10 text-primary-container mb-2 stroke-1" />
        <h4 className="text-xs font-bold text-slate-800">Butuh Bantuan Progress?</h4>
        <p className="text-[11px] text-slate-500 max-w-xs mt-1 leading-relaxed">
          Jika pengajuan meteran air Anda memakan waktu lebih dari 7 hari kerja tanpa pembaruan estimasi, silakan hubungi customer service kebanggaan kami.
        </p>
        <button
          id="btn-status-help"
          onClick={onOpenHelp}
          className="mt-3.5 bg-primary hover:bg-primary-container text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer transition-colors active:scale-95"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          Hubungi Tirtanadi
        </button>
      </section>
    </div>
  );
}
