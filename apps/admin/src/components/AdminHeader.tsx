import React from 'react';
import { useSPMB, getRoleLabel } from '@spmb/shared';
import { Icon } from '@spmb/ui';

interface AdminHeaderProps {
  onSearchQuery?: (q: string) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onSearchQuery }) => {
  const { branding, currentAdmin, metrics } = useSPMB();

  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_1px_8px_rgba(0,0,0,0.03)] z-40 flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Icon
            name="search"
            size={18}
            className="absolute left-3 top-2.5 text-slate-400"
          />
          <input
            type="text"
            placeholder="Cari No. Registrasi, NISN, atau Nama Santri..."
            onChange={(e) => onSearchQuery?.(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-700 w-80 font-medium"
          />
        </div>

        <span className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold font-mono">
          Periode TA {branding.academicYear}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-slate-600">
          <button
            aria-label="Notifikasi"
            className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors relative"
          >
            <Icon name="notifications" size={20} />
            {metrics.pendingDocs > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full"></span>
            )}
          </button>
        </div>

        <div className="h-6 w-px bg-slate-200" />

        <div className="flex items-center gap-3">
          <img
            src={currentAdmin?.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces'}
            alt="Admin"
            className="w-8 h-8 rounded-full object-cover border border-emerald-600 shadow-sm"
          />
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-slate-900 leading-tight">
              {currentAdmin?.name || 'Ust. H. Abdullah M.'}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              {getRoleLabel(currentAdmin?.role).label}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
