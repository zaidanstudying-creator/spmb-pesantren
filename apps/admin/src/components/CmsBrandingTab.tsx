import React, { useState } from 'react';
import { useSPMB, BrandingSettings } from '@spmb/shared';
import { Button, Badge, Icon, Card } from '@spmb/ui';

export const CmsBrandingTab: React.FC = () => {
  const { branding, updateBranding, resetBranding } = useSPMB();
  const [form, setForm] = useState<BrandingSettings>({ ...branding });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBranding(form);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    if (confirm('Kembalikan seluruh identitas dan branding ke standar bawaan?')) {
      resetBranding();
      setTimeout(() => {
        window.location.reload();
      }, 200);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Top Title & Actions */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              CMS Identitas & Logo Pesantren
            </h2>
            <Badge variant="emerald" size="sm">Bisa Edit Semua</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Ubah nama pesantren, yayasan, logo institusi, warna tema, dan legalitas yang tampil pada seluruh portal santri dan bukti tanda daftar.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="outline" size="sm" onClick={handleReset}>
            Reset Semula
          </Button>
          <Button variant="primary" size="sm" iconLeft="save" onClick={handleSave}>
            Simpan Perubahan Branding
          </Button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 flex items-center gap-2 animate-fadeIn">
          <Icon name="check_circle" size={18} className="text-emerald-700 shrink-0" />
          <span><strong>Berhasil disimpan!</strong> Seluruh identitas pesantren pada portal santri dan kartu ujian telah diperbarui secara realtime.</span>
        </div>
      )}

      {/* Grid 2 Kolom: Kiri Form Edit, Kanan Live Preview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Kolom Kiri: Form Identitas */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Form Informasi Lembaga
          </h3>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 uppercase">Nama Resmi Pondok Pesantren *</label>
              <input
                type="text"
                value={form.pesantrenName}
                onChange={(e) => setForm({ ...form, pesantrenName: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-emerald-700"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase">Nama Yayasan Penyelenggara</label>
                <input
                  type="text"
                  value={form.yayasanName}
                  onChange={(e) => setForm({ ...form, yayasanName: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-emerald-700"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase">Tahun Ajaran Aktif</label>
                <input
                  type="text"
                  value={form.academicYear}
                  onChange={(e) => setForm({ ...form, academicYear: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm font-mono focus:outline-none focus:border-emerald-700"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 uppercase">Slogan / Tagline Lembaga</label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-emerald-700"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 uppercase">Deskripsi Singkat Profil</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full p-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-emerald-700"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 uppercase">URL Logo Institusi (PNG/SVG Transparan)</label>
              <input
                type="text"
                value={form.logoUrl}
                onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs font-mono focus:outline-none focus:border-emerald-700"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase">Status Akreditasi</label>
                <input
                  type="text"
                  value={form.accreditation}
                  onChange={(e) => setForm({ ...form, accreditation: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-emerald-700"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase">SK Izin Operasional Kemenag</label>
                <input
                  type="text"
                  value={form.legalPermitNumber}
                  onChange={(e) => setForm({ ...form, legalPermitNumber: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-emerald-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase">No. WhatsApp SPMB</label>
                <input
                  type="text"
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm font-mono focus:outline-none focus:border-emerald-700"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700 uppercase">Email Kontak</label>
                <input
                  type="text"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-emerald-700"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 uppercase">Alamat Kampus Lengkap</label>
              <textarea
                rows={2}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full p-3 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-emerald-700"
              />
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Live Preview Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-emerald-950 text-white rounded-2xl p-6 shadow-xl space-y-4 relative overflow-hidden border border-emerald-900">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Live Preview Header Publik
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white font-mono">
                TA {form.academicYear}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {form.logoUrl && (
                <img
                  src={form.logoUrl}
                  alt={form.pesantrenName}
                  className="h-12 w-auto object-contain brightness-125"
                />
              )}
              <div>
                <h4 className="font-serif text-lg font-bold text-white leading-tight">
                  {form.pesantrenName || 'Nama Pesantren'}
                </h4>
                <p className="text-xs text-emerald-300 font-medium">
                  {form.yayasanName || 'Yayasan Penyelenggara'}
                </p>
              </div>
            </div>

            <p className="text-xs text-emerald-100/80 italic">
              “{form.tagline || 'Tagline Pesantren'}”
            </p>

            <div className="p-3 rounded-xl bg-white/10 text-[11px] text-emerald-200 space-y-1">
              <p><strong>Akreditasi:</strong> {form.accreditation}</p>
              <p><strong>Legalitas:</strong> {form.legalPermitNumber}</p>
              <p><strong>WhatsApp:</strong> {form.whatsapp}</p>
            </div>
          </div>

          <Card className="p-6 space-y-3">
            <h4 className="font-serif text-base font-bold text-slate-900">
              Sinkronisasi Multitabs Otomatis
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Setiap kali Anda menekan tombol Simpan, seluruh data di atas akan tersimpan ke state terpusat dan langsung ter-update di Portal Publik calon santri tanpa perlu reload halaman server.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
