import React from 'react';
import topicsData from '../data/topics.json';
import oneLinersData from '../data/one-liners.json';
import { Language } from '../types';
import { getStoredProgress } from '../utils/storage';
import {
  RotateCcw,
  Layers,
  FileCheck,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface Props {
  lang: Language;
  onNavigate: (route: string) => void;
}

export const RevisionView: React.FC<Props> = ({ lang, onNavigate }) => {
  const progress = getStoredProgress();
  const today = new Date().toISOString().split('T')[0];

  // Due topics
  const dueTopicIds = Object.keys(progress.revisionTopics).filter((tId) => {
    return progress.revisionTopics[tId].nextReviewDate <= today;
  });

  const dueTopics = topicsData.filter((t) => dueTopicIds.includes(t.id));

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Scientific Spaced Repetition (1, 3, 7, 15, 30 Days)</span>
        </span>

        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {lang === 'hi' ? 'आज का दोहराव (Today\'s Revision)' : 'Spaced Repetition & Revision Dashboard'}
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed mt-1">
            {lang === 'hi'
              ? 'वैज्ञानिक अंतराल दोहराव पद्धति (Spaced Repetition) के अनुसार आज आपके पुनरीक्षण हेतु निर्धारित विषय व वन-लाइनर तथ्य।'
              : 'Topics due for review today based on scientific spaced intervals to ensure long-term retention before exam day.'}
          </p>
        </div>

        {/* Quick Tools Launch */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('flashcards')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            <span>Open Rapid Flashcards</span>
          </button>

          <button
            onClick={() => onNavigate('one-liners')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
          >
            <FileCheck className="w-4 h-4 text-emerald-600" />
            <span>1,000 One-Liner Facts</span>
          </button>
        </div>
      </div>

      {/* Due Topics Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h2 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-pink-600" />
            <span>{lang === 'hi' ? 'आज दोहराने हेतु निर्धारित अध्याय' : 'Topics Due for Revision Today'} ({dueTopics.length})</span>
          </h2>
          <span className="text-xs text-slate-400 font-medium">Date: {today}</span>
        </div>

        {dueTopics.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl space-y-2">
            <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500" />
            <p className="font-bold text-slate-800 text-sm">
              {lang === 'hi' ? 'आज का सभी निर्धारित दोहराव पूर्ण है!' : 'All scheduled revisions for today are complete!'}
            </p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Any topic page allows you to click "Add to Spaced Revision" to schedule automatic review prompts at 1, 3, and 7-day intervals.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {dueTopics.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-pink-300 transition-colors flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                    {t.subject}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mt-1">{t.name}</h4>
                  <p className="text-slate-500 line-clamp-1">{t.concept}</p>
                </div>
                <button
                  onClick={() => onNavigate(`topic/${t.id}`)}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold shrink-0 cursor-pointer"
                >
                  Revise
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* High-Yield One Liners Preview */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h2 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-600" />
            <span>{lang === 'hi' ? 'उच्च-प्राथमिकता वन-लाइनर जीके' : 'High-Yield One-Liner GK Facts'}</span>
          </h2>
          <button
            onClick={() => onNavigate('one-liners')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {oneLinersData.slice(0, 6).map((ol) => (
            <div
              key={ol.id}
              className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 text-xs sm:text-sm text-slate-800 space-y-1"
            >
              <span className="text-[10px] font-bold uppercase text-slate-400">
                {ol.category}
              </span>
              <p className="font-medium">{lang === 'hi' && ol.factHi ? ol.factHi : ol.fact}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
