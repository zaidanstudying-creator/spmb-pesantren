import React, { useState } from 'react';
import { useSPMB } from '@spmb/shared';
import { Button, Icon } from '@spmb/ui';

interface PublicNavbarProps {
  currentView: string;
  onNavigate: (view: 'landing' | 'register' | 'check-status' | 'login' | 'dashboard') => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({ currentView, onNavigate }) => {
  const { branding, currentSantri, logoutSantri } = useSPMB();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/70 shadow-[0_1px_8px_rgba(0,0,0,0.03)] transition-all">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          {branding.logoUrl ? (
            <img
              src={branding.logoUrl}
              alt={branding.pesantrenName}
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-serif font-bold text-xl">
              AH
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg text-emerald-900 leading-tight tracking-tight">
              {branding.pesantrenName}
            </span>
            <span className="text-[11px] font-semibold text-emerald-700 tracking-wider uppercase">
              Portal SPMB &bull; {branding.academicYear}
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => onNavigate('landing')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentView === 'landing'
                ? 'bg-emerald-50 text-emerald-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Beranda
          </button>
          <a
            href="#alur-dan-syarat"
            onClick={(e) => {
              if (currentView !== 'landing') {
                e.preventDefault();
                onNavigate('landing');
                setTimeout(() => {
                  document.getElementById('alur-dan-syarat')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            Alur & Syarat
          </a>
          <button
            onClick={() => onNavigate('check-status')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentView === 'check-status'
                ? 'bg-emerald-50 text-emerald-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Cek Kelulusan
          </button>
          <a
            href="#faq-dan-bantuan"
            onClick={(e) => {
              if (currentView !== 'landing') {
                e.preventDefault();
                onNavigate('landing');
                setTimeout(() => {
                  document.getElementById('faq-dan-bantuan')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            Pusat Bantuan
          </a>
        </nav>

        {/* Action Buttons / User Profile */}
        <div className="hidden sm:flex items-center gap-3">
          {currentSantri ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('dashboard')}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg border transition-all ${
                  currentView === 'dashboard'
                    ? 'border-emerald-600 bg-emerald-50/80 text-emerald-900 font-semibold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <img
                  src={currentSantri.photoUrl}
                  alt={currentSantri.fullName}
                  className="w-7 h-7 rounded-full object-cover border border-emerald-500"
                />
                <div className="text-left hidden lg:block">
                  <span className="text-xs font-bold block leading-none truncate max-w-[130px]">
                    {currentSantri.fullName}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono block leading-tight mt-0.5">
                    {currentSantri.noReg}
                  </span>
                </div>
              </button>
              <button
                onClick={() => {
                  logoutSantri();
                  onNavigate('landing');
                }}
                title="Keluar Akun Santri"
                className="w-9 h-9 rounded-lg border border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 flex items-center justify-center transition-colors"
              >
                <Icon name="logout" size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Button
                variant="secondary"
                size="sm"
                iconLeft="login"
                onClick={() => onNavigate('login')}
              >
                Masuk Santri
              </Button>
              <Button
                variant="primary"
                size="sm"
                iconLeft="how_to_reg"
                onClick={() => onNavigate('register')}
              >
                Daftar Sekarang
              </Button>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          {currentSantri && (
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-9 h-9 rounded-full overflow-hidden border-2 border-emerald-600"
            >
              <img
                src={currentSantri.photoUrl}
                alt={currentSantri.fullName}
                className="w-full h-full object-cover"
              />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-100"
          >
            <Icon name={mobileMenuOpen ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <button
            onClick={() => {
              onNavigate('landing');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-100"
          >
            Beranda
          </button>
          <button
            onClick={() => {
              onNavigate('check-status');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-100"
          >
            Cek Kelulusan Mandiri
          </button>
          <button
            onClick={() => {
              onNavigate('register');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-emerald-800 font-semibold hover:bg-emerald-50"
          >
            Form Pendaftaran Baru
          </button>
          {currentSantri ? (
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  onNavigate('dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-emerald-800 bg-emerald-50"
              >
                Buka Dashboard Santri ({currentSantri.fullName})
              </button>
              <button
                onClick={() => {
                  logoutSantri();
                  setMobileMenuOpen(false);
                  onNavigate('landing');
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-rose-600 hover:bg-rose-50"
              >
                Keluar Akun
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  onNavigate('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2.5 rounded-lg text-sm font-medium text-emerald-800 border border-emerald-600"
              >
                Masuk Santri / Wali
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
