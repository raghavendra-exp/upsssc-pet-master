import React from 'react';
import syllabusData from '../data/pet-syllabus.json';
import topicsData from '../data/topics.json';
import booksData from '../data/books.json';
import pyqsData from '../data/pyqs.json';
import { Language } from '../types';
import {
  BookOpen,
  ArrowRight,
  Library,
  PenTool,
  History,
  Layers,
  Sparkles,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

interface Props {
  subjectCode: string;
  lang: Language;
  onNavigate: (route: string) => void;
}

export const SubjectDetailView: React.FC<Props> = ({ subjectCode, lang, onNavigate }) => {
  const subject = syllabusData.subjects.find((s) => s.code === subjectCode) || syllabusData.subjects[0];

  // Matched topics in topicsData
  const matchedTopics = topicsData.filter(
    (t) =>
      t.subject.toLowerCase().includes(subject.name.toLowerCase()) ||
      t.subjectId === subject.id ||
      subject.topics.some((st) => st.toLowerCase().includes(t.name.toLowerCase()))
  );

  // Matched books in booksData
  const matchedBooks = booksData.filter(
    (b) =>
      b.subject.toLowerCase().includes(subject.name.toLowerCase()) ||
      b.category === 'Complete Guide'
  );

  // Matched PYQs
  const matchedPyqs = pyqsData.filter(
    (p) => p.subject.toLowerCase() === subject.name.toLowerCase()
  );

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Subject Hero Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            {subject.category} • Official Section
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
            {subject.marks} Marks ({subject.questions} Questions)
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {lang === 'hi' ? subject.nameHi : subject.name}
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-medium mt-1">
            {lang === 'hi' ? subject.name : subject.nameHi}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          {lang === 'hi'
            ? `यूपीएसएसएससी पीईटी परीक्षा में ${subject.nameHi} से कुल ${subject.questions} प्रश्न (प्रत्येक 1 अंक) पूछे जाते हैं। प्रत्येक गलत उत्तर पर 0.25 अंक का नकारात्मक अंकन लागू है।`
            : `The official examination includes ${subject.questions} questions from ${subject.name} carrying 1 mark each with -0.25 negative marking.`}
        </p>

        {/* Quick Launch Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('practice')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs cursor-pointer transition-colors"
          >
            <PenTool className="w-4 h-4" />
            <span>Practice 50 Questions</span>
          </button>

          <button
            onClick={() => onNavigate('books')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs cursor-pointer transition-colors"
          >
            <Library className="w-4 h-4 text-slate-500" />
            <span>Recommended Books</span>
          </button>

          <button
            onClick={() => onNavigate('pyq')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-semibold text-xs cursor-pointer transition-colors"
          >
            <History className="w-4 h-4 text-amber-700" />
            <span>Shift PYQs</span>
          </button>
        </div>
      </div>

      {/* Topics Hierarchy */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" />
          <span>{lang === 'hi' ? 'पाठ्यक्रम अध्याय व संकल्पना नोट्स' : 'Official Topics & Conceptual Notes'}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subject.topics.map((tName, idx) => {
            const topicRecord = matchedTopics.find(
              (mt) => mt.name.toLowerCase() === tName.toLowerCase() || tName.toLowerCase().includes(mt.name.toLowerCase())
            );

            return (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-blue-300 hover:bg-blue-50/20 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Topic #{idx + 1}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm mt-0.5">{tName}</h3>
                  {topicRecord && (
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                      {topicRecord.concept}
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">NCERT Aligned</span>
                  <button
                    onClick={() => {
                      if (topicRecord) onNavigate(`topic/${topicRecord.id}`);
                      else onNavigate('practice');
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    <span>{topicRecord ? 'Read Concept' : 'Practice MCQs'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subject Specific Recommended Books */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
          <Library className="w-5 h-5 text-amber-600" />
          <span>{lang === 'hi' ? 'इस विषय के लिए अनुशंसित पुस्तकें' : 'Recommended Reference Books'}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matchedBooks.slice(0, 4).map((b) => (
            <div
              key={b.id}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-amber-300 transition-colors flex flex-col justify-between space-y-2 text-xs"
            >
              <div>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                  {b.category}
                </span>
                <h3 className="font-bold text-slate-900 text-sm mt-1">{b.title}</h3>
                <p className="text-slate-500 mt-0.5">{b.author} • {b.publisher}</p>
                <p className="text-slate-700 mt-2 font-medium">{b.bestFor}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="font-extrabold text-emerald-700">{b.price}</span>
                <a
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-bold"
                >
                  <span>Publisher Page</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
