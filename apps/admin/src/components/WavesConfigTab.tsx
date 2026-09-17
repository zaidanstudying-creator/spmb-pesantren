import React, { useState } from 'react';
import { useSPMB, WaveConfig, formatCurrency } from '@spmb/shared';
import { Button, Badge, Icon, Card } from '@spmb/ui';

export const WavesConfigTab: React.FC = () => {
  const { waves, updateWave, toggleWaveActive } = useSPMB();
  const [editingWaveId, setEditingWaveId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<WaveConfig>>({});
  const [saveToast, setSaveToast] = useState(false);

  const startEdit = (w: WaveConfig) => {
    setEditingWaveId(w.id);
    setEditForm({ ...w });
  };

  const handleSaveEdit = (waveId: string) => {
    updateWave(waveId, editForm);
    setEditingWaveId(null);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Setting Gelombang Pendaftaran & Kuota
            </h2>
            <Badge variant="emerald" size="sm">3 Gelombang Tersedia</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Atur periode pembukaan pendaftaran online, kuota daya tampung asrama santri putra/putri, biaya seleksi, dan tanggal ujian CBT.
          </p>
        </div>
      </div>

      {saveToast && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 flex items-center gap-2">
          <Icon name="check_circle" size={18} className="text-emerald-700 shrink-0" />
          <span>Pengaturan Gelombang berhasil disimpan dan aktif di portal pendaftaran!</span>
        </div>
      )}

      {/* Wave List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {waves.map((w) => {
          const isEditing = editingWaveId === w.id;

          return (
            <div
              key={w.id}
              className={`rounded-2xl border p-6 bg-white shadow-sm flex flex-col justify-between transition-all ${
                w.isOpen
                  ? 'border-emerald-700 ring-2 ring-emerald-700/20 shadow-md'
                  : 'border-slate-200'
              }`}
            >
              <div className="space-y-4">
                {/* Header status */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider font-mono">
                    Gelombang 0{w.waveNumber}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleWaveActive(w.id)}
                      className={`px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${
                        w.isOpen
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {w.isOpen ? 'Sedang Buka (Klik Tutup)' : 'Tutup (Klik Buka)'}
                    </button>
                  </div>
                </div>

                {!isEditing ? (
                  <div className="space-y-3">
                    <h3 className="font-serif text-lg font-bold text-slate-900">{w.name}</h3>
                    <p className="text-xs text-slate-500 min-h-[32px]">{w.tagline}</p>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Biaya Formulir:</span>
                        <span className="font-bold text-emerald-900">
                          {formatCurrency(w.registrationFee)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Kuota Putra / Putri:</span>
                        <span className="font-semibold text-slate-800">
                          {w.quotaPutra} Santri / {w.quotaPutri} Santriwati
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Batas Daftar:</span>
                        <span className="font-semibold text-slate-800">{w.endDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Ujian CBT:</span>
                        <span className="font-semibold text-emerald-800">{w.testDate}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Nama Gelombang</label>
                      <input
                        type="text"
                        value={editForm.name || ''}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full h-8 px-2 rounded border border-slate-300 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Biaya Pendaftaran (IDR)</label>
                      <input
                        type="number"
                        value={editForm.registrationFee || 0}
                        onChange={(e) =>
                          setEditForm({ ...editForm, registrationFee: Number(e.target.value) })
                        }
                        className="w-full h-8 px-2 rounded border border-slate-300 text-xs font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Kuota Putra</label>
                        <input
                          type="number"
                          value={editForm.quotaPutra || 0}
                          onChange={(e) =>
                            setEditForm({ ...editForm, quotaPutra: Number(e.target.value) })
                          }
                          className="w-full h-8 px-2 rounded border border-slate-300 text-xs font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Kuota Putri</label>
                        <input
                          type="number"
                          value={editForm.quotaPutri || 0}
                          onChange={(e) =>
                            setEditForm({ ...editForm, quotaPutri: Number(e.target.value) })
                          }
                          className="w-full h-8 px-2 rounded border border-slate-300 text-xs font-mono"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Tanggal Tes CBT</label>
                      <input
                        type="date"
                        value={editForm.testDate || ''}
                        onChange={(e) => setEditForm({ ...editForm, testDate: e.target.value })}
                        className="w-full h-8 px-2 rounded border border-slate-300 text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                {!isEditing ? (
                  <Button variant="outline" size="sm" iconLeft="edit" onClick={() => startEdit(w)}>
                    Ubah Pengaturan
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 w-full">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingWaveId(null)}
                      className="flex-1"
                    >
                      Batal
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleSaveEdit(w.id)}
                      className="flex-1"
                    >
                      Simpan
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
