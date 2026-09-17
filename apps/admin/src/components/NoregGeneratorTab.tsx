import React, { useState } from 'react';
import { useSPMB, NoregFormatConfig, generateNoreg } from '@spmb/shared';
import { Button, Badge, Icon, Card } from '@spmb/ui';

export const NoregGeneratorTab: React.FC = () => {
  const { noregConfig, updateNoregConfig } = useSPMB();
  const [config, setConfig] = useState<NoregFormatConfig>({ ...noregConfig });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const preview = generateNoreg(config, 'MA', 842);
  const previewMts = generateNoreg(config, 'MTS', 1);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateNoregConfig(config);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Generator Format Nomor Registrasi Bebas
            </h2>
            <Badge variant="emerald" size="sm">Format Fleksibel</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Sesuaikan pola pembuatan Nomor Registrasi calon santri (Prefix, Kode Tahun, Kode Jenjang, Pemisah, dan Jumlah Digit).
          </p>
        </div>

        <Button variant="primary" size="sm" iconLeft="save" onClick={handleSave}>
          Simpan Format No. Registrasi
        </Button>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 flex items-center gap-2">
          <Icon name="check_circle" size={18} className="text-emerald-700 shrink-0" />
          <span>Format Nomor Registrasi berhasil diperbarui untuk calon santri baru!</span>
        </div>
      )}

      {/* Grid 2 Kolom: Kiri Editor Pola, Kanan Live Pratinjau */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Kolom Kiri: Pola Config */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Komponen Format Noreg
          </h3>

          <div className="space-y-4 text-xs">
            {/* 1. Prefix */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 uppercase">Prefix / Awalan Huruf</label>
              <input
                type="text"
                value={config.prefix}
                onChange={(e) => setConfig({ ...config, prefix: e.target.value })}
                placeholder="Contoh: REG, SPMB, PPDB, ALHIKMAH"
                className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm font-mono focus:outline-none focus:border-emerald-700 uppercase"
              />
            </div>

            {/* 2. Pemisah / Separator */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 uppercase">Karakter Pemisah (Separator)</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { sep: '-', label: 'Dash (-)' },
                  { sep: '/', label: 'Slash (/)' },
                  { sep: '.', label: 'Titik (.)' },
                  { sep: '', label: 'Tanpa Pemisah' }
                ].map((item) => (
                  <button
                    key={item.sep}
                    type="button"
                    onClick={() => setConfig({ ...config, separator: item.sep as any })}
                    className={`py-2 rounded-lg border text-xs font-mono font-bold transition-all ${
                      config.separator === item.sep
                        ? 'bg-emerald-50 border-emerald-700 text-emerald-900'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Format Tahun */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 uppercase">Sertakan Tahun Pendaftaran</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { y: 'YYYY', label: '4 Digit (2025)' },
                  { y: 'YY', label: '2 Digit (25)' },
                  { y: 'NONE', label: 'Tanpa Tahun' }
                ].map((item) => (
                  <button
                    key={item.y}
                    type="button"
                    onClick={() => setConfig({ ...config, yearFormat: item.y as any })}
                    className={`py-2 rounded-lg border text-xs font-bold transition-all ${
                      config.yearFormat === item.y
                        ? 'bg-emerald-50 border-emerald-700 text-emerald-900'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Sertakan Kode Jenjang */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block">Sertakan Kode Jenjang (MTS / MA)</span>
                <span className="text-slate-500 text-[11px]">Memisahkan penomoran berdasarkan tingkat madrasah</span>
              </div>
              <input
                type="checkbox"
                checked={config.includeJenjang}
                onChange={(e) => setConfig({ ...config, includeJenjang: e.target.checked })}
                className="w-5 h-5 accent-emerald-700 rounded cursor-pointer"
              />
            </div>

            {/* 5. Digit Length */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 uppercase">
                Panjang Digit Nomor Urut ({config.digitLength} Digit)
              </label>
              <input
                type="range"
                min={3}
                max={6}
                value={config.digitLength}
                onChange={(e) => setConfig({ ...config, digitLength: Number(e.target.value) })}
                className="w-full accent-emerald-700"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>3 Digit (001)</span>
                <span>4 Digit (0001)</span>
                <span>5 Digit (00001)</span>
                <span>6 Digit (000001)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Pratinjau Interaktif */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-emerald-950 text-white rounded-2xl p-6 shadow-xl border border-emerald-900 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 block">
              Pratinjau Hasil Generator Noreg
            </span>

            <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-2">
              <span className="text-[11px] text-emerald-200 block">Contoh Santri MA:</span>
              <span className="font-mono text-xl sm:text-2xl font-bold text-amber-300 block tracking-wider">
                {preview}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-2">
              <span className="text-[11px] text-emerald-200 block">Contoh Santri MTs (Pendaftar Pertama):</span>
              <span className="font-mono text-xl sm:text-2xl font-bold text-emerald-100 block tracking-wider">
                {previewMts}
              </span>
            </div>

            <p className="text-[11px] text-emerald-200/70 leading-relaxed">
              Nomor registrasi ini akan dicetak otomatis pada Kartu Tanda Peserta CBT, Virtual Account BSI, dan seluruh bukti administrasi resmi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
