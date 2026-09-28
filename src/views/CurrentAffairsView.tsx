import React, { useState } from 'react';
import currentAffairsData from '../data/current-affairs.json';
import { Language, CurrentAffairsItem } from '../types';
import {
  Zap,
  Printer,
  Calendar,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Layers,
  ArrowRight,
  Filter
} from 'lucide-react';

interface Props {
  lang: Language;
}

export const CurrentAffairsView: React.FC<Props> = ({ lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'news' | 'mcqs'>('news');

  const categories = ['All', 'UTTAR PRADESH', 'SCIENCE & TECHNOLOGY', 'GOVERNMENT SCHEMES', 'SPORTS', 'ECONOMY'];

  const filteredItems =
    selectedCategory === 'All'
      ? currentAffairsData
      : currentAffairsData.filter((item) => item.category === selectedCategory);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
            <Zap className="w-3.5 h-3.5" />
            <span>PET Section 11 • 10 Marks Weightage</span>
          </span>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>{lang === 'hi' ? 'पीडीएफ / प्रिंट रिवीजन शीट' : 'Print Monthly Digest Sheet'}</span>
          </button>
        </div>

        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {lang === 'hi' ? 'उत्तर प्रदेश व राष्ट्रीय मासिक समसामयिकी' : 'UPSSSC PET Current Affairs Digest'}
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed mt-1">
            {lang === 'hi'
              ? 'आयोग के परीक्षा पैटर्न पर आधारित समसामयिक घटनाएं: 100 शब्दों का सार, 5 महत्वपूर्ण तथ्य, यूपी विशेष सन्दर्भ एवं अभ्यास प्रश्न।'
              : 'Structured current affairs with 100-word summaries, 5 key exam facts, UP significance, and MCQs.'}
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                cat === selectedCategory
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* News Feed */}
      <div className="space-y-6">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 hover:border-slate-300 transition-colors"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-extrabold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200">
                {item.category}
              </span>
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.date}</span>
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
              {lang === 'hi' && item.headlineHi ? item.headlineHi : item.headline}
            </h2>

            {/* 100-Word Summary */}
            <div className="text-slate-700 text-xs sm:text-sm leading-relaxed text-justify bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              <p>{item.summary}</p>
            </div>

            {/* 5 Key Facts */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                5 Exam-Critical Facts:
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {item.facts.map((fact, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Relevance Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl space-y-0.5">
                <strong className="text-blue-900 block font-bold">PET Exam Relevance:</strong>
                <p className="text-blue-800">{item.petRelevance}</p>
              </div>
              <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl space-y-0.5">
                <strong className="text-emerald-900 block font-bold">UP Specific Significance:</strong>
                <p className="text-emerald-800">{item.upRelevance}</p>
              </div>
            </div>

            {/* Associated Practice MCQs */}
            {item.mcqs && item.mcqs.length > 0 && (
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Associated Practice MCQ
                </span>
                {item.mcqs.map((mcq, mIdx) => (
                  <div key={mIdx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 text-xs space-y-2">
                    <p className="font-bold text-slate-900">{mcq.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {mcq.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-2 rounded-lg border text-left font-medium ${
                            oIdx === mcq.answer
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                              : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          <span className="mr-1 font-bold">{String.fromCharCode(65 + oIdx)}.</span>
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium pt-1">
                      <strong>Explanation:</strong> {mcq.explanation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};
