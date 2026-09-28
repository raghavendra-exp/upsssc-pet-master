import React from 'react';
import { Home, BookOpen, PenTool, Timer, TrendingUp, Search } from 'lucide-react';
import { Language } from '../types';

interface Props {
  activeRoute: string;
  onNavigate: (route: string) => void;
  onOpenSearch: () => void;
  lang: Language;
}

export const MobileBottomNav: React.FC<Props> = ({
  activeRoute,
  onNavigate,
  onOpenSearch,
  lang
}) => {
  const tabs = [
    { id: 'home', label: lang === 'hi' ? 'होम' : 'Home', icon: Home },
    { id: 'syllabus', label: lang === 'hi' ? 'पाठ्यक्रम' : 'Syllabus', icon: BookOpen },
    { id: 'practice', label: lang === 'hi' ? 'अभ्यास' : 'Practice', icon: PenTool },
    { id: 'mock', label: lang === 'hi' ? 'मॉक टेस्ट' : 'Mock', icon: Timer },
    { id: 'progress', label: lang === 'hi' ? 'प्रगति' : 'Progress', icon: TrendingUp }
  ];

  return (
    <>
      {/* Floating Search Action for Mobile */}
      <button
        onClick={onOpenSearch}
        className="lg:hidden fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
      </button>

      {/* Fixed Bottom Navigation */}
      <nav
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800 shadow-lg px-2 py-1 flex items-center justify-around safe-area-pb"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeRoute === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 min-w-[56px] transition-colors cursor-pointer ${
                isActive ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
