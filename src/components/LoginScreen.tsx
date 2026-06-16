import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onLoginDemoEmpty: () => void;
}

export default function LoginScreen({ onLoginSuccess, onLoginDemoEmpty }: LoginScreenProps) {
  const [username, setUsername] = useState('0012983445');
  const [password, setPassword] = useState('tirtanadi123');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors('');

    if (!username.trim() || !password.trim()) {
      setErrors('Nomor pelanggan / email dan kata sandi wajib diisi.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (username.trim() === '1234' && password.trim() === '1234') {
        onLoginDemoEmpty();
      } else {
        onLoginSuccess();
      }
    }, 1000);
  };

  return (
    <div className="h-full w-full bg-slate-50 flex flex-col justify-between p-6 select-none overflow-hidden">
      
      {/* 1. Header Splash Watermark */}
      <div className="flex flex-col items-center text-center mt-4 space-y-2">
        <div className="w-20 h-20 bg-white shadow-md border border-slate-100 rounded-full flex items-center justify-center p-1.5 overflow-hidden">
          <img src="/assets/tirta.png" alt="PDAM Tirtanadi Logo" className="w-full h-full object-contain rounded-full" />
        </div>
        <div className="space-y-0.5">
          <h1 className="font-display font-extrabold text-xl text-primary tracking-tight">PDAM Tirtanadi</h1>
          <p className="text-[9px] uppercase font-bold tracking-widest text-slate-400 max-w-[280px]">
            Layanan Air Minum Kebanggaan Sumatera Utara
          </p>
        </div>
      </div>

      {/* 2. Welcome Login Form Box */}
      <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-100 shadow-[0px_8px_32px_rgba(0,62,127,0.04)] p-5 my-2">
        <div className="text-left mb-4">
          <h2 className="text-sm font-extrabold text-slate-800 tracking-tight">Selamat Datang Kembali</h2>
          <p className="text-[11px] text-slate-400 leading-normal mt-0.5">
            Silakan masuk untuk mengelola tagihan dan layanan air bersih Anda secara digital.
          </p>
        </div>

        {errors && (
          <div className="p-2.5 bg-red-50 border border-red-100 rounded-xl flex gap-1.5 text-[10px] text-red-600 mb-3 items-start">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>{errors}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-xs">
          {/* Email / Customer ID */}
          <div>
            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 px-0.5">
              Nomor Pelanggan atau Email
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="input-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Contoh: 12345678"
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-150 focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary rounded-xl font-medium"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 px-0.5">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="input-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi Anda"
                className="w-full pl-9 pr-10 py-2 bg-slate-50 border border-slate-150 focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary rounded-xl font-medium tracking-wide"
              />
              <button
                type="button"
                id="btn-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer p-1"
                aria-label="Toggle Password Visibility"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Forgotten Password link */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => alert('Simulator: Tautan pemulihan sandi dikirim ke email terdaftar Anda (ahmad.ridwan@email.com).')}
              className="text-[9px] font-bold text-primary hover:underline cursor-pointer"
            >
              Lupa Kata Sandi?
            </button>
          </div>

          {/* Submit */}
          <button
            id="btn-submit-login"
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-container text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 tracking-wide transition-all active:scale-[0.98] cursor-pointer disabled:bg-slate-300 text-xs"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Masuk ke Aplikasi...
              </>
            ) : (
              'Masuk'
            )}
          </button>
        </form>
      </div>

      {/* 3. Signup Footer & Version metadata */}
      <div className="text-center space-y-2 mb-4">
        <p className="text-[11px] text-slate-500 font-medium">
          Belum punya akun?{' '}
          <button
            onClick={() => alert('Simulator: Mengarahkan Anda ke form pendaftaran ID Pelanggan baru')}
            className="font-bold text-primary hover:underline cursor-pointer"
          >
            Daftar Sekarang
          </button>
        </p>
        <p className="text-[9px] text-slate-400 font-semibold select-none">
          v2.4.0 • PDAM Tirtanadi Digital
        </p>
      </div>

    </div>
  );
}
