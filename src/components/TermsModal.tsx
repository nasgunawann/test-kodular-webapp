import { X, Gavel, FileText, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  if (!isOpen) return null;

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
                <Gavel className="w-5 h-5 text-primary" />
              </span>
              <h2 className="text-base font-bold text-slate-800">Ketentuan Layanan</h2>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-slate-150 rounded-full transition-colors cursor-pointer">
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 no-scrollbar bg-white text-slate-600 space-y-4 text-xs leading-relaxed">
            
            <div className="flex gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100 mb-2">
              <FileText className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              <p className="text-[11px] font-medium text-slate-500">
                Layanan PDAM Tirtanadi Digital diatur oleh Keputusan Direksi PDAM Provinsi Sumatera Utara mengenai administrasi penagihan dan penyambungan.
              </p>
            </div>

            <section>
              <h3 className="font-bold text-slate-800 text-sm mb-1">1. Kewajiban Pelanggan</h3>
              <p>Pelanggan berkewajiban merawat instalasi aliran pipa air dan menyedia akses bebas rintangan ke meter air bagi petugas pembaca atau surveyor lapangan. Diwajibkan melunasi tagihan setiap bulan selambat-lambatnya tanggal 20.</p>
            </section>

            <section>
              <h3 className="font-bold text-slate-800 text-sm mb-1">2. Denda dan Penonaktifan</h3>
              <p>Keterlambatan penyelesaian pelunasan tagihan air melewati batas jatuh tempo denda administratif per bulan sesuai golongan tarif. Apabila menunggak selama 3 bulan penuh, PDAM berhak menyegel dan menghentikan supply air tanpa pemberitahuan lisan tambahan.</p>
            </section>

            <section>
              <h3 className="font-bold text-slate-850 text-sm mb-1">3. Pengajuan Dokumen Pendukung</h3>
              <p>Segala formulir permohonan yang diajukan pemohon melalui aplikasi mobile (Pasang Baru, Pasang Meteran, dsb) harus mencantumkan dokumen valid, termasuk NIK KTP, nomor HP aktif, dan sertifikat rumah atau surat tanah jika dipersyaratkan.</p>
            </section>

            <section>
              <h3 className="font-bold text-slate-800 text-sm mb-1">4. Integritas Server Data</h3>
              <p>PDAM Tirtanadi menjamin keamanan data pribadi pengguna yang terdaftar di dalam database aplikasi (nama, no HP, alamat, email) dan tidak akan membagikannya kepada pihak ketiga tanpa persetujuan eksplisit Anda.</p>
            </section>

            <button 
              onClick={onClose}
              className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-xl font-bold flex items-center justify-center gap-1.5 cursor-pointer mt-6 active:scale-98 transition-transform"
            >
              <CheckCircle className="w-4 h-4" />
              Saya Memahami dan Menyetujui
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
