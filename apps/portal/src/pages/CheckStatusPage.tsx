import React, { useState } from 'react';
import {
  useSPMB,
  SantriData,
  getPublicKelulusanStatus,
  getStatusBerkasLabel,
  formatDateIndo
} from '@spmb/shared';
import { Button, Badge, Icon, Card } from '@spmb/ui';

interface CheckStatusPageProps {
  onNavigate: (view: 'landing' | 'register' | 'check-status' | 'login' | 'dashboard') => void;
}

export const CheckStatusPage: React.FC<CheckStatusPageProps> = ({ onNavigate }) => {
  const { branding, santris, embargoState, setCurrentSantri } = useSPMB();

  const [identifier, setIdentifier] = useState('REG-2025-0842');
  const [birthDate, setBirthDate] = useState('2008-05-14');
  const [searchedSantri, setSearchedSantri] = useState<SantriData | null>(santris[0] || null);
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = identifier.trim().toLowerCase();
    const found = santris.find(
      (s) =>
        s.noReg.toLowerCase() === cleanId ||
        s.nisn.toLowerCase() === cleanId ||
        s.nik.toLowerCase() === cleanId
    );

    setSearchedSantri(found || null);
    setHasSearched(true);
  };

  const handleQuickSelect = (snt: SantriData) => {
    setIdentifier(snt.noReg);
    setBirthDate(snt.birthDate);
    setSearchedSantri(snt);
    setHasSearched(true);
  };

  const kelulusanInfo = searchedSantri
    ? getPublicKelulusanStatus(searchedSantri.statusKelulusan, embargoState.isEmbargoActive)
    : null;

  const berkasStatus = searchedSantri
    ? getStatusBerkasLabel(searchedSantri.statusBerkas)
    : null;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-wider text-emerald-800 font-bold bg-emerald-100 px-3 py-1 rounded-full">
            Layanan Mandiri
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
            Cek Status Pendaftaran & Kelulusan SPMB
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Masukkan Nomor Registrasi (Noreg) atau NISN calon santri yang telah terdaftar.
          </p>
        </div>

        {/* Search Card Form */}
        <Card className="p-6 sm:p-8 mb-8 shadow-md">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-7 space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  No. Registrasi / NISN Santri *
                </label>
                <div className="relative">
                  <Icon
                    name="search"
                    size={20}
                    className="absolute left-3.5 top-3 text-slate-400"
                  />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Contoh: REG-2025-0842 atau 0087192841"
                    className="w-full h-11 pl-10 pr-4 rounded-lg border border-slate-300 text-sm font-mono focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div className="sm:col-span-5 space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Tanggal Lahir (Validasi)
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              {/* Quick test badges */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span>Contoh Data Demo:</span>
                {santris.slice(0, 3).map((snt) => (
                  <button
                    key={snt.id}
                    type="button"
                    onClick={() => handleQuickSelect(snt)}
                    className="px-2 py-0.5 rounded bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 font-mono text-[11px] border border-slate-200 transition-colors"
                  >
                    {snt.noReg}
                  </button>
                ))}
              </div>

              <Button variant="primary" iconLeft="search" type="submit">
                Periksa Status Sekarang
              </Button>
            </div>
          </form>
        </Card>

        {/* Embargo Alert Notice Banner if Embargo is active */}
        {embargoState.isEmbargoActive && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200/90 text-xs sm:text-sm text-amber-900 flex items-start gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
              <Icon name="lock_clock" size={20} />
            </div>
            <div>
              <span className="font-bold block">Status Embargo Kelulusan Aktif</span>
              <p className="mt-0.5 text-amber-800 leading-relaxed">
                Pengumuman hasil akhir kelulusan seleksi sedang dalam masa verifikasi internal panitia dan akan diumumkan serentak. Anda tetap dapat memantau status kelengkapan berkas dan jadwal tes CBT di bawah ini.
              </p>
            </div>
          </div>
        )}

        {/* Search Result Display */}
        {hasSearched && searchedSantri && (
          <div className="space-y-6">
            {/* Status Hero Card */}
            <div
              className={`p-6 sm:p-8 rounded-2xl border shadow-lg relative overflow-hidden ${
                !embargoState.isEmbargoActive && kelulusanInfo?.isPassed
                  ? 'bg-emerald-900 text-white border-emerald-800'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-6 border-slate-200/40">
                <div className="flex items-center gap-4">
                  <img
                    src={searchedSantri.photoUrl}
                    alt={searchedSantri.fullName}
                    className="w-16 h-16 rounded-xl object-cover border-2 border-emerald-600 shadow"
                  />
                  <div>
                    <span className="text-xs font-mono font-bold tracking-wider opacity-80 block">
                      {searchedSantri.noReg} &bull; NISN: {searchedSantri.nisn}
                    </span>
                    <h2 className="font-serif text-2xl font-bold uppercase mt-0.5">
                      {searchedSantri.fullName}
                    </h2>
                    <p className="text-xs opacity-75">
                      Jenjang: {searchedSantri.level} {searchedSantri.jurusan ? `(${searchedSantri.jurusan})` : ''} &bull; Asal: {searchedSantri.prevSchool}
                    </p>
                  </div>
                </div>

                <div className="self-start sm:self-auto">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase ${
                      berkasStatus?.badgeClass || 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    <Icon name={berkasStatus?.icon || 'info'} size={16} />
                    {berkasStatus?.label}
                  </span>
                </div>
              </div>

              {/* Status Outcome Message */}
              <div className="pt-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      kelulusanInfo?.statusBadge
                    }`}
                  >
                    {kelulusanInfo?.statusTitle}
                  </span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed opacity-90 max-w-2xl">
                  {kelulusanInfo?.statusDesc}
                </p>

                {searchedSantri.catatanPanitia && (
                  <div className="p-3 rounded-lg bg-black/10 border border-black/10 text-xs mt-3">
                    <strong>Catatan Panitia:</strong> {searchedSantri.catatanPanitia}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-200/40 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs opacity-75">
                  Tanda Daftar Sah SPMB &bull; {branding.pesantrenName}
                </span>

                <div className="flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    iconLeft="dashboard"
                    onClick={() => {
                      setCurrentSantri(searchedSantri);
                      onNavigate('dashboard');
                    }}
                  >
                    Buka Dashboard Santri
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="p-4 space-y-1">
                <span className="text-xs text-slate-500 font-medium">Status Pembayaran</span>
                <span className="font-bold text-sm text-emerald-800 block">
                  {searchedSantri.statusPembayaran === 'LUNAS'
                    ? 'Lunas (BSI Terverifikasi)'
                    : 'Menunggu Pembayaran'}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  VA: {searchedSantri.virtualAccount}
                </span>
              </Card>

              <Card className="p-4 space-y-1">
                <span className="text-xs text-slate-500 font-medium">Jadwal Ujian Seleksi CBT</span>
                <span className="font-bold text-sm text-slate-800 block">
                  {searchedSantri.examCard?.jadwalUjian
                    ? formatDateIndo(searchedSantri.examCard.jadwalUjian)
                    : 'Menunggu Jadwal'}
                </span>
                <span className="text-[11px] text-slate-400">
                  {searchedSantri.examCard?.ruangCbt || 'Lab CBT 2'}
                </span>
              </Card>

              <Card className="p-4 space-y-1">
                <span className="text-xs text-slate-500 font-medium">Dokumen Persyaratan</span>
                <span className="font-bold text-sm text-slate-800 block">
                  {Object.keys(searchedSantri.documents).length} Dokumen Diunggah
                </span>
                <span className="text-[11px] text-emerald-700">
                  {searchedSantri.statusBerkas === 'TERVERIFIKASI'
                    ? 'Kartu CBT Siap Dicetak'
                    : 'Dalam Pemeriksaan'}
                </span>
              </Card>
            </div>
          </div>
        )}

        {hasSearched && !searchedSantri && (
          <Card className="text-center py-12 space-y-3">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Icon name="search_off" size={26} />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-800">
              Data Pendaftaran Tidak Ditemukan
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Pastikan Nomor Registrasi atau NISN yang Anda masukkan sudah benar. Jika baru saja mendaftar, periksa kembali nomor tanda bukti pendaftaran Anda.
            </p>
            <div className="pt-2">
              <Button variant="secondary" size="sm" onClick={() => onNavigate('register')}>
                Daftar Santri Baru Sekarang
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
