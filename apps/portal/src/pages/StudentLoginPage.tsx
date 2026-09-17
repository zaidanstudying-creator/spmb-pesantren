import React, { useState } from 'react';
import { useSPMB } from '@spmb/shared';
import { Button, Badge, Icon } from '@spmb/ui';

interface StudentLoginPageProps {
  onNavigate: (view: 'landing' | 'register' | 'check-status' | 'login' | 'dashboard') => void;
}

export const StudentLoginPage: React.FC<StudentLoginPageProps> = ({ onNavigate }) => {
  const { branding, santris, loginSantri } = useSPMB();

  const [identifier, setIdentifier] = useState('REG-2025-0842');
  const [password, setPassword] = useState('2008-05-14');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'noreg' | 'otp'>('noreg');
  const [otpPhone, setOtpPhone] = useState('081288776655');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const success = loginSantri(identifier, password);
      if (success) {
        onNavigate('dashboard');
      } else {
        setError('Nomor Registrasi atau Tanggal Lahir/Password tidak sesuai.');
      }
    }, 400);
  };

  const handleDemoFill = (noReg: string, birth: string) => {
    setIdentifier(noReg);
    setPassword(birth);
    setError('');
    loginSantri(noReg, birth);
    onNavigate('dashboard');
  };

  const handleSendOtp = () => {
    if (!otpPhone.trim()) return;
    setOtpSent(true);
    setOtpCode('8421');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode === '8421') {
      const found = santris[0];
      if (found) {
        loginSantri(found.noReg);
        onNavigate('dashboard');
      }
    } else {
      setError('Kode OTP tidak valid.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 pt-24 pb-16">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left Column: Islamic Modern Atmosphere & Info */}
        <div className="lg:col-span-5 bg-emerald-950 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Decorative Geometric Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#a6f2d1_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full bg-emerald-600/20 blur-3xl pointer-events-none" />

          {/* Top Brand */}
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
              {branding.logoUrl ? (
                <img
                  src={branding.logoUrl}
                  alt={branding.pesantrenName}
                  className="h-10 w-auto object-contain brightness-125"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-white/10 text-emerald-300 flex items-center justify-center font-serif font-bold text-xl">
                  AH
                </div>
              )}
              <div>
                <span className="font-serif font-bold text-base text-white block leading-tight">
                  {branding.pesantrenName}
                </span>
                <span className="text-[11px] text-emerald-300 uppercase tracking-widest font-semibold">
                  T.A. {branding.academicYear}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-900/80 border border-emerald-700/60 text-xs text-emerald-100 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span>Portal Calon Santri & Wali</span>
              </div>
              <p className="text-[11px] text-emerald-200/80 leading-relaxed">
                Akses kartu peserta CBT, jadwal tes wawancara tahfidz, dan monitoring berkas.
              </p>
            </div>
          </div>

          {/* Photo & Quote Card */}
          <div className="relative z-10 my-6">
            <div className="relative rounded-xl overflow-hidden shadow-lg border border-white/10">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuxH57KXptADIqUbQCtxNCVVLPrb-HJShEWsse9_hJ4gvsOppICDo_vZJGjYq5lGWTKoNVxa0G3KzqEqSSVtLs9Vusn4KjVIBVIOLv3km2YxTjTzlfwjR2c1wjpl0Rg32vcCLeJjglRBzr7CyNBxYYl7RO9z9VrIzJFk4ewJmm1RxT-zFRp-FlD0FAycLvEcEhvJCQEK8EbkjhIgP2xpq069U8NXe5Z3xEx8PRMihpE-YTHw78t6o5"
                alt="Santri"
                className="w-full h-44 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="font-serif text-xs italic text-emerald-100">
                  “Liyatafaqqohu fiddin — Menuntut ilmu dengan keikhlasan hati demi kemaslahatan umat.”
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Security Info */}
          <div className="relative z-10 pt-2 flex items-center justify-between text-[11px] text-emerald-300/80 border-t border-white/10">
            <span className="flex items-center gap-1">
              <Icon name="verified_user" size={14} /> 256-Bit SSL Enforced
            </span>
            <span className="flex items-center gap-1">
              <Icon name="cloud_sync" size={14} /> Real-time Sinkron
            </span>
          </div>
        </div>

        {/* Right Column: Login Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
          <div className="max-w-md mx-auto w-full space-y-6">
            {/* Header info */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 font-bold text-xs mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                Autentikasi Santri & Wali
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Masuk ke Portal Santri
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Gunakan Nomor Registrasi dan Tanggal Lahir calon santri yang tertera di bukti daftar.
              </p>
            </div>

            {/* Login Tab Switcher */}
            <div className="flex rounded-lg bg-slate-100 p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLoginMethod('noreg')}
                className={`flex-1 py-2 rounded-md transition-all ${
                  loginMethod === 'noreg'
                    ? 'bg-white text-emerald-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                No. Registrasi / NISN
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('otp')}
                className={`flex-1 py-2 rounded-md transition-all ${
                  loginMethod === 'otp'
                    ? 'bg-white text-emerald-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                OTP WhatsApp
              </button>
            </div>

            {/* Error message */}
            {error && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <Icon name="error" size={16} className="shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            {/* FORM A: No. Reg & Tanggal Lahir */}
            {loginMethod === 'noreg' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    No. Registrasi atau NISN *
                  </label>
                  <div className="relative">
                    <Icon name="badge" size={18} className="absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="REG-2025-xxxx atau NISN"
                      className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-300 text-sm font-mono focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Tanggal Lahir / Password *
                    </label>
                    <span className="text-[11px] text-slate-400">Format: YYYY-MM-DD</span>
                  </div>
                  <div className="relative">
                    <Icon name="lock" size={18} className="absolute left-3 top-3 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Contoh: 2008-05-14"
                      className="w-full h-11 pl-10 pr-10 rounded-lg border border-slate-300 text-sm font-mono focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      <Icon name={showPassword ? 'visibility_off' : 'visibility'} size={18} />
                    </button>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full shadow-md"
                  iconRight="arrow_forward"
                  type="submit"
                  isLoading={isLoading}
                >
                  Masuk ke Dashboard Santri
                </Button>
              </form>
            )}

            {/* FORM B: OTP WhatsApp */}
            {loginMethod === 'otp' && (
              <div className="space-y-4">
                {!otpSent ? (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Nomor WhatsApp Terdaftar
                      </label>
                      <input
                        type="text"
                        value={otpPhone}
                        onChange={(e) => setOtpPhone(e.target.value)}
                        placeholder="0812-xxxx-xxxx"
                        className="w-full h-11 px-3.5 rounded-lg border border-slate-300 text-sm font-mono focus:outline-none focus:border-emerald-700"
                      />
                    </div>
                    <Button variant="secondary" className="w-full" onClick={handleSendOtp}>
                      Kirim Kode OTP via WhatsApp
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-3">
                    <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-800">
                      Kode OTP simulasi telah dikirim: <strong>8421</strong>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Masukkan 4 Digit Kode OTP
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="8421"
                        className="w-full h-11 px-3.5 rounded-lg border border-slate-300 text-center font-mono text-xl tracking-widest focus:outline-none focus:border-emerald-700"
                      />
                    </div>
                    <Button variant="primary" className="w-full" type="submit">
                      Verifikasi & Masuk
                    </Button>
                  </form>
                )}
              </div>
            )}

            {/* Quick Demo Login Auto-fill Box */}
            <div className="pt-4 border-t border-slate-200/80 space-y-2">
              <span className="text-xs font-semibold text-slate-500 block">
                ⚡ Demo Quick Login Santri (1-Klik Masuk):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoFill('REG-2025-0842', '2008-05-14')}
                  className="p-2.5 rounded-lg bg-slate-50 hover:bg-emerald-50 text-left border border-slate-200 hover:border-emerald-300 transition-colors text-xs"
                >
                  <span className="font-bold text-slate-900 block truncate">Muhammad Fatih</span>
                  <span className="text-[10px] text-emerald-700 font-mono">REG-2025-0842 (Lengkap)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoFill('REG-2025-0844', '2011-11-15')}
                  className="p-2.5 rounded-lg bg-slate-50 hover:bg-rose-50 text-left border border-slate-200 hover:border-rose-300 transition-colors text-xs"
                >
                  <span className="font-bold text-slate-900 block truncate">Rayhan Pratama</span>
                  <span className="text-[10px] text-rose-700 font-mono">REG-2025-0844 (Revisi)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom links */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <button
              onClick={() => onNavigate('register')}
              className="text-emerald-700 font-semibold hover:underline"
            >
              Belum punya akun? Daftar Baru
            </button>
            <button
              onClick={() => onNavigate('landing')}
              className="hover:text-slate-800"
            >
              &larr; Ke Beranda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
