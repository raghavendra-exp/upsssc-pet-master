import React, { useState } from 'react';
import { QuestionItem, Language } from '../types';
import { recordQuestionAttempt, toggleBookmark } from '../utils/storage';
import {
  CheckCircle2,
  XCircle,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Check
} from 'lucide-react';

interface Props {
  questions: QuestionItem[];
  lang: Language;
  onFinish?: () => void;
  title?: string;
}

export const PracticeEngine: React.FC<Props> = ({
  questions,
  lang,
  onFinish,
  title
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [attemptedCount, setAttemptedCount] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
        <HelpCircle className="w-12 h-12 mx-auto text-slate-300 mb-2" />
        <h3 className="font-bold text-slate-800 text-base">No questions available in this set.</h3>
        <p className="text-xs text-slate-500 mt-1">Please select another subject, topic, or mode.</p>
        <button
          onClick={onFinish}
          className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
        >
          Return
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (revealed) return;
    setSelectedOption(idx);
    setRevealed(true);
    setAttemptedCount((prev) => prev + 1);

    const isRight = idx === currentQ.answer;
    if (isRight) setScore((prev) => prev + 1);

    recordQuestionAttempt(currentQ.id, idx, isRight);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setRevealed(false);
      setBookmarked(false);
    } else {
      if (onFinish) onFinish();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedOption(null);
      setRevealed(false);
      setBookmarked(false);
    }
  };

  const handleBookmark = () => {
    const res = toggleBookmark(currentQ.id);
    setBookmarked(res);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Practice Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
            {currentQ.subject}
          </span>
          <h2 className="font-extrabold text-base text-slate-900 mt-1">
            {title || (lang === 'hi' ? 'दैनिक अभ्यास क्विज' : 'Interactive Practice Quiz')}
          </h2>
          <p className="text-xs text-slate-500">
            {lang === 'hi'
              ? `प्रश्न ${currentIndex + 1} of ${questions.length} • सही: ${score} / ${attemptedCount}`
              : `Question ${currentIndex + 1} of ${questions.length} • Correct: ${score} of ${attemptedCount}`}
          </p>
        </div>

        <button
          onClick={handleBookmark}
          className={`p-2 rounded-xl border transition-colors cursor-pointer ${
            bookmarked
              ? 'bg-amber-100 border-amber-300 text-amber-800'
              : 'border-slate-200 text-slate-500 hover:bg-slate-100'
          }`}
          title="Bookmark Question"
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
        </button>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-sm space-y-5">
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase text-slate-400">
            {currentQ.topic} • {currentQ.difficulty.toUpperCase()}
          </span>
          <p className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
            {lang === 'hi' && currentQ.questionHi ? currentQ.questionHi : currentQ.question}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt, oIdx) => {
            const isCorrect = oIdx === currentQ.answer;
            const isSelected = selectedOption === oIdx;

            let optionStyle = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 text-slate-800';
            if (revealed) {
              if (isCorrect) {
                optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-400/20';
              } else if (isSelected) {
                optionStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-bold';
              } else {
                optionStyle = 'border-slate-200 opacity-60 text-slate-500';
              }
            }

            return (
              <button
                key={oIdx}
                disabled={revealed}
                onClick={() => handleSelectOption(oIdx)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                      revealed && isCorrect
                        ? 'bg-emerald-600 text-white'
                        : revealed && isSelected
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span className="text-sm">{opt}</span>
                </div>

                {revealed && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                {revealed && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Explanation Card */}
        {revealed && (
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-xs sm:text-sm text-blue-950 space-y-1.5 animate-in fade-in duration-200">
            <div className="flex items-center gap-1.5 font-bold text-blue-800">
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'hi' ? 'उत्तर एवं विस्तृत व्याख्या' : 'Official Explanation & Reference'}</span>
            </div>
            <p className="leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            disabled={currentIndex === 0}
            onClick={handlePrev}
            className="flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs sm:text-sm font-semibold disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs cursor-pointer active:scale-95 transition-all"
          >
            <span>{currentIndex === questions.length - 1 ? (lang === 'hi' ? 'पूर्ण करें' : 'Finish') : (lang === 'hi' ? 'अगला प्रश्न' : 'Next Question')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
