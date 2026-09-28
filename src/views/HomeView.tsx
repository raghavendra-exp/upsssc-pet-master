import React from 'react';
import {
  BookOpen,
  PenTool,
  History,
  Zap,
  MapPin,
  Timer,
  Library,
  RotateCcw,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Compass,
  FileText,
  BarChart2
} from 'lucide-react';
import { Language } from '../types';
import currentExam from '../data/exams/pet/pet-current.json';
import syllabusData from '../data/pet-syllabus.json';
import questionsData from '../data/questions.json';
import pyqsData from '../data/pyqs.json';
import booksData from '../data/books.json';
import { OfficialExamAlert } from '../components/OfficialExamAlert';

interface Props {
  lang: Language;
  onNavigate: (route: string) => void;
  onOpenStudyPlan?: () => void;
}

export const HomeView: React.FC<Props> = ({ lang, onNavigate, onOpenStudyPlan }) => {
  const dynamicQuestionsCount = questionsData.length;
  const dynamicPyqCount = pyqsData.length;
  const dynamicBooksCount = booksData.length;

  const mainCards = [
    {
      id: 'syllabus',
      title: lang === 'hi' ? 'पीईटी 2026 पाठ्यक्रम' : 'PET 2026 Syllabus',
      sub: lang === 'hi' ? '15 विषय • 100 अंक आधिकारिक वितरण' : '15 Subjects • 100 Marks Distribution',
      icon: BookOpen,
      color: 'from-blue-600 to-indigo-700',
      badge: 'Current'
    },
    {
      id: 'practice',
      title: lang === 'hi' ? 'अभ्यास प्रश्न' : 'Practice Engine',
      sub: `${dynamicQuestionsCount}+ ${lang === 'hi' ? 'मौलिक प्रश्न' : 'Targeted Practice Questions'}`,
      icon: PenTool,
      color: 'from-emerald-600 to-teal-700',
      badge: `${dynamicQuestionsCount}+ Qs`
    },
    {
      id: 'pyq',
      title: lang === 'hi' ? 'पीवाईक्यू (PYQs)' : 'Verified PYQs',
      sub: lang === 'hi' ? '2021-2025 आधिकारिक सॉल्व्ड पेपर्स' : '2021-2025 Commission Shift Papers',
      icon: History,
      color: 'from-amber-600 to-orange-700',
      badge: 'Verified'
    },
    {
      id: 'current-affairs',
      title: lang === 'hi' ? 'करेंट अफेयर्स' : 'Current Affairs',
      sub: lang === 'hi' ? 'दैनिक एवं मासिक अपडेट्स (10 अंक)' : 'National & UP Monthly Focus (10M)',
      icon: Zap,
      color: 'from-rose-600 to-red-700',
      badge: 'Monthly'
    },
    {
      id: 'up-gk',
      title: lang === 'hi' ? 'उत्तर प्रदेश स्पेशल' : 'UP Special GK & Map',
      sub: lang === 'hi' ? 'भूगोल, 75 जिले, नदियां व इतिहास' : 'Interactive Map, 75 Districts, Rivers',
      icon: MapPin,
      color: 'from-teal-600 to-cyan-700',
      badge: 'Interactive'
    },
    {
      id: 'mock',
      title: lang === 'hi' ? 'फुल मॉक टेस्ट' : 'Full Mock Simulation',
      sub: lang === 'hi' ? '100 प्रश्न • 120 मिनट • -0.25 मार्किंग' : '100 Questions • 120 Mins • -0.25',
      icon: Timer,
      color: 'from-purple-600 to-indigo-800',
      badge: 'Live Timer'
    },
    {
      id: 'books',
      title: lang === 'hi' ? 'अनुशंसित पुस्तकें' : 'Recommended Books',
      sub: lang === 'hi' ? 'अरिहंत 2026 गाइड, ल्यूसेंट, दृष्टि' : 'Arihant 2026, Lucent, Drishti Quick Book',
      icon: Library,
      color: 'from-indigo-600 to-blue-800',
      badge: 'Legal Links'
    },
    {
      id: 'revision',
      title: lang === 'hi' ? 'रैपिड रिवीजन' : 'Spaced Revision',
      sub: lang === 'hi' ? '1, 3, 7, 15 दिनों का वैज्ञानिक दोहराव' : '1, 3, 7, 15-Day Flashcards Queue',
      icon: RotateCcw,
      color: 'from-pink-600 to-rose-700',
      badge: 'Spaced'
    },
    {
      id: 'progress',
      title: lang === 'hi' ? 'मेरी प्रगति' : 'My Performance',
      sub: lang === 'hi' ? 'सटीकता, कमजोर क्षेत्र व मॉक विश्लेषण' : 'Accuracy, Weak Areas & Error Book',
      icon: TrendingUp,
      color: 'from-sky-600 to-blue-700',
      badge: 'Analytics'
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* 2026 Time-Sensitive Official Alert Card */}
      <OfficialExamAlert lang={lang} onNavigate={onNavigate} />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{lang === 'hi' ? 'सम्पूर्ण यूपीएसएसएससी पीईटी तैयारी मंच' : 'Official UPSSSC PET Examination Ecosystem'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            UPSSSC PET MASTER
          </h1>

          <p className="text-base sm:text-xl font-medium text-slate-600 leading-relaxed">
            {lang === 'hi'
              ? 'शून्य से शिखर: आधारभूत NCERT → संकल्पना → 1,000+ अभ्यास प्रश्न → प्रामाणिक PYQ → 100-प्रश्नों का फुल मॉक → वैज्ञानिक दोहराव'
              : 'Complete Preparation • Practice • PYQ • Current Affairs • Mock Tests — Grounded in official UPSSSC notifications and reputable educational standards.'}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('mock')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md shadow-blue-600/20 active:scale-95 transition-all cursor-pointer"
            >
              <span>{lang === 'hi' ? 'फुल मॉक टेस्ट शुरू करें' : 'Start Full Mock Test'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('syllabus')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm transition-all cursor-pointer"
            >
              <span>{lang === 'hi' ? 'पाठ्यक्रम देखें' : 'Explore Syllabus'}</span>
            </button>

            {onOpenStudyPlan && (
              <button
                onClick={onOpenStudyPlan}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-sm transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-700" />
                <span>{lang === 'hi' ? 'अध्ययन योजना बनाएं' : 'Generate Study Plan'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Counters Strip */}
        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-2xl sm:text-3xl font-extrabold text-blue-700">
              {dynamicQuestionsCount.toLocaleString()}+
            </p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              {lang === 'hi' ? 'मौलिक अभ्यास प्रश्न' : 'Practice Questions'}
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700">
              {dynamicPyqCount}+
            </p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              {lang === 'hi' ? 'सत्यापित पूर्व वर्ष प्रश्न' : 'Verified Shift PYQs'}
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-2xl sm:text-3xl font-extrabold text-purple-700">
              {dynamicBooksCount}
            </p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              {lang === 'hi' ? 'अनुशंसित पुस्तकें व स्रोत' : 'Recommended Books'}
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-700">
              15 / 100
            </p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              {lang === 'hi' ? 'विषय / कुल अंक' : 'Subjects / Total Marks'}
            </p>
          </div>
        </div>
      </div>

      {/* Zero to Master Journey Roadmap Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
        <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-400">
          {lang === 'hi' ? 'तैयारी का वैज्ञानिक क्रम' : 'Zero to Master Learning Hierarchy'}
        </h3>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-bold text-slate-700 whitespace-nowrap">
          {['ZERO', 'FOUNDATION (NCERT)', 'CONCEPT', 'PRACTICE (1000+)', 'PYQ (2021-25)', 'MOCK TEST', 'REVISION'].map(
            (step, sIdx, arr) => (
              <React.Fragment key={step}>
                <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-900 border border-blue-200/60">
                  {step}
                </span>
                {sIdx < arr.length - 1 && <span className="text-slate-300 font-bold">→</span>}
              </React.Fragment>
            )
          )}
        </div>
      </div>

      {/* Main 9 Cards Grid */}
      <div className="space-y-3">
        <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
          {lang === 'hi' ? 'मुख्य तैयारी मॉड्यूल्स' : 'Core Preparation Modules'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mainCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onNavigate(card.id)}
                className="group relative bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-blue-400 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${card.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                    {card.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-extrabold text-base text-slate-900 group-hover:text-blue-700 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {card.sub}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                  <span>{lang === 'hi' ? 'मॉड्यूल खोलें' : 'Open Module'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* What's New & Pattern History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* What's New */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                {lang === 'hi' ? 'पीईटी 2026 में क्या नया है?' : "What's New in PET 2026?"}
              </h3>
              <p className="text-xs text-slate-500">Official Commission Guidelines</p>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-700">
            {currentExam.whatsNewInPET.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">{item.title}</strong>
                  <span className="text-slate-600">{item.detail}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Pattern History */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">
                {lang === 'hi' ? 'पीईटी परीक्षा प्रारूप का इतिहास' : 'PET Pattern History (2021–2026)'}
              </h3>
              <p className="text-xs text-slate-500">Evolution of Preliminary Eligibility Test</p>
            </div>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {currentExam.patternHistory.map((ph) => (
              <div
                key={ph.year}
                className="p-3 rounded-xl border border-slate-100 bg-slate-50 text-xs space-y-1"
              >
                <div className="flex items-center justify-between font-bold">
                  <span className="text-blue-900">{ph.version} ({ph.year})</span>
                  <span className="text-slate-500">
                    {ph.questions} Qs • {ph.marks} Marks • {ph.duration} Mins
                  </span>
                </div>
                <p className="text-slate-600">{ph.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
