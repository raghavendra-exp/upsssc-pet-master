import React from 'react';
import { X, ExternalLink, Check, Star } from 'lucide-react';
import { BookItem, Language } from '../types';

interface Props {
  books: BookItem[];
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const BookComparisonModal: React.FC<Props> = ({ books, isOpen, onClose, lang }) => {
  if (!isOpen || books.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-extrabold text-lg text-slate-900">
              {lang === 'hi' ? 'पुस्तकों की विस्तृत तुलना' : 'Comprehensive Book Comparison'}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'hi'
                ? `चयनित ${books.length} पुस्तकों की पाठ्यक्रम, अभ्यास व विशेषताओं की पारदर्शी तुलना`
                : `Comparing ${books.length} selected books across coverage, practice questions, and syllabus depth`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="flex-1 overflow-x-auto p-4 sm:p-6">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-3 px-4 text-xs font-bold uppercase text-slate-400 w-36">
                  {lang === 'hi' ? 'मानक (Criteria)' : 'Metric'}
                </th>
                {books.map((b) => (
                  <th key={b.id} className="py-3 px-4 font-bold text-slate-900 text-sm">
                    {b.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-500">Publisher</td>
                {books.map((b) => (
                  <td key={b.id} className="py-3 px-4 font-medium text-slate-800">
                    {b.publisher} ({b.edition})
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-500">Subject / Scope</td>
                {books.map((b) => (
                  <td key={b.id} className="py-3 px-4 font-medium text-blue-900 bg-blue-50/50">
                    {b.subject}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-500">Category</td>
                {books.map((b) => (
                  <td key={b.id} className="py-3 px-4 font-medium text-slate-700">
                    {b.category}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-500">Level</td>
                {books.map((b) => (
                  <td key={b.id} className="py-3 px-4 text-slate-700">
                    {b.level}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-500">Price & Pages</td>
                {books.map((b) => (
                  <td key={b.id} className="py-3 px-4 font-bold text-emerald-800">
                    {b.price} • {b.pages} Pages
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-500">Best For</td>
                {books.map((b) => (
                  <td key={b.id} className="py-3 px-4 text-slate-800 font-medium">
                    {b.bestFor}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-500">Key Strengths</td>
                {books.map((b) => (
                  <td key={b.id} className="py-3 px-4">
                    <ul className="space-y-1">
                      {b.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="flex items-start gap-1 text-slate-600">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-500">Official Link</td>
                {books.map((b) => (
                  <td key={b.id} className="py-3 px-4">
                    <a
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-bold underline"
                    >
                      <span>Publisher Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
