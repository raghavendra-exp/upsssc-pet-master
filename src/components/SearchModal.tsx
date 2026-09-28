import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Library, HelpCircle, FileText, MapPin, Zap } from 'lucide-react';
import { Language } from '../types';
import syllabusData from '../data/pet-syllabus.json';
import booksData from '../data/books.json';
import questionsData from '../data/questions.json';
import topicsData from '../data/topics.json';
import currentAffairsData from '../data/current-affairs.json';
import upGkData from '../data/up-gk.json';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
  lang: Language;
}

export const SearchModal: React.FC<Props> = ({ isOpen, onClose, onNavigate, lang }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onOpenModalFromParent();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  function onOpenModalFromParent() {
    // handled by parent
  }

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  // Search Results aggregation
  const matchedSubjects = q
    ? syllabusData.subjects.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.nameHi.includes(q) ||
          s.topics.some((t) => t.toLowerCase().includes(q))
      )
    : [];

  const matchedTopics = q
    ? topicsData.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.nameHi.includes(q) ||
          t.concept.toLowerCase().includes(q)
      )
    : [];

  const matchedBooks = q
    ? booksData.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.publisher.toLowerCase().includes(q) ||
          b.subject.toLowerCase().includes(q)
      )
    : [];

  const matchedQuestions = q
    ? questionsData
        .filter(
          (qu) =>
            qu.question.toLowerCase().includes(q) ||
            qu.questionHi?.includes(q) ||
            qu.topic.toLowerCase().includes(q)
        )
        .slice(0, 5)
    : [];

  const matchedCurrentAffairs = q
    ? currentAffairsData.filter(
        (ca) =>
          ca.headline.toLowerCase().includes(q) ||
          ca.headlineHi?.includes(q) ||
          ca.summary.toLowerCase().includes(q)
      )
    : [];

  const matchedUPGk = q
    ? upGkData.rivers
        .filter((r) => r.name.toLowerCase().includes(q))
        .concat(
          upGkData.nationalParksAndSanctuaries.filter((p) =>
            p.name.toLowerCase().includes(q)
          ) as any
        )
    : [];

  const totalResults =
    matchedSubjects.length +
    matchedTopics.length +
    matchedBooks.length +
    matchedQuestions.length +
    matchedCurrentAffairs.length +
    matchedUPGk.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input bar */}
        <div className="relative border-b border-slate-200 p-4 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === 'hi'
                ? 'विषय, पुस्तक, प्रश्न, इतिहास, संविधान, प्रतिशत, यूपी खोजें...'
                : 'Search subjects, books, questions, history, polity, arithmetic, UP GK...'
            }
            className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm sm:text-base outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!q && (
            <div className="py-8 text-center text-slate-400 space-y-2">
              <Search className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-sm font-medium">
                {lang === 'hi'
                  ? 'खोजने के लिए टाइप करें (अंग्रेजी व हिन्दी दोनों समर्थित)'
                  : 'Type to search across entire UPSSSC PET ecosystem'}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {['सिन्धु घाटी', 'Arihant', 'Panchayati Raj', 'Dudhwa', 'Sandhi', 'Percentage'].map(
                  (sugg) => (
                    <button
                      key={sugg}
                      onClick={() => setQuery(sugg)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 cursor-pointer"
                    >
                      {sugg}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {q && totalResults === 0 && (
            <div className="py-12 text-center text-slate-500">
              <p className="text-sm font-medium">
                {lang === 'hi'
                  ? `"${query}" के लिए कोई परिणाम नहीं मिला`
                  : `No results found for "${query}"`}
              </p>
            </div>
          )}

          {/* Subjects */}
          {matchedSubjects.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'पाठ्यक्रम विषय' : 'Syllabus Subjects'}</span>
              </div>
              {matchedSubjects.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    onNavigate(`subject/${sub.code}`);
                    onClose();
                  }}
                  className="w-full text-left p-3 rounded-xl hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <h4 className="font-semibold text-slate-900 group-hover:text-blue-700 text-sm">
                      {lang === 'hi' ? sub.nameHi : sub.name}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {sub.marks} Marks • {sub.questions} Questions
                    </p>
                  </div>
                  <span className="text-xs font-bold text-blue-600 bg-blue-100/60 px-2 py-0.5 rounded-md">
                    Open
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Topics */}
          {matchedTopics.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'अध्याय एवं नोट्स' : 'Topics & Notes'}</span>
              </div>
              {matchedTopics.map((top) => (
                <button
                  key={top.id}
                  onClick={() => {
                    onNavigate(`topic/${top.id}`);
                    onClose();
                  }}
                  className="w-full text-left p-3 rounded-xl hover:bg-slate-100 border border-slate-100 transition-colors group cursor-pointer"
                >
                  <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 text-sm">
                    {lang === 'hi' ? top.nameHi : top.name}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{top.concept}</p>
                </button>
              ))}
            </div>
          )}

          {/* Books */}
          {matchedBooks.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Library className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'अनुशंसित पुस्तकें' : 'Recommended Books'}</span>
              </div>
              {matchedBooks.map((bk) => (
                <button
                  key={bk.id}
                  onClick={() => {
                    onNavigate('books');
                    onClose();
                  }}
                  className="w-full text-left p-3 rounded-xl hover:bg-amber-50 border border-slate-100 hover:border-amber-200 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <h4 className="font-semibold text-slate-900 group-hover:text-amber-800 text-sm">
                      {bk.title}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {bk.author} • {bk.publisher} • {bk.price}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                    View
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Questions */}
          {matchedQuestions.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'प्रश्न बैंक' : 'Questions'}</span>
              </div>
              {matchedQuestions.map((qItem) => (
                <button
                  key={qItem.id}
                  onClick={() => {
                    onNavigate('practice');
                    onClose();
                  }}
                  className="w-full text-left p-3 rounded-xl hover:bg-slate-100 border border-slate-100 transition-colors cursor-pointer"
                >
                  <p className="text-xs font-semibold text-blue-600 mb-0.5">
                    {qItem.subject} • {qItem.id}
                  </p>
                  <p className="text-xs text-slate-800 font-medium line-clamp-1">
                    {lang === 'hi' && qItem.questionHi ? qItem.questionHi : qItem.question}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
