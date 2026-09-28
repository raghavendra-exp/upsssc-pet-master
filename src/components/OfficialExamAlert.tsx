import React from 'react';
import { Calendar, AlertCircle, ExternalLink, ShieldCheck, Clock } from 'lucide-react';
import currentExam from '../data/exams/pet/pet-current.json';

interface Props {
  lang: 'en' | 'hi';
  onNavigate?: (route: string) => void;
}

export const OfficialExamAlert: React.FC<Props> = ({ lang, onNavigate }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-4 sm:p-6 shadow-xl border border-blue-700/50 mb-6">
      {/* Decorative background glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400 text-slate-950 shadow-sm animate-pulse">
              <AlertCircle className="w-3.5 h-3.5" />
              {lang === 'hi' ? 'पीईटी 2026 — नवीनतम आधिकारिक सूचना' : 'PET 2026 — Latest Official Information'}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-blue-800/80 text-blue-200 border border-blue-600/50">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              {lang === 'hi' ? `सत्यापित: ${currentExam.lastVerified}` : `Verified: ${currentExam.lastVerified}`}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            {lang === 'hi' ? 'उत्तर प्रदेश पीईटी 2026 परीक्षा तिथि' : 'UPSSSC PET 2026 Exam Schedule'}
          </h2>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-300">
            <div className="flex items-center gap-1.5 text-amber-300 font-medium">
              <Calendar className="w-4 h-4" />
              <span>{currentExam.examDates}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-300" />
              <span>{lang === 'hi' ? 'समय: 120 मिनट (100 प्रश्न | 100 अंक)' : '120 Mins (100 Questions | 100 Marks)'}</span>
            </div>
            <div className="text-xs sm:text-sm text-slate-400">
              {lang === 'hi' ? 'स्रोतः ' : 'Source: '}
              <span className="text-slate-200 underline underline-offset-2">{currentExam.source}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 pt-2 md:pt-0">
          <a
            href={currentExam.officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-amber-500/20 active:scale-95"
          >
            <span>{lang === 'hi' ? 'आधिकारिक पोर्टल खोलें' : 'View Official Notification'}</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          {onNavigate && (
            <button
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all duration-200 border border-white/20 backdrop-blur-sm active:scale-95"
            >
              <span>{lang === 'hi' ? 'परीक्षा विवरण देखें' : 'View Details & Dates'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
