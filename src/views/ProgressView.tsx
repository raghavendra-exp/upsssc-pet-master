import React from 'react';
import { Language } from '../types';
import { getStoredProgress } from '../utils/storage';
import questionsData from '../data/questions.json';
import syllabusData from '../data/pet-syllabus.json';
import {
  TrendingUp,
  Award,
  Zap,
  Target,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Clock,
  RotateCcw
} from 'lucide-react';

interface Props {
  lang: Language;
  onNavigate: (route: string) => void;
}

export const ProgressView: React.FC<Props> = ({ lang, onNavigate }) => {
  const progress = getStoredProgress();

  const attempts = Object.values(progress.attemptedQuestions);
  const totalAttempted = attempts.length;
  const correctCount = attempts.filter((a) => a.correct).length;
  const wrongCount = totalAttempted - correctCount;
  const accuracy = totalAttempted > 0 ? ((correctCount / totalAttempted) * 100).toFixed(1) : '0';

  // Calculate subject-wise performance
  const subjectStats: { [sub: string]: { correct: number; total: number } } = {};
  attempts.forEach((att) => {
    // find question
    const q = questionsData.find((item) => progress.attemptedQuestions[item.id] === att);
    if (q) {
      if (!subjectStats[q.subject]) subjectStats[q.subject] = { correct: 0, total: 0 };
      subjectStats[q.subject].total++;
      if (att.correct) subjectStats[q.subject].correct++;
    }
  });

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Candidate Performance Analytics</span>
          </span>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Study Streak: {progress.streakDays} Days</span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {lang === 'hi' ? 'मेरी तैयारी की प्रगति व विश्लेषण' : 'My Performance & Analytics Dashboard'}
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed mt-1">
            {lang === 'hi'
              ? 'प्रश्नों की सटीकता, हल किए गए प्रश्न, मॉक टेस्ट स्कोरकार्ड एवं कमजोर क्षेत्रों का विस्तृत विश्लेषण।'
              : 'Track your overall question accuracy, time discipline, mock test trajectory, and subject mastery.'}
          </p>
        </div>

        {/* Top 4 Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Questions Attempted</span>
            <p className="text-2xl font-black text-slate-900 mt-0.5">{totalAttempted}</p>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Overall Accuracy</span>
            <p className="text-2xl font-black text-emerald-600 mt-0.5">{accuracy}%</p>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Active Mistakes</span>
            <p className="text-2xl font-black text-rose-600 mt-0.5">{progress.mistakeIds.length}</p>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Mocks Taken</span>
            <p className="text-2xl font-black text-purple-600 mt-0.5">{progress.mockScores.length}</p>
          </div>
        </div>
      </div>

      {/* Mock Score History */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>{lang === 'hi' ? 'मॉक टेस्ट स्कोर इतिहास (Mock Test History)' : 'Mock Test Score History'}</span>
        </h2>

        {progress.mockScores.length === 0 ? (
          <div className="p-6 text-center bg-slate-50 rounded-xl text-xs text-slate-500">
            No mock tests completed yet. Start your first 100-question simulation to track score trends!
            <div className="pt-3">
              <button
                onClick={() => onNavigate('mock')}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold cursor-pointer"
              >
                Launch Mock Test
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {progress.mockScores.map((ms, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900">Mock Test #{idx + 1}</span>
                  <span className="text-slate-400 ml-2">{ms.date}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-emerald-700 font-bold">{ms.accuracy.toFixed(1)}% Accuracy</span>
                  <span className="font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                    {ms.score.toFixed(2)} / {ms.total}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Action to Clear Mistakes */}
      {progress.mistakeIds.length > 0 && (
        <div className="p-5 bg-rose-50 border border-rose-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-rose-950 text-sm flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>You have {progress.mistakeIds.length} incorrect questions in your Error Notebook</span>
            </h3>
            <p className="text-xs text-rose-800">
              Clear these errors to boost your score above the 99th percentile cutoff.
            </p>
          </div>
          <button
            onClick={() => onNavigate('my-mistakes')}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs cursor-pointer"
          >
            Review Error Book
          </button>
        </div>
      )}
    </div>
  );
};
