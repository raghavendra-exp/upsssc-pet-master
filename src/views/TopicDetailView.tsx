import React, { useState } from 'react';
import topicsData from '../data/topics.json';
import questionsData from '../data/questions.json';
import { Language } from '../types';
import { addTopicToRevision } from '../utils/storage';
import {
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  PenTool,
  Bookmark,
  RotateCcw,
  Check,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { PracticeEngine } from '../components/PracticeEngine';

interface Props {
  topicId: string;
  lang: Language;
  onNavigate: (route: string) => void;
}

export const TopicDetailView: React.FC<Props> = ({ topicId, lang, onNavigate }) => {
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [revisionAdded, setRevisionAdded] = useState(false);

  const topic = topicsData.find((t) => t.id === topicId) || topicsData[0];

  // Matched practice questions
  const topicQuestions = questionsData.filter(
    (q) =>
      q.topic.toLowerCase().includes(topic.name.toLowerCase()) ||
      q.subject.toLowerCase() === topic.subject.toLowerCase()
  ).slice(0, 20);

  const handleAddRevision = () => {
    addTopicToRevision(topic.id, 1);
    setRevisionAdded(true);
    setTimeout(() => setRevisionAdded(false), 3000);
  };

  if (isQuizMode) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setIsQuizMode(false)}
          className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer"
        >
          ← Return to Concept Notes
        </button>
        <PracticeEngine
          questions={topicQuestions}
          lang={lang}
          title={`${topic.name} — Topic Practice Quiz`}
          onFinish={() => setIsQuizMode(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      {/* Topic Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            {topic.subject} • {topic.category}
          </span>
          <button
            onClick={handleAddRevision}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              revisionAdded
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
            }`}
          >
            {revisionAdded ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <RotateCcw className="w-3.5 h-3.5" />}
            <span>{revisionAdded ? 'Added to Today\'s Revision!' : 'Add to Spaced Revision'}</span>
          </button>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {lang === 'hi' ? topic.nameHi : topic.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            {lang === 'hi' ? topic.name : topic.nameHi}
          </p>
        </div>

        {/* Quick Launch Practice */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsQuizMode(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs cursor-pointer active:scale-95 transition-all"
          >
            <PenTool className="w-4 h-4" />
            <span>Practice 20 Topic MCQs</span>
          </button>

          <button
            onClick={() => onNavigate('flashcards')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs cursor-pointer transition-colors"
          >
            <Layers className="w-4 h-4 text-purple-600" />
            <span>Topic Flashcards</span>
          </button>
        </div>
      </div>

      {/* 1. Original Concept Notes */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
        <h2 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span>1. {lang === 'hi' ? 'संकल्पना व सैद्धांतिक नोट्स (Original Concept)' : 'Original Concept & Foundation'}</span>
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed text-justify font-sans">
          {topic.concept}
        </p>
      </div>

      {/* 2. Important Facts */}
      {topic.importantFacts && topic.importantFacts.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <h2 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>2. {lang === 'hi' ? 'परीक्षा उपयोगी महत्वपूर्ण तथ्य (High-Yield Facts)' : 'High-Yield Exam Facts'}</span>
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            {topic.importantFacts.map((fact, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 3. Formulas, Shortcuts & Common Traps (for Math/Reasoning) */}
      {(topic.formulaShortcut || topic.tipsAndTricks) && (
        <div className="bg-amber-50/70 rounded-2xl border border-amber-200/80 p-6 shadow-xs space-y-3">
          <h2 className="font-extrabold text-base text-amber-950 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            <span>3. {lang === 'hi' ? 'शॉर्टकट ट्रिक्स एवं स्मरण विधि' : 'Shortcuts & Memory Techniques'}</span>
          </h2>

          {topic.formulaShortcut && (
            <div className="p-3 bg-white rounded-xl border border-amber-200 text-xs sm:text-sm text-amber-900 font-mono font-semibold">
              Formula: {topic.formulaShortcut}
            </div>
          )}

          {topic.tipsAndTricks && (
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              {topic.tipsAndTricks}
            </p>
          )}

          {topic.commonMistake && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span><strong>Common Exam Mistake:</strong> {topic.commonMistake}</span>
            </div>
          )}
        </div>
      )}

      {/* 4. UP Connection (where applicable) */}
      {topic.upConnection && (
        <div className="bg-emerald-50/70 rounded-2xl border border-emerald-200/80 p-6 shadow-xs space-y-2">
          <h2 className="font-extrabold text-base text-emerald-950 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span>4. {lang === 'hi' ? 'उत्तर प्रदेश विशेष सन्दर्भ (UP Connection)' : 'Uttar Pradesh Special Connection'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
            {topic.upConnection}
          </p>
        </div>
      )}

      {/* 5. NCERT & Recommended Book Reference Mapping */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2 text-xs">
          <span className="font-bold uppercase tracking-wider text-slate-400">NCERT Reference</span>
          <h4 className="font-bold text-slate-900 text-sm">Official NCERT Alignment</h4>
          <p className="text-slate-600">{topic.ncertRef}</p>
          <a
            href="https://ncert.nic.in/textbook.php"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 font-bold hover:underline pt-1"
          >
            <span>Read on ePathshala</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2 text-xs">
          <span className="font-bold uppercase tracking-wider text-slate-400">Book Reference</span>
          <h4 className="font-bold text-slate-900 text-sm">Recommended Books</h4>
          <p className="text-slate-600">{topic.bookRef}</p>
          <button
            onClick={() => onNavigate('books')}
            className="inline-flex items-center gap-1 text-amber-700 font-bold hover:underline pt-1 cursor-pointer"
          >
            <span>View in Books Database</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
