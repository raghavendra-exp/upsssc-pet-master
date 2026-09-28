import React, { useState } from 'react';
import questionsData from '../data/questions.json';
import currentExam from '../data/exams/pet/pet-current.json';
import { Language, QuestionItem } from '../types';
import { MockTestEngine } from '../components/MockTestEngine';
import {
  Timer,
  Award,
  AlertCircle,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface Props {
  lang: Language;
  onNavigate: (route: string) => void;
}

export const MockView: React.FC<Props> = ({ lang, onNavigate }) => {
  const [isTestActive, setIsTestActive] = useState(false);
  const [selectedMockSet, setSelectedMockSet] = useState<number>(1);

  // Generate 100 balanced questions from questionsData
  const mockQuestions: QuestionItem[] = [...questionsData]
    .slice(0, 100);

  if (isTestActive) {
    return (
      <div className="space-y-4">
        <MockTestEngine
          questions={mockQuestions}
          lang={lang}
          title={`UPSSSC PET 2026 Full Mock Test (Set #${selectedMockSet})`}
          isFullMock={true}
          onFinish={() => setIsTestActive(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Mock Test Hero Info */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-4">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950">
          Official UPSSSC PET 2026 Simulation
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          {lang === 'hi' ? '100-प्रश्नों का सम्पूर्ण मॉक टेस्ट' : 'Full-Length PET 100-Question Mock Test'}
        </h1>
        <p className="text-sm text-blue-200 max-w-2xl leading-relaxed">
          {lang === 'hi'
            ? 'आयोग के वास्तविक परीक्षा प्रारूप का सटीक सिमुलेशन: 100 प्रश्न, 120 मिनट की समय-सीमा, प्रश्न पैलेट, और -0.25 अंक की निगेटिव मार्किंग।'
            : 'Exact replica of the official exam pattern: 100 questions, 120 minutes countdown, question palette, and -0.25 negative marking.'}
        </p>

        {/* Exam Specifications */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-blue-800 text-xs">
          <div>
            <span className="text-blue-300 block">Total Questions</span>
            <span className="text-base font-extrabold text-white">100 MCQs</span>
          </div>
          <div>
            <span className="text-blue-300 block">Total Marks</span>
            <span className="text-base font-extrabold text-amber-300">100 Marks</span>
          </div>
          <div>
            <span className="text-blue-300 block">Time Allowed</span>
            <span className="text-base font-extrabold text-white">120 Minutes</span>
          </div>
          <div>
            <span className="text-blue-300 block">Negative Marking</span>
            <span className="text-base font-extrabold text-rose-300">-0.25 Marks</span>
          </div>
        </div>
      </div>

      {/* Test Instructions Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          <span>{lang === 'hi' ? 'महत्वपूर्ण परीक्षा निर्देश (Important Instructions)' : 'Candidate Guidelines'}</span>
        </h2>

        <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>प्रत्येक सही उत्तर के लिए +1.0 अंक प्रदान किया जाएगा।</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>प्रत्येक गलत उत्तर के लिए 0.25 (1/4) अंक काट लिए जाएंगे। बिना हल किए प्रश्नों पर कोई अंक नहीं काटा जाएगा।</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>आप प्रश्न पैलेट का उपयोग कर किसी भी प्रश्न पर तुरंत जा सकते हैं तथा 'Mark for Review' कर सकते हैं।</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>120 मिनट समाप्त होते ही टेस्ट स्वतः सबमिट हो जाएगा तथा विस्तृत स्कोरकार्ड प्रदर्शित होगा।</span>
          </li>
        </ul>

        {/* Start Button */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">Select Mock Set:</span>
            {[1, 2, 3].map((setNum) => (
              <button
                key={setNum}
                onClick={() => setSelectedMockSet(setNum)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedMockSet === setNum
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Set #{setNum}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsTestActive(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{lang === 'hi' ? 'टेस्ट प्रारम्भ करें (Start Test)' : 'Start 100Q Mock Test'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
