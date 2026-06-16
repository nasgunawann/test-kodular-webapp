import React, { useState, useRef, useEffect } from 'react';
import { Send, Info, CheckCircle2, AlertCircle, Upload, Film, Trash2, X } from 'lucide-react';
import { Submission, UserProfile } from '../types';

interface FormScreenProps {
  profile: UserProfile;
  onSubmitSuccess: (newSubmission: Submission) => void;
  selectedType: string;
  onClearSelectedType: () => void;
}

export default function FormScreen({
  profile,
  onSubmitSuccess,
  selectedType,
  onClearSelectedType
}: FormScreenProps) {
  // Form states
  const [name, setName] = useState(profile.name);
  const [nik, setNik] = useState('');
  const [phone, setPhone] = useState(profile.phone);
  const [type, setType] = useState('Pasang Baru');
  const [description, setDescription] = useState('');
  
  // Custom mock attachments uploaded
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Error validations state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdRegId, setCreatedRegId] = useState('');

  // Sync prop-selected type from home screen clicks
  useEffect(() => {
    if (selectedType) {
      setType(selectedType);
    }
  }, [selectedType]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Nama Lengkap wajib diisi sesuai KTP';
    }
    
    const cleanNik = nik.replace(/\D/g, '');
    if (!cleanNik) {
      newErrors.nik = 'NIK wajib diisi';
    } else if (cleanNik.length !== 16) {
      newErrors.nik = `NIK harus berjumlah 16 digit (Sekarang: ${cleanNik.length} digit)`;
    }

    if (!phone.trim()) {
      newErrors.phone = 'Nomor handphone wajib diisi';
    } else if (!/^(?:\+62|0)8[1-9]\d{7,10}$/.test(phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Format No. HP tidak valid (Contoh: 081234567890)';
    }

    if (!type) {
      newErrors.type = 'Pilih jenis permohonan Terlebih Dahulu';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate random sequential registration number
    const today = new Date();
    const dateStr = today.getFullYear() + 
      String(today.getMonth() + 1).padStart(2, '0') + 
      String(today.getDate()).padStart(2, '0');
    const randomSeq = String(Math.floor(1000 + Math.random() * 9000));
    const regId = `REG-${dateStr}-${randomSeq}`;

    const subType = type === 'Pasang Baru' ? 'Medan Kota' : 
                    type === 'Pasang Meter' ? 'Rumah Tangga' : 
                    type === 'Perubahan Golongan' ? 'Golongan Bisnis' : 'Pipa Utama';

    const newSubmission: Submission = {
      id: regId,
      type,
      subType,
      name,
      nik: nik.replace(/\D/g, ''),
      phone,
      description: description || 'Pemasangan sambungan baru atau pergantian pipa saluran utama.',
      status: 'SEDANG DIPROSES',
      updateTime: 'Baru saja',
      createdAt: `${today.getDate()} ${today.toLocaleString('id-ID', { month: 'short' })} ${today.getFullYear()}`,
      currentStep: 0,
      steps: [
        {
          title: 'Pendaftaran Berhasil',
          subtitle: 'Dokumen persyaratan telah diterima sistem.',
          time: `${today.getDate()} ${today.toLocaleString('id-ID', { month: 'short' })} ${today.getFullYear()}, ${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')} WIB`,
          status: 'completed'
        },
        {
          title: 'Verifikasi Dokumen',
          subtitle: 'Berkas Anda sedang diverifikasi admin loket.',
          status: 'current'
        },
        {
          title: 'Survey Lokasi',
          subtitle: 'Menunggu dokumen lolos verifikasi.',
          status: 'upcoming'
        },
        {
          title: 'Pemasangan Meteran',
          subtitle: 'Menunggu survey teknis selesai.',
          status: 'upcoming'
        }
      ]
    };

    setCreatedRegId(regId);
    setShowSuccess(true);
    onSubmitSuccess(newSubmission);
    
    // Clear trigger types
    onClearSelectedType();
  };

  // Drag and drop attachment utilities
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setAttachments(prev => [...prev, ...droppedFiles]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeAttachment = (indexToRemove: number) => {
    setAttachments(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-6 bg-white min-h-[60vh] select-none">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">Pengajuan Berhasil Dikirim!</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs px-2 leading-relaxed">
          Permohonan Anda sedang dalam antrian dan berkas pendaftaran divalidasi oleh surveyor PDAM Tirtanadi.
        </p>

        <div className="bg-slate-50 border border-slate-150 rounded-xl px-5 py-4 my-6 w-full max-w-sm space-y-2.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-medium">Nomor Registrasi:</span>
            <span className="font-mono font-bold text-primary text-sm">{createdRegId}</span>
          </div>
          <div className="flex justify-between items-center text-xs border-t border-slate-200/60 pt-2">
            <span className="text-slate-400 font-medium">Jenis Pengajuan:</span>
            <span className="font-bold text-slate-700">{type}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-medium">Pemohon KTP:</span>
            <span className="font-bold text-slate-705 truncate max-w-[150px]">{name}</span>
          </div>
        </div>

        <button
          id="btn-pantau-pengajuan"
          onClick={() => {
            setShowSuccess(false);
            setNik('');
            setDescription('');
            setAttachments([]);
            // Go check the Status screen which automatically displays the new registry!
            const statusTab = document.getElementById('nav-tab-status');
            if (statusTab) statusTab.click();
          }}
          className="w-full max-w-xs bg-primary hover:bg-primary-container text-white py-3 rounded-xl font-bold text-xs tracking-wide shadow-md active:scale-98 transition-transform cursor-pointer"
        >
          Pantau Progress Status
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-28 pt-4">
      {/* Form Banner Header */}
      <div className="relative overflow-hidden bg-slate-900 rounded-t-2xl text-white p-5 shadow-sm">
        {/* Transparent dark background image layout spacer */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400/10 to-blue-500/15 pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-base font-extrabold tracking-tight">Pengajuan Layanan Air</h2>
          <p className="text-[11px] text-slate-300 leading-snug mt-1 select-none">
            Lengkapi data formulir di bawah ini dengan valid untuk permohonan sambungan.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-b-2xl border border-t-0 border-slate-100 shadow-[0px_4px_16px_rgba(0,0,0,0.02)] p-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Field 1: Nama Lengkap */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 px-0.5">
              Nama Lengkap (Sesuai KTP)
            </label>
            <input
              id="input-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama sesuai kartu KTP"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:ring-1 focus:ring-primary focus:border-primary disabled:bg-slate-50 disabled:text-slate-400 transition-shadow ${
                errors.name ? 'border-red-400 bg-red-50/20' : 'border-slate-200 bg-white'
              }`}
            />
            {errors.name && (
              <p className="text-[10px] font-medium text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Field 2: NIK */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 px-0.5">
              Nomor Induk Kependudukan (NIK)
            </label>
            <input
              id="input-nik"
              type="text"
              maxLength={16}
              value={nik}
              onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))}
              placeholder="16 Digit NIK terdaftar"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:ring-1 focus:ring-primary focus:border-primary transition-shadow ${
                errors.nik ? 'border-red-400 bg-red-50/20' : 'border-slate-200 bg-white'
              }`}
            />
            {errors.nik && (
              <p className="text-[10px] font-medium text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                {errors.nik}
              </p>
            )}
          </div>

          {/* Field 3: Nomor Handphone */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 px-0.5">
              Nomor Handphone (WhatsApp)
            </label>
            <input
              id="input-phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Contoh: 0812345678"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:ring-1 focus:ring-primary focus:border-primary transition-shadow ${
                errors.phone ? 'border-red-400 bg-red-50/20' : 'border-slate-200 bg-white'
              }`}
            />
            {errors.phone && (
              <p className="text-[10px] font-medium text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                {errors.phone}
              </p>
            )}
          </div>

          {/* Field 4: Jenis Permohonan Dropdown */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 px-0.5">
              Jenis Permohonan Layanan
            </label>
            <select
              id="select-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs focus:ring-1 focus:ring-primary focus:border-primary select-none cursor-pointer transition-shadow"
            >
              <option value="Pasang Baru">Pasang Baru (New Connection)</option>
              <option value="Pasang Meter">Pasang Meter (Flow Meter Check)</option>
              <option value="Perubahan Golongan">Perubahan Golongan Tarif</option>
              <option value="Laporan Kebocoran Meteran">Lapor Kebocoran Meteran Air</option>
            </select>
          </div>

          {/* Field 5: Keterangan Tambahan */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 px-0.5">
              Keterangan Tambahan / Kronologi
            </label>
            <textarea
              id="textarea-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan rincian atau alamat lengkap kebutuhan Anda secara detail..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs focus:ring-1 focus:ring-primary focus:border-primary resize-none transition-shadow"
            />
          </div>

          {/* Uploader Component conforming to guidelines (File Drag/Drop + select) */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 px-0.5">
              Lampiran Pendukung (KTP/SK Tanah)
            </label>
            <div
              id="drag-drop-zone"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              className={`border-2 border-dashed p-4 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                isDragging 
                  ? 'border-primary bg-primary/5 scale-[1.01]' 
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,application/pdf"
              />
              <Upload className="w-6 h-6 text-slate-400 mb-1.5 shrink-0" />
              <p className="text-xs font-semibold text-slate-700">Tarik berkas ke sini atau <span className="text-primary hover:underline">Pilih File</span></p>
              <p className="text-[10px] text-slate-400 mt-1 select-none">Mendukung format JPG, PNG, PDF maks. 5MB</p>
            </div>

            {/* List of attachments */}
            {attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2.5 bg-slate-100 rounded-lg text-xs">
                    <span className="font-mono text-slate-700 font-medium truncate max-w-[200px]">{file.name}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeAttachment(index);
                      }}
                      className="p-1 hover:bg-slate-200 text-red-500 rounded-full cursor-pointer shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action button */}
          <button
            id="btn-submit-form"
            type="submit"
            className="w-full bg-primary hover:bg-primary-container text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer shadow-sm"
          >
            <Send className="w-4 h-4" />
            Kirim Pengajuan
          </button>
        </form>
      </div>

      {/* Info Warning Banner on bottom */}
      <div className="bg-blue-50/70 border border-blue-100 p-4 rounded-xl flex gap-3 text-xs leading-normal">
        <Info className="w-5.5 h-5.5 text-primary shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold text-blue-900 block select-none">PENTING!</span>
          <p className="text-slate-600 mt-0.5 text-[11px]">
            Petugas kami akan menghubungi Anda melalui nomor HP WA yang terdaftar dalam waktu <strong className="font-semibold text-primary">2x24 jam</strong> kerja untuk proses verifikasi susulan dan penjadwalan survey lokasi meteran.
          </p>
        </div>
      </div>
    </div>
  );
}
