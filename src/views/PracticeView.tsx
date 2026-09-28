import React, { useState } from 'react';
import questionsData from '../data/questions.json';
import pyqsData from '../data/pyqs.json';
import syllabusData from '../data/pet-syllabus.json';
import { Language, QuestionItem } from '../types';
import { getStoredProgress } from '../utils/storage';
import { PracticeEngine } from '../components/PracticeEngine';
import {
  PenTool,
  Zap,
  Layers,
  History,
  AlertTriangle,
  Bookmark,
  CheckCircle2,
  Filter,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface Props {
  lang: Language;
  onNavigate: (route: string) => void;
}

export const PracticeView: React.FC<Props> = ({ lang, onNavigate }) => {
  const [activeMode, setActiveMode] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [activeQuestions, setActiveQuestions] = useState<QuestionItem[]>([]);

  const progress = getStoredProgress();

  const handleLaunchMode = (mode: string) => {
    let pool: QuestionItem[] = [...questionsData];

    // Filter by subject if not 'All'
    if (selectedSubject !== 'All') {
      pool = pool.filter((q) => q.subject.toLowerCase() === selectedSubject.toLowerCase());
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => 0.5 - Math.random());

    let count = 10;
    if (mode === 'quick') count = 10;
    else if (mode === 'topic') count = 20;
    else if (mode === 'chapter') count = 30;
    else if (mode === 'subject') count = 50;
    else if (mode === 'mixed') count = 100;
    else if (mode === 'mistakes') {
      const mistakePool = questionsData.filter((q) => progress.mistakeIds.includes(q.id));
      setActiveQuestions(mistakePool.length > 0 ? mistakePool : shuffled.slice(0, 10));
      setActiveMode(mode);
      return;
    } else if (mode === 'bookmarks') {
      const bookmarkPool = questionsData.filter((q) => progress.bookmarkedQuestionIds.includes(q.id));
      setActiveQuestions(bookmarkPool.length > 0 ? bookmarkPool : shuffled.slice(0, 10));
      setActiveMode(mode);
      return;
    }

    setActiveQuestions(shuffled.slice(0, count));
    setActiveMode(mode);
  };

  if (activeMode) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setActiveMode(null)}
          className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer"
        >
          ← Return to Practice Modes Hub
        </button>
        <PracticeEngine
          questions={activeQuestions}
          lang={lang}
          title={`Practice Mode: ${activeMode.toUpperCase()}`}
          onFinish={() => setActiveMode(null)}
        />
      </div>
    );
  }

  const practiceModes = [
    { id: 'quick', title: 'Quick Practice', count: '10 Qs', desc: 'Rapid 10-question sprint for quick daily momentum', icon: Zap, color: 'text-amber-600 bg-amber-50' },
    { id: 'topic', title: 'Topic Practice', count: '20 Qs', desc: 'Targeted single topic depth and concept validation', icon: Layers, color: 'text-blue-600 bg-blue-50' },
    { id: 'chapter', title: 'Chapter Practice', count: '30 Qs', desc: 'Comprehensive chapter testing with varied difficulty', icon: PenTool, color: 'text-indigo-600 bg-indigo-50' },
    { id: 'subject', title: 'Subject Practice', count: '50 Qs', desc: 'Exhaustive subject simulation matching commission weightage', icon: Sparkles, color: 'text-emerald-600 bg-emerald-50' },
    { id: 'mixed', title: 'Mixed Grand Practice', count: '100 Qs', desc: 'All 15 subjects randomly balanced across question bank', icon: CheckCircle2, color: 'text-purple-600 bg-purple-50' },
    {
      id: 'mistakes',
      title: 'Wrong Questions ("My Mistakes")',
      count: `${progress.mistakeIds.length} Qs`,
      desc: 'Re-attempt questions you previously answered incorrectly',
      icon: AlertTriangle,
      color: 'text-rose-600 bg-rose-50'
    },
    {
      id: 'bookmarks',
      title: 'Revision Mode (Bookmarks)',
      count: `${progress.bookmarkedQuestionIds.length} Qs`,
      desc: 'Practice only questions bookmarked for revision',
      icon: Bookmark,
      color: 'text-sky-600 bg-sky-50'
    }
  ];

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
          <PenTool className="w-3.5 h-3.5" />
          <span>{questionsData.length}+ Practice Questions Available</span>
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {lang === 'hi' ? 'यूपीएसएसएससी पीईटी अभ्यास हब' : 'UPSSSC PET Practice Engine'}
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          {lang === 'hi'
            ? 'अपनी सुविधा अनुसार मोड चुनें: 10 प्रश्नों की त्वरित क्विज, 50 प्रश्नों का विषयवार परीक्षण, या पूर्व में गलत हुए प्रश्नों का पुनः अभ्यास।'
            : 'Select your preferred practice mode: rapid 10-question sprint, topic mastery, or re-attempt past errors.'}
        </p>

        {/* Optional Subject Filter */}
        <div className="pt-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-slate-400 shrink-0">Filter Subject:</span>
          {['All', ...syllabusData.subjects.map((s) => s.name)].map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedSubject === sub
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Modes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {practiceModes.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.id}
              onClick={() => handleLaunchMode(m.id)}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-blue-400 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${m.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                    {m.count}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-700 transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{m.desc}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                <span>Start Session</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
