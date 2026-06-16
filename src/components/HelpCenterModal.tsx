import { X, HelpCircle, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HelpCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpCenterModal({ isOpen, onClose }: HelpCenterModalProps) {
  if (!isOpen) return null;

  const faqs = [
    { q: 'Bagaimana cara mendaftar sambungan baru?', a: 'Anda dapat masuk ke tab "Form", mengisi Nama KTP, NIK, No HP, memilih "Pasang Baru" dan melengkapi keterangan tambahan. Petugas kami akan memproses berkas Anda.' },
    { q: 'Mengapa tagihan air bulan ini melonjak?', a: 'Kenaikan tagihan biasanya disebabkan adanya kebocoran pipa setelah meteran pelanggan, atau peningkatan aktivitas penggunaan air bersih. Silakan lakukan deteksi kebocoran sendiri dengan menutup semua kran.' },
    { q: 'Kapan jadwal pembubuhan meteran air?', a: 'Petugas pembaca meter berkunjung setiap bulan antara tanggal 1 - 10. Pastikan meteran air bersih Anda mudah diakses petugas.' },
    { q: 'Berapa lama survey berkas pengajuan baru?', a: 'Proses verifikasi dokumen berkisar 1x24 jam. Dilanjutkan dengan survey teknis lapangan dalam waktu maksimal 2x24 jam kerja.' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 mx-auto max-w-md bg-black/45 backdrop-blur-xs flex items-end justify-center">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 210 }}
          className="relative w-full max-h-[85vh] bg-white rounded-t-2xl shadow-xl flex flex-col z-10 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50">
            <div className="flex items-center gap-2">
              <span className="p-1 bg-primary/10 rounded-lg">
                <HelpCircle className="w-5 h-5 text-primary" />
              </span>
              <h2 className="text-base font-bold text-slate-800">Pusat Bantuan</h2>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-slate-150 rounded-full transition-colors cursor-pointer">
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 no-scrollbar space-y-5 bg-white">
            
            {/* Quick Contact buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a 
                href="tel:1500022" 
                className="p-3 bg-primary/5 hover:bg-primary/10 rounded-xl border border-primary/10 flex flex-col items-center justify-center text-center transition-colors group cursor-pointer"
              >
                <Phone className="w-5 h-5 text-primary mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-slate-700">Call Center 24 Jam</span>
                <span className="text-[10px] text-slate-500 mt-0.5">1500022</span>
              </a>
              <a 
                href="mailto:cs@pdamtirtanadi.co.id" 
                className="p-3 bg-secondary-container/20 hover:bg-secondary-container/40 rounded-xl border border-secondary-container/30 flex flex-col items-center justify-center text-center transition-colors group cursor-pointer"
              >
                <Mail className="w-5 h-5 text-secondary-container/100 text-slate-700 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-slate-700">Layanan Email</span>
                <span className="text-[10px] text-slate-500 mt-0.5">cs@tirtanadi.co.id</span>
              </a>
            </div>

            {/* WA Help Button */}
            <button 
              onClick={() => alert('Simulator: Anda berpindah membuka WhatsApp Support PDAM Tirtanadi')}
              className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-white text-[#25D366]" />
              Hubungi via WhatsApp (Chat Only)
            </button>

            {/* Operation Hours */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 flex items-start gap-2.5 text-xs text-slate-600">
              <Clock className="w-4 h-4 text-slate-500 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 block">Jam Operasional Kantor Pusat</span>
                <span className="text-[11px] text-slate-500">Senin - Jumat: 08:00 - 15:30 WIB <br />Sabtu - Minggu: Tutup (Call Center Tetap Aktif)</span>
              </div>
            </div>

            {/* FAQs Accordion */}
            <div>
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                Pertanyaan Populer (FAQ)
              </h3>
              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
                    <h4 className="text-xs font-bold text-slate-800">{faq.q}</h4>
                    <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
