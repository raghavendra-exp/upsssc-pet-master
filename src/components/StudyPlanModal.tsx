import React, { useState } from 'react';
import { X, Calendar, Clock, Target, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { Language } from '../types';
import studyPlansData from '../data/study-plans.json';
import syllabusData from '../data/pet-syllabus.json';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const StudyPlanModal: React.FC<Props> = ({ isOpen, onClose, lang }) => {
  const [dailyHours, setDailyHours] = useState<number>(4);
  const [currentLevel, setCurrentLevel] = useState<'Beginner' | 'Intermediate' | 'Revision'>('Intermediate');
  const [targetScore, setTargetScore] = useState<number>(85);
  const [weakSubjects, setWeakSubjects] = useState<string[]>(['Elementary Arithmetic', 'General Hindi']);
  const [generatedPlan, setGeneratedPlan] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleGenerate = () => {
    const totalWeeklyHours = dailyHours * 7;
    const plan = {
      dailyHours,
      currentLevel,
      targetScore,
      targetPercentile: targetScore >= 80 ? '99+' : targetScore >= 70 ? '95+' : '90+',
      weeklySchedule: [
        {
          day: 'Monday & Tuesday',
          focus: 'Core General Studies (History, Geography, Polity)',
          hours: `${dailyHours} Hours/day`,
          tasks: 'NCERT chapters + 30 Topic practice MCQs'
        },
        {
          day: 'Wednesday & Thursday',
          focus: 'Quantitative Aptitude & Data Interpretation (20 Marks)',
          hours: `${dailyHours} Hours/day`,
          tasks: 'Bar/Line graphs calculation sets + Elementary Arithmetic equations'
        },
        {
          day: 'Friday',
          focus: 'Languages & Reasoning (Hindi, English, Logic)',
          hours: `${dailyHours} Hours/day`,
          tasks: 'Sandhi, Vilom, Unseen Passages + Clock/Calendar reasoning'
        },
        {
          day: 'Saturday',
          focus: 'Current Affairs & Uttar Pradesh Special (UP GK)',
          hours: `${dailyHours} Hours/day`,
          tasks: 'Monthly CA notes + UP interactive map districts & Dudhwa NP'
        },
        {
          day: 'Sunday',
          focus: 'Full Mock Test Simulation & Error Notebook Revision',
          hours: `${dailyHours} Hours/day`,
          tasks: '100-Question Timed Test (120 Mins) + Analyze mistakes'
        }
      ]
    };
    setGeneratedPlan(plan);
    try {
      localStorage.setItem('upsssc_pet_custom_plan', JSON.stringify(plan));
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>{lang === 'hi' ? 'वैयक्तिक पीईटी अध्ययन योजना जनरेटर' : 'Personalized PET Study Plan Generator'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === 'hi'
                ? 'अपने दैनिक अध्ययन के घण्टे व लक्ष्य दर्ज कर अनुकूलित शेड्यूल बनाएं'
                : 'Enter your available study hours and targets to generate an actionable timetable'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!generatedPlan ? (
            <div className="space-y-5">
              {/* Form Input 1: Daily Hours */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>{lang === 'hi' ? 'दैनिक अध्ययन के घण्टे (Daily Study Hours):' : 'Daily Study Hours:'}</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[2, 4, 6, 8].map((hr) => (
                    <button
                      key={hr}
                      onClick={() => setDailyHours(hr)}
                      className={`py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                        dailyHours === hr
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {hr} Hours/day
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Input 2: Preparation Level */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {lang === 'hi' ? 'वर्तमान तैयारी स्तर (Current Level):' : 'Current Preparation Level:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Beginner', 'Intermediate', 'Revision'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setCurrentLevel(lvl)}
                      className={`py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                        currentLevel === lvl
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Input 3: Target Score */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'hi' ? 'लक्ष्य अंक (Target Raw Score out of 100):' : 'Target Raw Score (out of 100):'}</span>
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="60"
                    max="95"
                    step="5"
                    value={targetScore}
                    onChange={(e) => setTargetScore(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <span className="font-extrabold text-blue-700 bg-blue-50 px-3 py-1 rounded-xl text-sm shrink-0 border border-blue-200">
                    {targetScore}+ Marks
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Targeting 80+ guarantees securing a 99+ percentile in UPSSSC PET.
                </p>
              </div>

              <button
                onClick={handleGenerate}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer active:scale-98"
              >
                {lang === 'hi' ? 'शेड्यूल तैयार करें' : 'Generate Actionable Schedule'}
              </button>
            </div>
          ) : (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Summary Card */}
              <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-100 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-blue-950 text-sm">
                    Personalized Strategy ({dailyHours} hrs/day • Target: {targetScore}+ Marks)
                  </h4>
                  <p className="text-xs text-blue-800">
                    Expected Percentile: <span className="font-bold">{generatedPlan.targetPercentile} Percentile</span>
                  </p>
                </div>
                <button
                  onClick={() => setGeneratedPlan(null)}
                  className="text-xs text-blue-700 underline font-semibold hover:text-blue-900"
                >
                  Adjust Inputs
                </button>
              </div>

              {/* Weekly Timetable */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-400">
                  Weekly Study Cadence
                </h4>
                <div className="space-y-2.5">
                  {generatedPlan.weeklySchedule.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 text-sm">{item.day}</span>
                        <p className="font-medium text-blue-700">{item.focus}</p>
                        <p className="text-slate-500">{item.tasks}</p>
                      </div>
                      <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md shrink-0 self-start sm:self-center">
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Roadmap Levels preview */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <p className="font-bold text-slate-900">Zero-to-Mastery 10-Level Roadmap:</p>
                <div className="flex flex-wrap gap-1.5">
                  {studyPlansData.roadmapLevels.map((lvl) => (
                    <span
                      key={lvl.level}
                      className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 text-[11px] font-medium"
                    >
                      L{lvl.level}: {lvl.title.split(':')[1] || lvl.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
