import React, { useState, useEffect } from 'react';
import { QuestionItem, Language } from '../types';
import currentExam from '../data/exams/pet/pet-current.json';
import { recordQuestionAttempt, recordMockScore } from '../utils/storage';
import {
  Timer,
  CheckCircle2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Flag,
  AlertTriangle,
  RotateCcw,
  Award,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  questions: QuestionItem[];
  lang: Language;
  onFinish?: () => void;
  title?: string;
  isFullMock?: boolean;
}

export const MockTestEngine: React.FC<Props> = ({
  questions,
  lang,
  onFinish,
  title,
  isFullMock = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [index: number]: number }>({});
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));
  const [timeLeft, setTimeLeft] = useState(
    isFullMock ? currentExam.durationMinutes * 60 : questions.length * 72
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPalette, setShowPalette] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (optIndex: number) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [currentIndex]: optIndex }));
  };

  const handleToggleReview = () => {
    setMarkedForReview((prev) => {
      const next = new Set(prev);
      if (next.has(currentIndex)) next.delete(currentIndex);
      else next.add(currentIndex);
      return next;
    });
  };

  const handleNavigateQuestion = (idx: number) => {
    if (idx < 0 || idx >= questions.length) return;
    setCurrentIndex(idx);
    setVisited((prev) => new Set(prev).add(idx));
  };

  const handleSubmitTest = () => {
    setIsSubmitted(true);

    // Calculate score
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;

    questions.forEach((q, idx) => {
      const sel = answers[idx];
      if (sel !== undefined) {
        const isRight = sel === q.answer;
        if (isRight) correct++;
        else wrong++;
        recordQuestionAttempt(q.id, sel, isRight);
      } else {
        unattempted++;
      }
    });

    const netScore = Math.max(0, correct * 1 - wrong * currentExam.negativeMarking);
    const accuracy = correct + wrong > 0 ? (correct / (correct + wrong)) * 100 : 0;
    const timeSpent = (isFullMock ? currentExam.durationMinutes * 60 : questions.length * 72) - timeLeft;

    recordMockScore(netScore, questions.length, accuracy, timeSpent);

    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // If test is submitted, show comprehensive score card & analysis
  if (isSubmitted) {
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;
    const subjectStats: { [sub: string]: { correct: number; wrong: number; total: number } } = {};

    questions.forEach((q, idx) => {
      if (!subjectStats[q.subject]) {
        subjectStats[q.subject] = { correct: 0, wrong: 0, total: 0 };
      }
      subjectStats[q.subject].total++;

      const sel = answers[idx];
      if (sel !== undefined) {
        if (sel === q.answer) {
          correct++;
          subjectStats[q.subject].correct++;
        } else {
          wrong++;
          subjectStats[q.subject].wrong++;
        }
      } else {
        unattempted++;
      }
    });

    const negativePenalty = wrong * currentExam.negativeMarking;
    const netScore = Math.max(0, correct - negativePenalty);
    const accuracy = correct + wrong > 0 ? ((correct / (correct + wrong)) * 100).toFixed(1) : '0';
    const percentileEstimate =
      netScore >= 80 ? '99.2+' : netScore >= 70 ? '96.5' : netScore >= 60 ? '91.0' : netScore >= 50 ? '82.0' : '65.0';

    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200 pb-16">
        {/* Scorecard Hero */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-4">
          <Award className="w-16 h-16 mx-auto text-amber-400" />
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {lang === 'hi' ? 'परीक्षा परिणाम व स्कोरकार्ड' : 'Mock Test Performance Scorecard'}
          </h2>
          <p className="text-sm text-blue-200">
            {title || (lang === 'hi' ? 'यूपीएसएसएससी पीईटी फुल मॉक टेस्ट' : 'UPSSSC PET Full Simulation')}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4">
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-xs">
              <p className="text-xs text-blue-200 uppercase font-bold">Net Marks</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-300">
                {netScore.toFixed(2)}
                <span className="text-xs text-white/60"> / {questions.length}</span>
              </p>
              <p className="text-[11px] text-white/70">After -0.25 penalty</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-xs">
              <p className="text-xs text-blue-200 uppercase font-bold">Accuracy</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{accuracy}%</p>
              <p className="text-[11px] text-white/70">{correct} Correct of {correct + wrong}</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-xs">
              <p className="text-xs text-blue-200 uppercase font-bold">Est. Percentile</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-sky-300">{percentileEstimate}%ile</p>
              <p className="text-[11px] text-white/70">Normalized estimate</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-xs">
              <p className="text-xs text-blue-200 uppercase font-bold">Incorrect</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-rose-400">-{negativePenalty.toFixed(2)}</p>
              <p className="text-[11px] text-white/70">{wrong} wrong answers</p>
            </div>
          </div>
        </div>

        {/* Subject Breakdown */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <span>{lang === 'hi' ? 'विषयवार प्रदर्शन विश्लेषण' : 'Subject-wise Performance Breakdown'}</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[11px]">
                  <th className="py-2.5 px-3">Subject</th>
                  <th className="py-2.5 px-3">Total</th>
                  <th className="py-2.5 px-3">Correct</th>
                  <th className="py-2.5 px-3">Wrong</th>
                  <th className="py-2.5 px-3">Accuracy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Object.entries(subjectStats).map(([sub, stat]) => {
                  const acc =
                    stat.correct + stat.wrong > 0
                      ? ((stat.correct / (stat.correct + stat.wrong)) * 100).toFixed(0)
                      : '0';
                  return (
                    <tr key={sub} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-semibold text-slate-800">{sub}</td>
                      <td className="py-2.5 px-3 text-slate-600">{stat.total}</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-600">+{stat.correct}</td>
                      <td className="py-2.5 px-3 font-bold text-rose-600">-{stat.wrong}</td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded font-bold text-xs ${
                            Number(acc) >= 75
                              ? 'bg-emerald-100 text-emerald-800'
                              : Number(acc) >= 50
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {acc}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Solutions Review */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
            {lang === 'hi' ? 'प्रश्नों के विस्तृत समाधान एवं व्याख्या' : 'Detailed Question Solutions & Explanations'}
          </h3>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const userAns = answers[idx];
              const isCorrect = userAns === q.answer;
              const isUnattempted = userAns === undefined;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border text-sm space-y-2 ${
                    isUnattempted
                      ? 'border-slate-200 bg-slate-50/50'
                      : isCorrect
                      ? 'border-emerald-200 bg-emerald-50/30'
                      : 'border-rose-200 bg-rose-50/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500">
                      Q{idx + 1} • {q.subject}
                    </span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                        isUnattempted
                          ? 'bg-slate-200 text-slate-700'
                          : isCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isUnattempted
                        ? 'Unattempted'
                        : isCorrect
                        ? 'Correct (+1.0)'
                        : 'Incorrect (-0.25)'}
                    </span>
                  </div>

                  <p className="font-semibold text-slate-900">
                    {lang === 'hi' && q.questionHi ? q.questionHi : q.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    {q.options.map((opt, oIdx) => {
                      const isOptionCorrect = oIdx === q.answer;
                      const isOptionSelected = oIdx === userAns;
                      return (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-lg border font-medium ${
                            isOptionCorrect
                              ? 'border-emerald-500 bg-emerald-100/70 text-emerald-950 font-bold'
                              : isOptionSelected
                              ? 'border-rose-500 bg-rose-100/70 text-rose-950'
                              : 'border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          <span className="mr-1.5 font-bold">
                            {String.fromCharCode(65 + oIdx)}.
                          </span>
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-lg text-xs text-blue-900 space-y-1 mt-2">
                    <p className="font-bold">व्याख्या (Explanation):</p>
                    <p>{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Finish CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => onFinish && onFinish()}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md cursor-pointer transition-colors"
          >
            {lang === 'hi' ? 'डैशबोर्ड पर वापस जाएं' : 'Return to Dashboard'}
          </button>
        </div>
      </div>
    );
  }

  // Active Test Simulation Mode
  return (
    <div className="max-w-5xl mx-auto space-y-4 pb-20">
      {/* Test Top Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-4">
        <div>
          <h2 className="font-extrabold text-base sm:text-lg text-slate-900">
            {title || (lang === 'hi' ? 'यूपीएसएसएससी पीईटी लाइव मॉक टेस्ट' : 'UPSSSC PET Live Mock Simulation')}
          </h2>
          <p className="text-xs text-slate-500">
            {lang === 'hi'
              ? `प्रश्न ${currentIndex + 1} / ${questions.length} • निगेटिव मार्किंग: -0.25 अंक`
              : `Question ${currentIndex + 1} of ${questions.length} • Negative Marking: -0.25`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Countdown Clock */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-sm sm:text-base font-extrabold ${
              timeLeft < 300
                ? 'bg-rose-100 text-rose-700 border border-rose-300 animate-pulse'
                : 'bg-blue-50 text-blue-800 border border-blue-200'
            }`}
          >
            <Timer className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          {/* Toggle Question Palette button */}
          <button
            onClick={() => setShowPalette(!showPalette)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 cursor-pointer"
          >
            {showPalette ? 'Hide Palette' : 'Palette'}
          </button>

          {/* Submit Test Button */}
          <button
            onClick={() => {
              if (window.confirm(lang === 'hi' ? 'क्या आप निश्चित रूप से टेस्ट सबमिट करना चाहते हैं?' : 'Are you sure you want to submit the test?')) {
                handleSubmitTest();
              }
            }}
            className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
          >
            {lang === 'hi' ? 'सबमिट करें' : 'Submit'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Main Question Box */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-sm space-y-5">
            {/* Subject and Action ribbon */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs text-slate-500">
              <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                {currentQ.subject} • {currentQ.topic}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleReview}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold text-xs transition-colors cursor-pointer ${
                    markedForReview.has(currentIndex)
                      ? 'bg-purple-100 text-purple-700 border border-purple-300'
                      : 'hover:bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{markedForReview.has(currentIndex) ? 'Marked' : 'Mark for Review'}</span>
                </button>
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">
                Question {currentIndex + 1}
              </span>
              <p className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
                {lang === 'hi' && currentQ.questionHi ? currentQ.questionHi : currentQ.question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = answers[currentIndex] === oIdx;
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 text-blue-950 font-bold ring-2 ring-blue-500/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="text-sm">{opt}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                disabled={currentIndex === 0}
                onClick={() => handleNavigateQuestion(currentIndex - 1)}
                className="flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs sm:text-sm font-semibold disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-2">
                {answers[currentIndex] !== undefined && (
                  <button
                    onClick={() => {
                      const copy = { ...answers };
                      delete copy[currentIndex];
                      setAnswers(copy);
                    }}
                    className="px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                  >
                    Clear Response
                  </button>
                )}

                <button
                  disabled={currentIndex === questions.length - 1}
                  onClick={() => handleNavigateQuestion(currentIndex + 1)}
                  className="flex items-center gap-1 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Question Palette Sidebar */}
        <div className={`lg:block ${showPalette ? 'block' : 'hidden'}`}>
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-4">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-400">
              Question Palette ({questions.length})
            </h3>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-purple-500" />
                <span>Marked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-200 border border-slate-300" />
                <span>Unvisited</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span>Skipped</span>
              </div>
            </div>

            {/* Palette Grid */}
            <div className="grid grid-cols-5 gap-1.5 max-h-72 overflow-y-auto pr-1">
              {questions.map((_, qIdx) => {
                const isAnswered = answers[qIdx] !== undefined;
                const isMarked = markedForReview.has(qIdx);
                const isCurrent = qIdx === currentIndex;
                const isVis = visited.has(qIdx);

                let btnStyle = 'bg-slate-100 text-slate-600 border border-slate-200';
                if (isCurrent) {
                  btnStyle = 'ring-2 ring-blue-600 font-bold bg-blue-600 text-white';
                } else if (isMarked) {
                  btnStyle = 'bg-purple-600 text-white font-bold';
                } else if (isAnswered) {
                  btnStyle = 'bg-emerald-500 text-white font-bold';
                } else if (isVis) {
                  btnStyle = 'bg-amber-100 text-amber-900 border border-amber-300';
                }

                return (
                  <button
                    key={qIdx}
                    onClick={() => handleNavigateQuestion(qIdx)}
                    className={`h-8 rounded-lg text-xs transition-transform active:scale-95 cursor-pointer ${btnStyle}`}
                  >
                    {qIdx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
