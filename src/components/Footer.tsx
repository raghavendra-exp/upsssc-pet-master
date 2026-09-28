import React from 'react';
import { ExternalLink, ShieldCheck, Heart, Award, BookOpen } from 'lucide-react';
import { Language } from '../types';
import currentExam from '../data/exams/pet/pet-current.json';

interface Props {
  lang: Language;
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<Props> = ({ lang, onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-xs mt-16 pt-12 pb-16 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Mandate */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-extrabold text-base">
              <Award className="w-5 h-5 text-amber-400" />
              <span>UPSSSC PET MASTER</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {lang === 'hi'
                ? 'उत्तर प्रदेश प्रारंभिक अर्हता परीक्षा (पीईटी) की पूर्ण तैयारी के लिए समर्पित निःशुल्क व पारदर्शी शिक्षा मंच।'
                : 'Dedicated comprehensive preparation ecosystem for UPSSSC Preliminary Eligibility Test.'}
            </p>
            <div className="flex items-center gap-2 pt-1 text-slate-400 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified with UPSSSC 2026 Official Gazette</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              {lang === 'hi' ? 'त्वरित लिंक' : 'Core Modules'}
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors cursor-pointer">
                  {lang === 'hi' ? 'पीईटी 2026 डैशबोर्ड' : 'PET 2026 Dashboard'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('syllabus')} className="hover:text-white transition-colors cursor-pointer">
                  {lang === 'hi' ? '15 विषय आधिकारिक पाठ्यक्रम' : 'Official Syllabus (15 Subjects)'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('books')} className="hover:text-white transition-colors cursor-pointer">
                  {lang === 'hi' ? 'अनुशंसित पुस्तकें (Recommended Books)' : 'Recommended Books & Mapping'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('mock')} className="hover:text-white transition-colors cursor-pointer">
                  {lang === 'hi' ? 'फुल मॉक टेस्ट (100 प्रश्न)' : 'Full Mock Simulation (100Q)'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('di')} className="hover:text-white transition-colors cursor-pointer">
                  {lang === 'hi' ? 'ग्राफ एवं तालिका व्याख्या (20 अंक)' : 'Data Interpretation (20 Marks)'}
                </button>
              </li>
            </ul>
          </div>

          {/* Official Authorities */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              {lang === 'hi' ? 'आधिकारिक स्रोत' : 'Authoritative Sources'}
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <a
                  href="http://upsssc.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>UPSSSC Official Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://ncert.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>NCERT / ePathshala Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://up.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>Government of Uttar Pradesh</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://pib.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>Press Information Bureau (PIB)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Transparency & Safety */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              {lang === 'hi' ? 'कॉपीराइट एवं नीति' : 'Copyright & Policy'}
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              {lang === 'hi'
                ? 'सभी प्रश्न, नोट्स और व्याख्याएं मौलिक हैं। यह मंच केवल वैध प्रकाशक व आधिकारिक पोर्टलों से जोड़ता है। कोई अनधिकृत पीडीएफ होस्ट नहीं की जाती है।'
                : '100% copyright-compliant. All notes and questions are original. Books link exclusively to legitimate publishers. No pirated materials hosted.'}
            </p>
            <div className="pt-2">
              <a
                href="https://github.com/raghavendra-exp/upsssc-pet-master"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="pt-6 border-t border-slate-800 text-center text-slate-500 text-[11px] space-y-1">
          <p>
            UPSSSC PET MASTER • Preliminary Eligibility Test Preparation Platform
          </p>
          <p>
            Last verified with official notification: <span className="text-slate-300 font-semibold">{currentExam.lastVerified}</span> • Zero to Master Architecture
          </p>
        </div>
      </div>
    </footer>
  );
};
