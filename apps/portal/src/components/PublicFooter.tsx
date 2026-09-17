import React from 'react';
import { useSPMB } from '@spmb/shared';
import { Icon } from '@spmb/ui';

export const PublicFooter: React.FC = () => {
  const { branding } = useSPMB();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Identity & Description */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              {branding.logoUrl ? (
                <img
                  src={branding.logoUrl}
                  alt={branding.pesantrenName}
                  className="h-10 w-auto object-contain brightness-125"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-serif font-bold text-xl">
                  AH
                </div>
              )}
              <div>
                <h4 className="font-serif font-bold text-lg text-white leading-tight">
                  {branding.pesantrenName}
                </h4>
                <p className="text-xs text-emerald-400 font-medium">{branding.yayasanName}</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              {branding.description}
            </p>
            <div className="pt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-xs font-semibold">
                <Icon name="verified" size={14} />
                {branding.accreditation}
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-white font-semibold text-sm uppercase tracking-wider">
              Layanan SPMB
            </h5>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#alur-dan-syarat" className="hover:text-emerald-400 transition-colors">
                  Informasi Gelombang & Biaya
                </a>
              </li>
              <li>
                <a href="#alur-dan-syarat" className="hover:text-emerald-400 transition-colors">
                  Syarat & Alur Pendaftaran
                </a>
              </li>
              <li>
                <a href="#faq-dan-bantuan" className="hover:text-emerald-400 transition-colors">
                  Panduan Pembayaran Virtual Account
                </a>
              </li>
              <li>
                <a href="#faq-dan-bantuan" className="hover:text-emerald-400 transition-colors">
                  Jadwal Ujian Masuk CBT
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Legal */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="text-white font-semibold text-sm uppercase tracking-wider">
              Sekretariat SPMB
            </h5>
            <div className="space-y-2.5 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <Icon name="location_on" size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>{branding.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Icon name="phone" size={18} className="text-emerald-400 shrink-0" />
                <span>{branding.phone} / WA: {branding.whatsapp}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Icon name="mail" size={18} className="text-emerald-400 shrink-0" />
                <span>{branding.email}</span>
              </div>
              <div className="flex items-center gap-2.5 pt-1 text-xs text-slate-500">
                <Icon name="gavel" size={16} className="shrink-0" />
                <span>{branding.legalPermitNumber}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} {branding.pesantrenName}. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-medium">e-PPDB Pesantren Core v2.5</span>
            <span>&bull;</span>
            <span>Sistem Seleksi Terpadu & Terenkripsi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
