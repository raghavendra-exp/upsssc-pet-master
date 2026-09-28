import React from 'react';
import { Search, Globe, Menu, X, BookOpen, Award, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface Props {
  lang: Language;
  onToggleLang: () => void;
  onOpenSearch: () => void;
  onOpenMobileMenu: () => void;
  isMobileMenuOpen: boolean;
  activeRoute: string;
  onNavigate: (route: string) => void;
}

export const Header: React.FC<Props> = ({
  lang,
  onToggleLang,
  onOpenSearch,
  onOpenMobileMenu,
  isMobileMenuOpen,
  activeRoute,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
          <button
            onClick={() => onOpenMobileMenu()}
            className="lg:hidden p-1.5 sm:p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 sm:gap-3 text-left group cursor-pointer min-w-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-900 to-indigo-700 flex items-center justify-center text-amber-300 font-bold shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform shrink-0">
              <Award className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="font-extrabold text-xs sm:text-base md:text-lg tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors truncate max-w-[110px] sm:max-w-none">
                  UPSSSC PET MASTER
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold rounded-full bg-amber-100 text-amber-800 border border-amber-300 shrink-0">
                  2026
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium truncate max-w-[180px] hidden sm:block">
                {lang === 'hi' ? 'सम्पूर्ण पीईटी तैयारी मंच' : 'Complete PET Preparation'}
              </p>
            </div>
          </button>
        </div>

        {/* Desktop Quick Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
          {[
            { id: 'dashboard', label: lang === 'hi' ? 'डैशबोर्ड' : 'Dashboard' },
            { id: 'syllabus', label: lang === 'hi' ? 'पाठ्यक्रम' : 'Syllabus' },
            { id: 'books', label: lang === 'hi' ? 'अनुशंसित पुस्तकें' : 'Books' },
            { id: 'practice', label: lang === 'hi' ? 'अभ्यास' : 'Practice' },
            { id: 'mock', label: lang === 'hi' ? 'मॉक टेस्ट' : 'Mock Test' },
            { id: 'pyq', label: lang === 'hi' ? 'पीवाईक्यू (PYQs)' : 'PYQs' },
            { id: 'up-gk', label: lang === 'hi' ? 'यूपी स्पेशल' : 'UP GK' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeRoute === item.id
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Global Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1 sm:gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 text-xs sm:text-sm font-medium border border-slate-200 transition-all cursor-pointer"
            title="Search anything"
          >
            <Search className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">
              {lang === 'hi' ? 'खोजें...' : 'Search...'}
            </span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white rounded border border-slate-200 shadow-2xs">
              Ctrl+K
            </kbd>
          </button>

          {/* Hindi/English Toggle */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-slate-300 hover:border-blue-500 bg-white hover:bg-blue-50/50 text-[11px] sm:text-sm font-bold text-blue-900 transition-all shadow-2xs cursor-pointer active:scale-95"
            title="Switch Language / भाषा बदलें"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>{lang === 'hi' ? 'EN' : 'हिन्दी'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
