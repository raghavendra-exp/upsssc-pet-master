import React, { useState } from 'react';
import booksData from '../data/books.json';
import { Language, BookItem } from '../types';
import { BookCard } from '../components/BookCard';
import { BookComparisonModal } from '../components/BookComparisonModal';
import {
  Library,
  Search,
  Filter,
  Layers,
  ShieldCheck,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

interface Props {
  lang: Language;
  onNavigate: (route: string) => void;
}

export const BooksView: React.FC<Props> = ({ lang, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBooksForCompare, setSelectedBooksForCompare] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const categories = ['All', 'Complete Guide', 'Foundation', 'Concept & Practice', 'PYQ & Practice', 'PYQ & Analysis', 'Government Standard / Foundation'];

  const filteredBooks = booksData.filter((b) => {
    const matchesCat = selectedCategory === 'All' || b.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.publisher.toLowerCase().includes(q) ||
      b.subject.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const handleCompareToggle = (bookId: string) => {
    setSelectedBooksForCompare((prev) => {
      if (prev.includes(bookId)) {
        return prev.filter((id) => id !== bookId);
      }
      if (prev.length >= 4) {
        alert(lang === 'hi' ? 'आप अधिकतम 4 पुस्तकों की तुलना कर सकते हैं।' : 'You can compare a maximum of 4 books simultaneously.');
        return prev;
      }
      return [...prev, bookId];
    });
  };

  const comparedBooksList = booksData.filter((b) => selectedBooksForCompare.includes(b.id));

  // Arihant 2026 Guide explicitly highlighted
  const arihantFeatured = booksData.find((b) => b.id === 'BOOK-ARIHANT-PET-2026');

  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto">
      {/* Books Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>100% Legal & Authentic Publisher Book Links</span>
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Strictly No Pirated PDFs • Direct Retailer & Official Links
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {lang === 'hi' ? 'उत्तर प्रदेश पीईटी 2026 अनुशंसित पुस्तकें' : 'Recommended Books for UPSSSC PET 2026'}
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed mt-1">
            {lang === 'hi'
              ? 'आयोग के नवीनतम पाठ्यक्रम के अनुरूप संपूर्ण गाइड, सामान्य ज्ञान, तर्कशक्ति, गणित एवं पूर्व वर्षों के सॉल्व्ड पेपर्स का सत्यापित संग्रह।'
              : 'Curated and verified book database including Arihant 2026 Complete Guide, Lucent GK, Drishti Quick Book, and authentic chapterwise PYQs.'}
          </p>
        </div>

        {/* Search & Compare Controls */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'hi' ? 'शीर्षक, प्रकाशक या विषय खोजें...' : 'Search title, author, publisher, subject...'}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500"
            />
          </div>

          {selectedBooksForCompare.length > 0 && (
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer animate-in fade-in"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>
                {lang === 'hi'
                  ? `तुलना करें (${selectedBooksForCompare.length})`
                  : `Compare Selected (${selectedBooksForCompare.length})`}
              </span>
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
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

      {/* Prominent Arihant UPSSSC PET 2026 Guide Spotlight Card */}
      {arihantFeatured && (
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-700/60 relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-400 text-slate-950">
                ⭐ TOP SPOTLIGHT: ALL-IN-ONE COMPLETE GUIDE
              </span>
              <span className="text-xs font-bold text-emerald-300 bg-white/10 px-3 py-1 rounded-lg">
                Price: {arihantFeatured.price} • {arihantFeatured.pages} Pages
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-3xl font-black text-white">
                {arihantFeatured.title} — {arihantFeatured.publisher}
              </h2>
              <p className="text-xs sm:text-sm text-blue-200 font-medium">
                {arihantFeatured.edition} • Chapterwise Notes & 2,000+ Solved Practice MCQs
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-2">
              <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Complete 15-Subject Syllabus</span>
              </div>
              <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>2,000+ Practice MCQs with Solutions</span>
              </div>
              <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>PYQs from 2021–2025 Solved</span>
              </div>
              <div className="bg-white/10 p-3 rounded-xl backdrop-blur-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>3 Full Practice Model Sets</span>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href={arihantFeatured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>{lang === 'hi' ? 'प्रकाशक पृष्ठ देखें / खरीदें' : 'View Publisher Page / Buy Book'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => onNavigate('syllabus')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
              >
                <Layers className="w-4 h-4 text-blue-300" />
                <span>Map Book to Syllabus</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Book Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-lg text-slate-900">
            {lang === 'hi' ? 'सभी अनुशंसित पुस्तकें एवं अध्ययन सामग्री' : 'All Verified PET Reference Resources'} ({filteredBooks.length})
          </h2>
          <span className="text-xs text-slate-500">
            Select books to compare side-by-side
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              lang={lang}
              onCompareToggle={handleCompareToggle}
              isComparing={selectedBooksForCompare.includes(book.id)}
            />
          ))}
        </div>
      </div>

      {/* Book Comparison Modal */}
      <BookComparisonModal
        books={comparedBooksList}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        lang={lang}
      />
    </div>
  );
};
