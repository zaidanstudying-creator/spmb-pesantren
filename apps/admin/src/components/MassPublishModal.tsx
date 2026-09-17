import React, { useState } from 'react';
import { useSPMB } from '@spmb/shared';
import { Modal, Button, Badge, Icon } from '@spmb/ui';

interface MassPublishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MassPublishModal: React.FC<MassPublishModalProps> = ({ isOpen, onClose }) => {
  const { embargoState, setEmbargoActive, massPublishRelease, metrics, currentAdmin } = useSPMB();
  const [pinCode, setPinCode] = useState('');
  const [broadcastWa, setBroadcastWa] = useState(true);
  const [releaseNote, setReleaseNote] = useState('Pengumuman Kelulusan SPMB Gelombang 1 Resmi Diumumkan');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinCode !== '1234' && pinCode !== '8421') {
      setError('PIN otorisasi panitia salah. (Gunakan PIN demo: 1234 atau 8421)');
      return;
    }

    massPublishRelease(currentAdmin?.name || 'Ust. H. Abdullah M.', releaseNote);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  const handleLockEmbargo = () => {
    setEmbargoActive(true);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="lg"
      title="Pengesahan Rilis Masal Kelulusan Santri"
      subtitle="Sistem Kontrol Embargo Pengumuman Yudisium"
    >
      <div className="space-y-6">
        {/* Status indicator */}
        <div
          className={`p-4 rounded-xl border flex items-start gap-3 ${
            embargoState.isEmbargoActive
              ? 'bg-amber-50 border-amber-300 text-amber-900'
              : 'bg-emerald-50 border-emerald-300 text-emerald-900'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              embargoState.isEmbargoActive
                ? 'bg-amber-200 text-amber-900'
                : 'bg-emerald-200 text-emerald-900'
            }`}
          >
            <Icon name={embargoState.isEmbargoActive ? 'lock_clock' : 'public'} size={22} />
          </div>
          <div className="space-y-1 text-xs">
            <span className="font-bold text-sm block">
              {embargoState.isEmbargoActive
                ? 'Mode Embargo Saat Ini: AKTIF (Terkunci)'
                : 'Status: SUDAH DIPUBLIKASIKAN KE PUBLIK'}
            </span>
            <p className="leading-relaxed">
              {embargoState.isEmbargoActive
                ? 'Seluruh hasil kelulusan santri disembunyikan dari modul Cek Kelulusan Mandiri hingga panitia melakukan rilis serentak.'
                : `Terakhir dirilis pada: ${embargoState.lastReleaseDate ? new Date(embargoState.lastReleaseDate).toLocaleString('id-ID') : 'Hari ini'}`}
            </p>
          </div>
        </div>

        {isSuccess ? (
          <div className="p-6 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-300 animate-fadeIn">
            <div className="w-12 h-12 bg-emerald-700 text-white rounded-full flex items-center justify-center mx-auto shadow">
              <Icon name="check" size={28} />
            </div>
            <h4 className="font-serif text-lg font-bold text-emerald-950">
              Pengumuman Berhasil Diterbitkan!
            </h4>
            <p className="text-xs text-emerald-800">
              Status kelulusan calon santri kini dapat diakses secara transparan oleh wali santri di portal publik.
            </p>
          </div>
        ) : (
          <form onSubmit={handlePublish} className="space-y-4 text-xs">
            {/* Summary Metrics */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-slate-500 block">Draf Lolos Yudisium:</span>
                <span className="font-bold text-base text-emerald-800">
                  {metrics.draftPassed} Calon Santri
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Total Pendaftar:</span>
                <span className="font-bold text-base text-slate-800">
                  {metrics.totalApplicants} Santri
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 uppercase">
                Catatan Rilis Pengumuman
              </label>
              <input
                type="text"
                value={releaseNote}
                onChange={(e) => setReleaseNote(e.target.value)}
                className="w-full h-9 px-3 rounded border border-slate-300 text-xs"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block">Kirim Broadcast Notifikasi WA</span>
                <span className="text-slate-500 text-[11px]">Kirim pesan pengumuman ke nomor wali santri</span>
              </div>
              <input
                type="checkbox"
                checked={broadcastWa}
                onChange={(e) => setBroadcastWa(e.target.checked)}
                className="w-4 h-4 accent-emerald-700 rounded"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="font-bold text-slate-700 uppercase">
                  PIN Otorisasi Panitia SPMB *
                </label>
                <span className="text-[11px] text-slate-400 font-mono">Demo PIN: 1234</span>
              </div>
              <input
                type="password"
                required
                maxLength={6}
                value={pinCode}
                onChange={(e) => {
                  setPinCode(e.target.value);
                  setError('');
                }}
                placeholder="Masukkan PIN keamanan 1234"
                className="w-full h-10 px-3 rounded border border-slate-300 font-mono text-center text-lg tracking-widest focus:outline-none focus:border-emerald-700"
              />
              {error && <p className="text-rose-600 text-[11px] font-semibold">{error}</p>}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              {embargoState.isEmbargoActive ? (
                <Button variant="ghost" size="sm" onClick={onClose}>
                  Batal
                </Button>
              ) : (
                <Button variant="outline" size="sm" onClick={handleLockEmbargo}>
                  Kunci Kembali ke Embargo
                </Button>
              )}

              <Button
                variant="amber"
                size="md"
                iconLeft="campaign"
                type="submit"
                className="shadow-md"
              >
                Sahkan & Rilis Kelulusan Serentak
              </Button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};
