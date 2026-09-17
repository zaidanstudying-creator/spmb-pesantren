import React, { useState } from 'react';
import { useSPMB, DocRequirement } from '@spmb/shared';
import { Button, Badge, Icon, Card } from '@spmb/ui';

export const FormBuilderTab: React.FC = () => {
  const { docRequirements, updateDocRequirement, addDocRequirement, deleteDocRequirement } =
    useSPMB();

  const [showAddForm, setShowAddForm] = useState(false);
  const [newDoc, setNewDoc] = useState({
    key: '',
    name: '',
    description: '',
    allowedFormats: ['PDF', 'JPG'],
    maxSizeMB: 2,
    isRequired: true,
    category: 'TAMBAHAN' as const
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.name.trim()) return;
    const cleanKey = (newDoc.key.trim() || newDoc.name.toLowerCase().replace(/[^a-z0-9]/g, '')) || `doc_${Date.now()}`;
    addDocRequirement({
      ...newDoc,
      key: cleanKey
    });
    setShowAddForm(false);
    setNewDoc({
      key: '',
      name: '',
      description: '',
      allowedFormats: ['PDF', 'JPG'],
      maxSizeMB: 2,
      isRequired: true,
      category: 'TAMBAHAN'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Form & Dokumen Persyaratan Builder
            </h2>
            <Badge variant="emerald" size="sm">
              {docRequirements.length} Berkas Terdaftar
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Konfigurasi jenis berkas digital yang harus diunggah calon santri saat registrasi online. Anda dapat menambah, mengubah status wajib/opsional, dan batas ukuran file.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          iconLeft="add"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Tutup Form' : 'Tambah Berkas Baru'}
        </Button>
      </div>

      {/* Add new doc requirement form */}
      {showAddForm && (
        <Card className="p-6 bg-slate-50 border-emerald-300">
          <form onSubmit={handleAdd} className="space-y-4">
            <h3 className="font-serif font-bold text-base text-slate-900">
              Tambah Syarat Dokumen Baru
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nama Dokumen *</label>
                <input
                  type="text"
                  required
                  value={newDoc.name}
                  onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
                  placeholder="Contoh: Surat Rekomendasi MWC NU / DMI"
                  className="w-full h-9 px-3 rounded border border-slate-300"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Deskripsi Petunjuk</label>
                <input
                  type="text"
                  value={newDoc.description}
                  onChange={(e) => setNewDoc({ ...newDoc, description: e.target.value })}
                  placeholder="Scan asli yang ditandatangani"
                  className="w-full h-9 px-3 rounded border border-slate-300"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Maksimal Ukuran (MB)</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={newDoc.maxSizeMB}
                  onChange={(e) => setNewDoc({ ...newDoc, maxSizeMB: Number(e.target.value) })}
                  className="w-full h-9 px-3 rounded border border-slate-300 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Sifat Dokumen</label>
                <div className="flex gap-4 pt-1.5">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="isRequired"
                      checked={newDoc.isRequired}
                      onChange={() => setNewDoc({ ...newDoc, isRequired: true })}
                    />
                    <span>Wajib Diunggah</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="isRequired"
                      checked={!newDoc.isRequired}
                      onChange={() => setNewDoc({ ...newDoc, isRequired: false })}
                    />
                    <span>Opsional (Pelengkap)</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
                Batal
              </Button>
              <Button variant="primary" size="sm" type="submit">
                Simpan Dokumen
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Doc Requirements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {docRequirements.map((doc, idx) => (
          <div
            key={doc.id}
            className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
                  0{idx + 1}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{doc.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{doc.description}</p>
                </div>
              </div>

              <button
                onClick={() =>
                  updateDocRequirement(doc.id, { isRequired: !doc.isRequired })
                }
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${
                  doc.isRequired
                    ? 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {doc.isRequired ? 'Wajib' : 'Opsional'}
              </button>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono">
                Format: {doc.allowedFormats.join(', ')} &bull; Maks {doc.maxSizeMB}MB
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const newSize = prompt('Masukkan ukuran maksimal MB:', doc.maxSizeMB.toString());
                    if (newSize && !isNaN(Number(newSize))) {
                      updateDocRequirement(doc.id, { maxSizeMB: Number(newSize) });
                    }
                  }}
                  className="text-emerald-700 hover:underline font-semibold"
                >
                  Edit Size
                </button>
                {docRequirements.length > 3 && (
                  <button
                    onClick={() => {
                      if (confirm(`Hapus syarat ${doc.name}?`)) {
                        deleteDocRequirement(doc.id);
                      }
                    }}
                    className="text-rose-600 hover:underline ml-2"
                  >
                    Hapus
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
