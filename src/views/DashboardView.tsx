import React from 'react';
import {
  Calendar,
  Clock,
  Award,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Briefcase,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Language } from '../types';
import currentExam from '../data/exams/pet/pet-current.json';
import pet2026 from '../data/exams/pet/pet-2026.json';
import syllabusData from '../data/pet-syllabus.json';
import notificationsData from '../data/notifications.json';

interface Props {
  lang: Language;
  onNavigate: (route: string) => void;
}

export const DashboardView: React.FC<Props> = ({ lang, onNavigate }) => {
  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950">
            {currentExam.activeVersion} Official Cycle
          </span>
          <span className="text-xs text-blue-200">
            {lang === 'hi' ? `सत्यापित तिथि: ${currentExam.lastVerified}` : `Verified: ${currentExam.lastVerified}`}
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {lang === 'hi' ? 'उत्तर प्रदेश पीईटी 2026 आधिकारिक डैशबोर्ड' : 'UPSSSC PET 2026 Examination Dashboard'}
          </h1>
          <p className="text-sm text-blue-200 max-w-3xl leading-relaxed">
            {lang === 'hi'
              ? 'उत्तर प्रदेश शासन के अधीनस्थ सेवा चयन आयोग (UPSSSC) द्वारा आयोजित प्रारंभिक अर्हता परीक्षा (PET) 2026 की विस्तृत सूचना, पाठ्यक्रम, परीक्षा प्रारूप व तिथियां।'
              : 'Comprehensive dashboard of UPSSSC Preliminary Eligibility Test 2026: dates, eligibility, 15-subject pattern, linked Group C vacancies, and official notices.'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-blue-800/80">
          <div>
            <p className="text-xs text-blue-300">Exam Dates</p>
            <p className="text-sm sm:text-base font-extrabold text-amber-300">{currentExam.examDates}</p>
          </div>
          <div>
            <p className="text-xs text-blue-300">Total Marks</p>
            <p className="text-sm sm:text-base font-extrabold text-white">100 Marks (100 Qs)</p>
          </div>
          <div>
            <p className="text-xs text-blue-300">Negative Marking</p>
            <p className="text-sm sm:text-base font-extrabold text-rose-300">-0.25 (1/4th)</p>
          </div>
          <div>
            <p className="text-xs text-blue-300">Duration</p>
            <p className="text-sm sm:text-base font-extrabold text-white">120 Minutes (2 Hrs)</p>
          </div>
        </div>
      </div>

      {/* Linked Group C Posts Eligible via PET */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-600" />
          <h2 className="font-extrabold text-lg text-slate-900">
            {lang === 'hi' ? 'पीईटी स्कोरकार्ड से पात्र प्रमुख पद (Group C Posts)' : 'Posts Recruited via UPSSSC PET Scorecard'}
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          {lang === 'hi'
            ? 'पीईटी स्कोरकार्ड परिणाम घोषणा की तिथि से 1 वर्ष के लिए वैध रहता है तथा निम्नलिखित सभी मुख्य परीक्षाओं में आवेदन हेतु अनिवार्य है:'
            : 'PET Scorecard is valid for 1 year from result date and is mandatory for applying to these UP Group C Mains exams:'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {pet2026.postEligibility.map((post, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center gap-3 text-xs font-semibold text-slate-800"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                {idx + 1}
              </div>
              <span>{post}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 15 Subjects Weightage Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h2 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              <span>{lang === 'hi' ? '15 विषयों का आधिकारिक अंक वितरण' : 'Official 15-Subject Weightage Table'}</span>
            </h2>
            <p className="text-xs text-slate-500">
              Total 100 Questions • 100 Marks • NCERT Secondary / Senior Secondary Standard
            </p>
          </div>
          <button
            onClick={() => onNavigate('syllabus')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            <span>View Syllabus</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[11px]">
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">Subject Name (विषय)</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3 text-center">Questions</th>
                <th className="py-2.5 px-3 text-center">Marks</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {syllabusData.subjects.map((sub, idx) => (
                <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-400">{idx + 1}</td>
                  <td className="py-3 px-3">
                    <p className="font-bold text-slate-900">{lang === 'hi' ? sub.nameHi : sub.name}</p>
                    <p className="text-[11px] text-slate-500">{lang === 'hi' ? sub.name : sub.nameHi}</p>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                      {sub.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-bold text-slate-800">{sub.questions}</td>
                  <td className="py-3 px-3 text-center font-bold text-blue-700 bg-blue-50/50">{sub.marks}</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onNavigate(`subject/${sub.code}`)}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs cursor-pointer transition-colors"
                    >
                      Study Notes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Latest Official Notices */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-600" />
          <span>{lang === 'hi' ? 'आयोग के नवीनतम नोटिस एवं अपडेट्स' : 'Commission Notices & Updates'}</span>
        </h2>

        <div className="space-y-3">
          {notificationsData.map((notif) => (
            <div
              key={notif.id}
              className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 bg-slate-50/60 transition-colors space-y-2 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                  {notif.category} • {notif.date}
                </span>
                <a
                  href={notif.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-slate-600 hover:text-blue-700"
                >
                  <span>{notif.officialSource}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{notif.title}</h3>
              <p className="text-slate-600 leading-relaxed">{notif.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
