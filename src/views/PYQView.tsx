import React, { useState } from 'react';
import pyqsData from '../data/pyqs.json';
import pyqAnalysisData from '../data/pyq-analysis.json';
import { Language, PYQItem } from '../types';
import {
  History,
  CheckCircle2,
  Filter,
  BarChart3,
  TrendingUp,
  Award,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Layers
} from 'lucide-react';

interface Props {
  lang: Language;
}

export const PYQView: React.FC<Props> = ({ lang }) => {
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'questions' | 'analysis'>('questions');
  const [revealed, setRevealed] = useState<{ [id: string]: boolean }>({});

  const years = ['All', '2025', '2024', '2023', '2022', '2021'];
  const subjects = ['All', ...new Set(pyqsData.map((p) => p.subject))];

  const filteredPyqs = pyqsData.filter((p) => {
    const matchesYear = selectedYear === 'All' || String(p.year) === selectedYear;
    const matchesSub = selectedSubject === 'All' || p.subject === selectedSubject;
    return matchesYear && matchesSub;
  });

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
            <span>100% Commission Answer Key Verified</span>
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Strictly Previous Year Papers • Never Confused with Original Practice
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {lang === 'hi' ? 'पूर्व वर्ष प्रश्न संग्रह एवं विश्लेषण (2021–2025)' : 'Verified Previous Year Questions (PYQs)'}
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed mt-1">
            {lang === 'hi'
              ? 'यूपीएसएसएससी द्वारा 2021 से 2025 तक आयोजित विभिन्न पालियों (Shifts) के वास्तविक परीक्षा प्रश्न, आधिकारिक उत्तर कुंजी व विषयवार पुनरावृत्ति विश्लेषण।'
              : 'Authentic shift papers from 2021 to 2025 with official commission answer keys and trend analysis.'}
          </p>
        </div>

        {/* View Switcher: Questions vs Trends Analysis */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'questions'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Verified Questions ({filteredPyqs.length})
          </button>

          <button
            onClick={() => setActiveTab('analysis')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'analysis'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>PYQ Trends & Analysis Dashboard</span>
          </button>
        </div>
      </div>

      {/* Analysis Tab View */}
      {activeTab === 'analysis' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Most Asked Topics */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>{lang === 'hi' ? 'सर्वाधिक पूछे जाने वाले विषय (Most Asked Topics)' : 'Most Asked High-Frequency Topics'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {pyqAnalysisData.mostAskedTopics.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1 text-xs">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-blue-700">{item.subject}</span>
                    <span>{item.importance}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.topic}</h4>
                  <p className="text-slate-500">{item.timesAsked} times tested across shifts</p>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Distribution Matrix */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <span>{lang === 'hi' ? 'विषयवार प्रश्न भार एवं पुनरावृत्ति' : 'Subject Shift Distribution & Trends'}</span>
            </h3>

            <div className="space-y-2">
              {pyqAnalysisData.subjectBreakdown.map((sb) => (
                <div key={sb.subject} className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-900">{sb.subject}</span>
                    <span className="text-blue-600">{sb.percentage}% of overall questions</span>
                  </div>
                  <p className="text-slate-500">{sb.trend}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Questions Tab View */}
      {activeTab === 'questions' && (
        <div className="space-y-5 animate-in fade-in duration-150">
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-xs font-bold text-slate-400">Year:</span>
              {years.map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                    selectedYear === yr ? 'bg-blue-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          {/* Question Cards */}
          <div className="space-y-4">
            {filteredPyqs.map((pyq, idx) => {
              const isRev = revealed[pyq.id];
              return (
                <div
                  key={pyq.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                        PET {pyq.year} • {pyq.shift}
                      </span>
                      <span className="text-slate-500 font-medium">
                        {pyq.subject} • {pyq.topic}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ✓ {pyq.officialVerification}
                    </span>
                  </div>

                  <p className="text-base font-semibold text-slate-900 leading-relaxed">
                    <span className="text-slate-400 mr-2 font-mono">Q{idx + 1}.</span>
                    {lang === 'hi' && pyq.questionHi ? pyq.questionHi : pyq.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {pyq.options.map((opt, oIdx) => {
                      const isCorrect = oIdx === pyq.answer;
                      return (
                        <div
                          key={oIdx}
                          className={`p-3 rounded-xl border font-medium flex items-center gap-2.5 ${
                            isRev && isCorrect
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-400/20'
                              : 'border-slate-200 bg-slate-50/40 text-slate-700'
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                              isRev && isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Toggle Explanation Button */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() =>
                        setRevealed((prev) => ({ ...prev, [pyq.id]: !prev[pyq.id] }))
                      }
                      className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer"
                    >
                      {isRev ? 'Hide Official Key' : 'Reveal Official Answer Key & Solution'}
                    </button>
                  </div>

                  {isRev && (
                    <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-950 space-y-1 animate-in fade-in duration-150">
                      <p className="font-bold text-blue-800">आयोग की आधिकारिक व्याख्या:</p>
                      <p className="leading-relaxed">{pyq.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
