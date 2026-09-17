import React from 'react';
import { Icon } from '@spmb/ui';

interface StepperProgressProps {
  currentStage: number; // 1 to 5
}

export const StepperProgress: React.FC<StepperProgressProps> = ({ currentStage }) => {
  const steps = [
    { number: 1, title: 'Biodata Santri', desc: 'Data Diri & Ortu' },
    { number: 2, title: 'Unggah Berkas', desc: 'Verifikasi Dokumen' },
    { number: 3, title: 'Biaya Pendaftaran', desc: 'VA BSI Lunas' },
    { number: 4, title: 'Tes Seleksi CBT', desc: 'Kartu Peserta' },
    { number: 5, title: 'Pengumuman Hasil', desc: 'Yudisium Kelulusan' }
  ];

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200/80 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-amber-700 font-bold">
            Progres Seleksi Terpadu
          </span>
          <h2 className="font-serif text-xl font-bold text-slate-900 mt-0.5">
            Tahapan Pendaftaran & Evaluasi CBT
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          <span>Tahap {currentStage} dari 5 ({currentStage * 20}% Selesai)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        {steps.map((step) => {
          const isCompleted = step.number < currentStage;
          const isActive = step.number === currentStage;

          return (
            <div
              key={step.number}
              className={`p-3.5 rounded-xl border transition-all flex md:flex-col items-center md:items-start gap-3 ${
                isActive
                  ? 'bg-emerald-50/60 border-emerald-500 shadow-sm'
                  : isCompleted
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-white border-slate-100 opacity-60'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-transform ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow ring-4 ring-emerald-100 scale-105'
                    : isCompleted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {isCompleted ? <Icon name="check" size={18} /> : step.number}
              </div>
              <div>
                <span
                  className={`text-[11px] font-bold block uppercase tracking-wider ${
                    isActive ? 'text-emerald-800' : isCompleted ? 'text-emerald-700' : 'text-slate-400'
                  }`}
                >
                  Tahap 0{step.number}
                </span>
                <span className="text-sm font-semibold text-slate-800 block leading-tight">
                  {step.title}
                </span>
                <span className="text-xs text-slate-500 block mt-0.5">{step.desc}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
