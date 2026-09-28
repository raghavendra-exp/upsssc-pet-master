import React, { useState } from 'react';
import flashcardsData from '../data/flashcards.json';
import { Language, FlashcardItem } from '../types';
import { RotateCw, CheckCircle, HelpCircle, ChevronRight, ChevronLeft, Layers, Sparkles } from 'lucide-react';

interface Props {
  lang: Language;
}

export const FlashcardViewer: React.FC<Props> = ({ lang }) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);
  const [unknownCount, setUnknownCount] = useState(0);

  const subjects = ['All', ...new Set(flashcardsData.map((f) => f.subject))];

  const filteredCards =
    selectedSubject === 'All'
      ? flashcardsData
      : flashcardsData.filter((f) => f.subject === selectedSubject);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1);
    }
  };

  const markKnown = () => {
    setKnownCount((prev) => prev + 1);
    handleNext();
  };

  const markUnknown = () => {
    setUnknownCount((prev) => prev + 1);
    handleNext();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
          <Layers className="w-3.5 h-3.5" />
          <span>{lang === 'hi' ? 'स्मृति एवं त्वरित पुनरीक्षण' : 'Spaced Repetition & Quick Recall'}</span>
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900">
          {lang === 'hi' ? 'रैपिड पीईटी फ्लैशकार्ड्स' : 'Rapid PET Revision Flashcards'}
        </h2>
        <p className="text-xs text-slate-500">
          {lang === 'hi'
            ? 'कार्ड पर क्लिक करके उत्तर देखें • ज्ञात (Known) अथवा अज्ञात (Unknown) मार्क करें'
            : 'Click card to flip and reveal answer • Mark Known or Unknown to track mastery'}
        </p>
      </div>

      {/* Subject Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar justify-start sm:justify-center pb-1">
        {subjects.map((sub) => (
          <button
            key={sub}
            onClick={() => {
              setSelectedSubject(sub);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              sub === selectedSubject
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* 3D Flip Card */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full min-h-[260px] sm:min-h-[300px] bg-white rounded-3xl border-2 border-slate-200 hover:border-purple-300 p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer select-none relative overflow-hidden"
      >
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md">
            {currentCard.subject} • {currentCard.topic}
          </span>
          <span className="font-mono font-semibold text-slate-500">
            {currentIndex + 1} / {filteredCards.length}
          </span>
        </div>

        <div className="py-6 text-center space-y-3">
          <span className="text-[11px] font-extrabold tracking-wider uppercase text-slate-400">
            {isFlipped ? (lang === 'hi' ? 'उत्तर / व्याख्या' : 'Answer / Fact') : (lang === 'hi' ? 'प्रश्न / तथ्य' : 'Question / Concept')}
          </span>
          <p
            className={`font-semibold leading-relaxed transition-all ${
              isFlipped
                ? 'text-lg sm:text-xl text-purple-950 font-bold'
                : 'text-base sm:text-lg text-slate-900'
            }`}
          >
            {isFlipped ? currentCard.back : currentCard.front}
          </p>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium">
          <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
          <span>{lang === 'hi' ? 'पलटने के लिए कार्ड पर क्लिक करें' : 'Click anywhere on card to flip'}</span>
        </div>
      </div>

      {/* Review Actions */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={handlePrev}
          className="p-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={markUnknown}
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{lang === 'hi' ? 'पुनः देखें (Unknown)' : 'Unknown'}</span>
          </button>

          <button
            onClick={markKnown}
            className="flex items-center gap-1.5 px-5 sm:px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
          >
            <CheckCircle className="w-4 h-4" />
            <span>{lang === 'hi' ? 'याद है (Known)' : 'Known'}</span>
          </button>
        </div>

        <button
          onClick={handleNext}
          className="p-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Flashcard Stats */}
      <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-2 font-medium">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span>Mastered: {knownCount}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <span>Needs Review: {unknownCount}</span>
        </span>
      </div>
    </div>
  );
};
