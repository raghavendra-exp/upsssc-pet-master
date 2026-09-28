import React, { useState } from 'react';
import questionsData from '../data/questions.json';
import { Language, QuestionItem } from '../types';
import { getStoredProgress, removeMistake, toggleBookmark } from '../utils/storage';
import { PracticeEngine } from '../components/PracticeEngine';
import {
  AlertTriangle,
  RotateCcw,
  Trash2,
  Bookmark,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Play
} from 'lucide-react';

interface Props {
  lang: Language;
  onNavigate: (route: string) => void;
}

export const MistakesView: React.FC<Props> = ({ lang, onNavigate }) => {
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [refresher, setRefresher] = useState(0);

  const progress = getStoredProgress();
  const mistakeQuestions = questionsData.filter((q) => progress.mistakeIds.includes(q.id));

  const handleRemove = (qId: string) => {
    removeMistake(qId);
    setRefresher((prev) => prev + 1);
  };

  if (isQuizMode && mistakeQuestions.length > 0) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setIsQuizMode(false)}
          className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer"
        >
          ← Return to Mistakes List
        </button>
        <PracticeEngine
          questions={mistakeQuestions}
          lang={lang}
          title={lang === 'hi' ? 'गलत प्रश्नों का पुनः अभ्यास' : 'Re-Attempting Incorrect Questions'}
          onFinish={() => setIsQuizMode(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Targeted Error Elimination Notebook</span>
          </span>

          {mistakeQuestions.length > 0 && (
            <button
              onClick={() => setIsQuizMode(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{lang === 'hi' ? 'सभी गलत प्रश्नों का पुनः अभ्यास करें' : 'Practice All Mistakes Again'}</span>
            </button>
          )}
        </div>

        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {lang === 'hi' ? 'मेरी गलतियां (Error Notebook)' : 'My Mistakes (Error Notebook)'}
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed mt-1">
            {lang === 'hi'
              ? 'मॉक टेस्ट अथवा अभ्यास के दौरान आपके द्वारा गलत उत्तर दिए गए सभी प्रश्न यहाँ संग्रहीत हैं। इन्हें पुनः हल करके अपनी कमजोरियों को दूर करें।'
              : 'Every incorrectly answered question is recorded here. Practice them until you achieve 100% accuracy.'}
          </p>
        </div>
      </div>

      {/* Empty State */}
      {mistakeQuestions.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
          <CheckCircle2 className="w-16 h-16 mx-auto text-emerald-500" />
          <h3 className="font-extrabold text-lg text-slate-900">
            {lang === 'hi' ? 'शाबाश! आपकी एरर नोटबुक खाली है।' : 'Great Job! Your Error Notebook is Empty.'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            {lang === 'hi'
              ? 'जब भी आप किसी अभ्यास या मॉक टेस्ट में गलत उत्तर देंगे, वह प्रश्न स्वतः यहाँ समीक्षा हेतु जुड़ जाएगा।'
              : 'Whenever you answer a question incorrectly during practice or mocks, it will be automatically logged here for targeted revision.'}
          </p>
          <button
            onClick={() => onNavigate('practice')}
            className="mt-3 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xs hover:bg-blue-700 cursor-pointer"
          >
            Start Practice Session
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {mistakeQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-500">
                  {q.subject} • {q.topic}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRemove(q.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 cursor-pointer text-xs"
                    title="Remove after mastering"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>

              <p className="font-semibold text-slate-900 text-sm sm:text-base leading-relaxed">
                <span className="text-slate-400 font-mono mr-1.5">Q{idx + 1}.</span>
                {lang === 'hi' && q.questionHi ? q.questionHi : q.question}
              </p>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {q.options.map((opt, oIdx) => (
                  <div
                    key={oIdx}
                    className={`p-2.5 rounded-xl border font-medium ${
                      oIdx === q.answer
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="mr-1.5 font-bold">{String.fromCharCode(65 + oIdx)}.</span>
                    <span>{opt}</span>
                    {oIdx === q.answer && <span className="ml-1 text-emerald-700 font-bold">(Correct Answer)</span>}
                  </div>
                ))}
              </div>

              {/* Explanation */}
              <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-950 space-y-1">
                <strong className="text-blue-900 block font-bold">व्याख्या (Official Explanation):</strong>
                <p>{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
