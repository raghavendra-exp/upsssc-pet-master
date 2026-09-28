import React, { useState } from 'react';
import { BookItem, Language } from '../types';
import { ExternalLink, CheckCircle2, Star, BookOpen, Layers, ShoppingBag, ShieldCheck } from 'lucide-react';

interface Props {
  book: BookItem;
  lang: Language;
  onCompareToggle?: (bookId: string) => void;
  isComparing?: boolean;
}

export const BookCard: React.FC<Props> = ({
  book,
  lang,
  onCompareToggle,
  isComparing = false
}) => {
  const [showMapping, setShowMapping] = useState(false);

  return (
    <div
      className={`relative flex flex-col bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md ${
        book.isFeatured
          ? 'border-blue-300 ring-2 ring-blue-500/10'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Featured Ribbon */}
      {book.isFeatured && (
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-[11px] font-bold px-4 py-1 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            {lang === 'hi' ? 'विशेष अनुशंसित पुस्तक (Top Recommendation)' : 'Top Recommended Resource'}
          </span>
          <span className="text-[10px] bg-white/20 px-2 py-0.2 rounded-full">
            {book.category}
          </span>
        </div>
      )}

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        {/* Header Title & Author */}
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 mb-1.5">
                {book.subject}
              </span>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-snug">
                {book.title}
              </h3>
              {book.titleHi && (
                <p className="text-xs text-slate-500 font-medium">
                  {book.titleHi}
                </p>
              )}
            </div>

            {/* Price Pill */}
            <div className="text-right shrink-0">
              <span className="text-sm font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60">
                {book.price}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 font-medium">
            <span className="text-slate-400">By </span>
            <span className="font-semibold text-slate-800">{book.author}</span>
            <span className="text-slate-300"> • </span>
            <span className="text-slate-500">{book.publisher} ({book.edition})</span>
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="ml-1 font-bold text-slate-900">{book.rating}</span>
            </div>
            <span>•</span>
            <span>{book.ratingCount.toLocaleString()} verified reader reviews</span>
            <span>•</span>
            <span>{book.pages} Pages</span>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="space-y-1.5 bg-slate-50/80 p-3.5 rounded-xl border border-slate-100 text-xs">
          <p className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>{lang === 'hi' ? 'प्रमुख विशेषताएं' : 'Key Features'}</span>
          </p>
          <ul className="space-y-1 text-slate-700">
            {book.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-tight">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Best For Tagline */}
        <div className="text-xs">
          <span className="text-slate-500 font-medium">{lang === 'hi' ? 'उपयोगिता: ' : 'Best For: '}</span>
          <span className="font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
            {book.bestFor}
          </span>
        </div>

        {/* Syllabus Mapping Dropdown */}
        {showMapping && (
          <div className="mt-2 p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs space-y-2 animate-in fade-in duration-150">
            <p className="font-bold text-amber-900 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-amber-700" />
              <span>{lang === 'hi' ? 'पीईटी पाठ्यक्रम मैपिंग' : 'PET Syllabus Chapter Mapping'}</span>
            </p>
            <ul className="space-y-1 text-slate-700 max-h-40 overflow-y-auto pr-1">
              {book.syllabusMapping.map((mapLine, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>{mapLine}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions Footer */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          {/* Map toggle & Compare */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMapping(!showMapping)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-blue-700 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
            >
              {showMapping ? (lang === 'hi' ? 'मैपिंग छिपाएं' : 'Hide Mapping') : (lang === 'hi' ? 'पाठ्यक्रम मैपिंग' : 'Map to Syllabus')}
            </button>

            {onCompareToggle && (
              <button
                onClick={() => onCompareToggle(book.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                  isComparing
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'text-slate-600 hover:text-slate-900 bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                {isComparing ? (lang === 'hi' ? '✓ चयनित' : '✓ Selected') : (lang === 'hi' ? '+ तुलना करें' : '+ Compare')}
              </button>
            )}
          </div>

          {/* Legal Buy / View Publisher Link */}
          <a
            href={book.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs hover:shadow-blue-600/20 active:scale-95 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{lang === 'hi' ? 'प्रकाशक पृष्ठ / खरीदें' : 'View Publisher Page'}</span>
            <ExternalLink className="w-3 h-3 text-blue-200" />
          </a>
        </div>
      </div>
    </div>
  );
};
