import React, { useState } from 'react';
import syllabusData from '../data/pet-syllabus.json';
import { Language } from '../types';
import {
  BookOpen,
  ArrowRight,
  Filter,
  CheckCircle2,
  Sparkles,
  Layers,
  PenTool,
  Bookmark
} from 'lucide-react';

interface Props {
  lang: Language;
  onNavigate: (route: string) => void;
}

export const SyllabusView: React.FC<Props> = ({ lang, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...new Set(syllabusData.subjects.map((s) => s.category))];

  const filteredSubjects =
    selectedCategory === 'All'
      ? syllabusData.subjects
      : syllabusData.subjects.filter((s) => s.category === selectedCategory);

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Official Commission Syllabus (100 Marks)</span>
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {lang === 'hi' ? 'उत्तर प्रदेश पीईटी 15-विषय आधिकारिक पाठ्यक्रम' : 'UPSSSC PET Official 15-Subject Syllabus'}
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          {lang === 'hi'
            ? 'आयोग के नवीनतम राजपत्र के अनुसार प्रत्येक विषय का प्रश्न भार, विस्तृत उपविषय, एनसीईआरटी स्तर एवं अध्ययन रोडमैप।'
            : 'Explore full topic breakdowns, official marks weightage, NCERT standard levels, and practice modules for all 15 syllabus heads.'}
        </p>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                cat === selectedCategory
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSubjects.map((sub, idx) => (
          <div
            key={sub.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Section #{idx + 1} • {sub.category}
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-blue-50 text-blue-700 border border-blue-100">
                  {sub.marks} Marks ({sub.questions} Qs)
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-lg text-slate-900">
                  {lang === 'hi' ? sub.nameHi : sub.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {lang === 'hi' ? sub.name : sub.nameHi}
                </p>
              </div>

              {/* Subtopics snippet */}
              <div className="space-y-1.5 pt-1 text-xs">
                <p className="font-semibold text-slate-700 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-blue-600" />
                  <span>{lang === 'hi' ? 'प्रमुख उप-विषय (Key Topics):' : 'Key Syllabus Topics:'}</span>
                </p>
                <ul className="space-y-1 text-slate-600 pl-1">
                  {sub.topics.slice(0, 4).map((top, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-1.5 leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                      <span className="line-clamp-1">{top}</span>
                    </li>
                  ))}
                  {sub.topics.length > 4 && (
                    <li className="text-[11px] font-bold text-blue-600 pl-3">
                      +{sub.topics.length - 4} more topics...
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => onNavigate(`subject/${sub.code}`)}
                className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>{lang === 'hi' ? 'विषय नोट्स देखें' : 'View Notes & Topics'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigate('practice')}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 cursor-pointer transition-colors"
                title="Practice questions for this subject"
              >
                <PenTool className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
