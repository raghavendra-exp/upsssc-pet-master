import React, { useState } from 'react';
import passagesData from '../data/passages.json';
import { Language } from '../types';
import { recordQuestionAttempt } from '../utils/storage';
import { BookOpen, CheckCircle2, XCircle, Type, HelpCircle, Sparkles } from 'lucide-react';

interface Props {
  lang: Language;
}

export const PassageViewer: React.FC<Props> = ({ lang }) => {
  const [selectedPassageId, setSelectedPassageId] = useState(passagesData[0].id);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [answers, setAnswers] = useState<{ [qId: string]: number }>({});
  const [revealed, setRevealed] = useState<{ [qId: string]: boolean }>({});

  const currentPassage = passagesData.find((p) => p.id === selectedPassageId) || passagesData[0];

  const handleSelectOption = (qId: string, oIdx: number, correctIdx: number) => {
    if (revealed[qId]) return;
    setAnswers((prev) => ({ ...prev, [qId]: oIdx }));
    setRevealed((prev) => ({ ...prev, [qId]: true }));
    recordQuestionAttempt(qId, oIdx, oIdx === correctIdx);
  };

  const fontClass =
    fontSize === 'xlarge'
      ? 'text-lg leading-loose'
      : fontSize === 'large'
      ? 'text-base leading-relaxed'
      : 'text-sm sm:text-base leading-relaxed';

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Passage Selector Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
            PET Section 13 • 10 Marks
          </span>
          <h2 className="font-extrabold text-lg text-slate-900 mt-1">
            {lang === 'hi' ? 'अपठित हिन्दी गद्यांश विवेचन एवं विश्लेषण' : 'Hindi Unseen Passage Comprehension'}
          </h2>
          <p className="text-xs text-slate-500">
            {lang === 'hi'
              ? 'आधिकारिक परीक्षा में 2 गद्यांश पूछे जाते हैं (प्रत्येक से 5 प्रश्न = कुल 10 अंक)'
              : '2 Passages in official exam (5 questions each = 10 Marks)'}
          </p>
        </div>

        {/* Font resize buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <Type className="w-4 h-4 text-slate-500 ml-1.5" />
          <button
            onClick={() => setFontSize('normal')}
            className={`px-2 py-1 text-xs font-semibold rounded-lg ${
              fontSize === 'normal' ? 'bg-white shadow-2xs font-bold text-blue-600' : 'text-slate-600'
            }`}
          >
            Normal
          </button>
          <button
            onClick={() => setFontSize('large')}
            className={`px-2 py-1 text-xs font-semibold rounded-lg ${
              fontSize === 'large' ? 'bg-white shadow-2xs font-bold text-blue-600' : 'text-slate-600'
            }`}
          >
            Large
          </button>
          <button
            onClick={() => setFontSize('xlarge')}
            className={`px-2 py-1 text-xs font-semibold rounded-lg ${
              fontSize === 'xlarge' ? 'bg-white shadow-2xs font-bold text-blue-600' : 'text-slate-600'
            }`}
          >
            Extra Large
          </button>
        </div>
      </div>

      {/* Passage Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {passagesData.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => setSelectedPassageId(p.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              p.id === selectedPassageId
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {lang === 'hi' ? `गद्यांश ${idx + 1}: ${p.title}` : `Passage ${idx + 1}`}
          </button>
        ))}
      </div>

      {/* Main Grid: Reading Text + Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Passage Reading Pane */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600" />
              <span>{currentPassage.title}</span>
            </h3>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
              {currentPassage.theme}
            </span>
          </div>

          <div className={`text-slate-800 font-serif leading-relaxed text-justify space-y-4 ${fontClass}`}>
            <p>{currentPassage.text}</p>
          </div>
        </div>

        {/* Questions Pane */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-slate-400">
              Passage Questions ({currentPassage.questions.length})
            </h4>
          </div>

          <div className="space-y-4">
            {currentPassage.questions.map((q, qIndex) => {
              const userAns = answers[q.id];
              const isRev = revealed[q.id];

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-slate-900 text-sm leading-snug">
                      <span className="text-blue-600 mr-1.5 font-mono">Q{qIndex + 1}.</span>
                      {q.question}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {q.options.map((opt, oIdx) => {
                      const isCorrect = oIdx === q.answer;
                      const isSelected = userAns === oIdx;

                      let optClass =
                        'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 text-slate-800';
                      if (isRev) {
                        if (isCorrect) {
                          optClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                        } else if (isSelected) {
                          optClass = 'border-rose-500 bg-rose-50 text-rose-950 font-bold';
                        } else {
                          optClass = 'border-slate-100 opacity-60 text-slate-400';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isRev}
                          onClick={() => handleSelectOption(q.id, oIdx, q.answer)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${optClass}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                                isRev && isCorrect
                                  ? 'bg-emerald-600 text-white'
                                  : isRev && isSelected
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>

                          {isRev && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                          {isRev && isSelected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {isRev && (
                    <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-950 space-y-1 animate-in fade-in duration-150">
                      <div className="flex items-center gap-1 font-bold text-blue-800">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>व्याख्या:</span>
                      </div>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
