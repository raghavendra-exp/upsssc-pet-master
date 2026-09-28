import React from 'react';
import {
  LayoutDashboard,
  BookMarked,
  Library,
  PenTool,
  Timer,
  History,
  FileText,
  BarChart2,
  Zap,
  MapPin,
  Layers,
  CalendarCheck,
  AlertTriangle,
  RotateCcw,
  TrendingUp,
  FileCheck,
  X
} from 'lucide-react';
import { Language } from '../types';

interface Props {
  activeRoute: string;
  onNavigate: (route: string) => void;
  lang: Language;
  isOpenOnMobile?: boolean;
  onCloseMobile?: () => void;
  mistakesCount?: number;
}

export const Sidebar: React.FC<Props> = ({
  activeRoute,
  onNavigate,
  lang,
  isOpenOnMobile,
  onCloseMobile,
  mistakesCount = 0
}) => {
  const navSections = [
    {
      group: lang === 'hi' ? 'मुख्य परीक्षा' : 'Core Exam',
      items: [
        { id: 'dashboard', label: lang === 'hi' ? 'पीईटी डैशबोर्ड' : 'PET Dashboard', icon: LayoutDashboard },
        { id: 'syllabus', label: lang === 'hi' ? '15 विषय पाठ्यक्रम' : 'Official Syllabus', icon: BookMarked },
        { id: 'books', label: lang === 'hi' ? 'अनुशंसित पुस्तकें' : 'Recommended Books', icon: Library, badge: 'Crucial' },
        { id: 'study-plan', label: lang === 'hi' ? 'अध्ययन योजना' : 'Study Planner', icon: CalendarCheck }
      ]
    },
    {
      group: lang === 'hi' ? 'परीक्षण एवं अभ्यास' : 'Testing & Practice',
      items: [
        { id: 'practice', label: lang === 'hi' ? '1,000+ प्रश्न अभ्यास' : 'Question Bank (1000+)', icon: PenTool },
        { id: 'mock', label: lang === 'hi' ? '100-प्रश्नों का फुल मॉक' : 'Full Mock Test (100Q)', icon: Timer, badge: 'Live' },
        { id: 'pyq', label: lang === 'hi' ? 'पीवाईक्यू (2021-2025)' : 'Verified PYQs', icon: History },
        { id: 'passages', label: lang === 'hi' ? 'अपठित हिन्दी गद्यांश' : 'Hindi Passages (10M)', icon: FileText },
        { id: 'di', label: lang === 'hi' ? 'ग्राफ एवं तालिका व्याख्या' : 'Graph & Table DI (20M)', icon: BarChart2 }
      ]
    },
    {
      group: lang === 'hi' ? 'करेंट अफेयर्स एवं यूपी' : 'Dynamic & State GK',
      items: [
        { id: 'current-affairs', label: lang === 'hi' ? 'मासिक समसामयिकी' : 'Current Affairs', icon: Zap },
        { id: 'up-gk', label: lang === 'hi' ? 'उत्तर प्रदेश सामान्य ज्ञान' : 'UP Special & Map', icon: MapPin }
      ]
    },
    {
      group: lang === 'hi' ? 'दोहराव एवं प्रगति' : 'Revision & Progress',
      items: [
        { id: 'flashcards', label: lang === 'hi' ? 'रैपिड फ्लैशकार्ड्स' : 'Rapid Flashcards', icon: Layers },
        { id: 'one-liners', label: lang === 'hi' ? 'वन-लाइनर जीके' : 'One-Liner GK Facts', icon: FileCheck },
        { id: 'revision', label: lang === 'hi' ? 'आज का दोहराव' : "Today's Revision", icon: RotateCcw },
        {
          id: 'my-mistakes',
          label: lang === 'hi' ? 'मेरी गलतियां (Error Book)' : 'My Mistakes',
          icon: AlertTriangle,
          badge: mistakesCount > 0 ? String(mistakesCount) : undefined
        },
        { id: 'progress', label: lang === 'hi' ? 'मेरी प्रगति व विश्लेषण' : 'My Performance', icon: TrendingUp }
      ]
    }
  ];

  const content = (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200/90 dark:border-slate-800 w-64 select-none">
      {/* Mobile close bar */}
      <div className="lg:hidden p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <span className="font-bold text-slate-900 dark:text-white text-sm">
          {lang === 'hi' ? 'नेविगेशन मेनू' : 'Navigation Menu'}
        </span>
        <button
          onClick={onCloseMobile}
          className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navSections.map((sec, idx) => (
          <div key={idx} className="space-y-1">
            <h3 className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {sec.group}
            </h3>
            <div className="space-y-0.5 pt-1">
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeRoute === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      if (onCloseMobile) onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : item.badge === 'Crucial'
                            ? 'bg-amber-100 text-amber-800'
                            : item.badge === 'Live'
                            ? 'bg-red-100 text-red-700 animate-pulse'
                            : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Footer info */}
      <div className="p-3 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 text-center">
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
          Official UPSSSC Standards
        </p>
        <p className="text-[10px] text-slate-400 dark:text-slate-500">
          PET 2026 • 100 Marks • 120 Mins
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block shrink-0 sticky top-16 h-[calc(100vh-4rem)] z-20">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenOnMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 w-72 max-w-[85vw] h-full shadow-2xl animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
