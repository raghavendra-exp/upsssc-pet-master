import React, { useState } from 'react';
import oneLinersData from '../data/one-liners.json';
import { Language } from '../types';
import { FileCheck, Filter, Search, Sparkles, CheckCircle2, Bookmark } from 'lucide-react';

interface Props {
  lang: Language;
}

export const OneLinersView: React.FC<Props> = ({ lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'UP GK', 'History', 'National Movement', 'Polity', 'Geography', 'Economy', 'Science', 'General Awareness'];

  const filteredFacts = oneLinersData.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      item.fact.toLowerCase().includes(q) ||
      item.factHi?.includes(q) ||
      item.category.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
          <FileCheck className="w-3.5 h-3.5" />
          <span>High-Yield Rapid Memory Facts</span>
        </span>

        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {lang === 'hi' ? 'वन-लाइनर सामान्य ज्ञान संग्रह' : 'High-Yield One-Liner GK Facts'}
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed mt-1">
            {lang === 'hi'
              ? 'इतिहास, भूगोल, संविधान, अर्थव्यवस्था, विज्ञान एवं उत्तर प्रदेश विशेष के सर्वाधिक पूछे जाने वाले तथ्यात्मक बिन्दु।'
              : 'Direct fact-based rapid review points covering all 15 subjects and Uttar Pradesh special GK.'}
          </p>
        </div>

        {/* Search Input */}
        <div className="pt-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'hi' ? 'तथ्य या कीवर्ड खोजें (उदा: नरोरा, बुद्ध, 1857)...' : 'Search facts (e.g. Narora, Buddha, 1857)...'}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                cat === selectedCategory
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Facts List */}
      <div className="space-y-3">
        {filteredFacts.map((ol, idx) => (
          <div
            key={ol.id}
            className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 shadow-2xs transition-colors flex items-start gap-3.5"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              {idx + 1}
            </div>

            <div className="space-y-1 flex-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50/70 px-2 py-0.5 rounded">
                {ol.category}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed pt-0.5">
                {lang === 'hi' && ol.factHi ? ol.factHi : ol.fact}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
