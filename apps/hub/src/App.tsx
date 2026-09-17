import React, { useState } from 'react';
import { SPMBProvider, useSPMB } from '@spmb/shared';
import { AppContent as PortalContent } from '../../portal/src/App';
import { AdminAppContent } from '../../admin/src/App';
import { Icon } from '@spmb/ui';

type ActiveApp = 'portal' | 'admin';

const HubShell: React.FC = () => {
  const [activeApp, setActiveApp] = useState<ActiveApp>('portal');
  const [isBarCollapsed, setIsBarCollapsed] = useState(false);
  const { branding, metrics, resetAllToFactoryDefaults } = useSPMB();

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* Monorepo Quick App Switcher Top Banner */}
      {!isBarCollapsed ? (
        <div className="bg-slate-900 text-white px-4 py-2 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 text-xs z-50 sticky top-0 shadow-md">
          <div className="flex items-center gap-3">
            <span className="font-mono text-emerald-400 font-bold flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              SPMB MONOREPO
            </span>
            <span className="hidden sm:inline text-slate-400">
              Workspace Switcher:
            </span>

            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
              <button
                onClick={() => setActiveApp('portal')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all font-semibold ${
                  activeApp === 'portal'
                    ? 'bg-emerald-700 text-white shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Icon name="public" size={15} />
                <span>apps/portal (Publik & Santri)</span>
              </button>

              <button
                onClick={() => setActiveApp('admin')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all font-semibold ${
                  activeApp === 'admin'
                    ? 'bg-emerald-700 text-white shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Icon name="admin_panel_settings" size={15} />
                <span>apps/admin (Panitia Core)</span>
                {metrics.pendingDocs > 0 && (
                  <span className="bg-amber-500 text-amber-950 font-bold px-1.5 py-0.2 rounded-full text-[10px]">
                    {metrics.pendingDocs}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (confirm('Kembalikan semua database lokal ke pengaturan awal?')) {
                  resetAllToFactoryDefaults();
                  window.location.reload();
                }
              }}
              title="Reset Database Mock ke Standar"
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[11px] flex items-center gap-1 transition-colors"
            >
              <Icon name="restart_alt" size={14} />
              <span>Reset State</span>
            </button>

            <button
              onClick={() => setIsBarCollapsed(true)}
              title="Sembunyikan Bar Switcher"
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <Icon name="expand_less" size={16} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsBarCollapsed(false)}
          className="fixed top-2 right-2 z-50 bg-slate-900 text-emerald-400 text-xs px-3 py-1.5 rounded-full shadow-lg border border-slate-700 flex items-center gap-1.5 hover:bg-slate-800"
        >
          <Icon name="swap_horiz" size={16} />
          <span>Switch App ({activeApp === 'portal' ? 'Portal' : 'Admin'})</span>
        </button>
      )}

      {/* Render Active App */}
      <div className="flex-1">
        {activeApp === 'portal' && <PortalContent />}
        {activeApp === 'admin' && <AdminAppContent />}
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <SPMBProvider>
      <HubShell />
    </SPMBProvider>
  );
};

export default App;
