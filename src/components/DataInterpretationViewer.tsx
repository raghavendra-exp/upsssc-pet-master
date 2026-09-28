import React, { useState } from 'react';
import graphData from '../data/graph-data.json';
import tableData from '../data/table-data.json';
import { Language } from '../types';
import { recordQuestionAttempt } from '../utils/storage';
import { BarChart3, Table as TableIcon, CheckCircle2, XCircle, Sparkles, TrendingUp } from 'lucide-react';

interface Props {
  lang: Language;
}

export const DataInterpretationViewer: React.FC<Props> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'graph' | 'table'>('graph');
  const [selectedGraphIndex, setSelectedGraphIndex] = useState(0);
  const [selectedTableIndex, setSelectedTableIndex] = useState(0);

  const [answers, setAnswers] = useState<{ [qId: string]: number }>({});
  const [revealed, setRevealed] = useState<{ [qId: string]: boolean }>({});

  const currentGraph = graphData[selectedGraphIndex] || graphData[0];
  const currentTable = tableData[selectedTableIndex] || tableData[0];

  const handleSelectOption = (qId: string, oIdx: number, correctIdx: number) => {
    if (revealed[qId]) return;
    setAnswers((prev) => ({ ...prev, [qId]: oIdx }));
    setRevealed((prev) => ({ ...prev, [qId]: true }));
    recordQuestionAttempt(qId, oIdx, oIdx === correctIdx);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* DI Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 mb-2">
            PET Section 14 & 15 • 20 Marks Total (20% of Exam)
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {lang === 'hi' ? 'ग्राफ एवं तालिका व्याख्या व विश्लेषण' : 'Data Interpretation: Graph & Table Analysis'}
          </h2>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            {lang === 'hi'
              ? 'आधिकारिक पाठ्यक्रम के अनुसार: 2 ग्राफ (10 अंक) + 2 तालिकाएं (10 अंक) = 20 अनिवार्य प्रश्न'
              : 'Official UPSSSC syllabus: 2 Graphs (10 Marks) + 2 Tables (10 Marks) = 20 Questions'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-xl backdrop-blur-xs">
          <button
            onClick={() => setActiveTab('graph')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'graph' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-white hover:bg-white/10'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Graph (10M)</span>
          </button>
          <button
            onClick={() => setActiveTab('table')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'table' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-white hover:bg-white/10'
            }`}
          >
            <TableIcon className="w-4 h-4" />
            <span>Table (10M)</span>
          </button>
        </div>
      </div>

      {/* Set Selector */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {activeTab === 'graph' ? (
          graphData.map((g, idx) => (
            <button
              key={g.id}
              onClick={() => setSelectedGraphIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                idx === selectedGraphIndex
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Graph Set {idx + 1}: {g.type.toUpperCase()}
            </button>
          ))
        ) : (
          tableData.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setSelectedTableIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                idx === selectedTableIndex
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Table Set {idx + 1}
            </button>
          ))
        )}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual DI Display */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-base">
              {activeTab === 'graph' ? currentGraph.title : currentTable.title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Study the given data carefully to answer the 5 questions below.
            </p>
          </div>

          {/* Interactive SVG Renderer for Graph */}
          {activeTab === 'graph' && (
            <div className="space-y-4">
              <div className="relative w-full h-72 sm:h-80 bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col justify-between">
                {/* SVG Visual Chart */}
                <svg viewBox="0 0 500 240" className="w-full h-full overflow-visible">
                  {/* Grid Lines */}
                  {[0, 1, 2, 3, 4].map((gridLine) => {
                    const y = 200 - gridLine * 45;
                    return (
                      <g key={gridLine}>
                        <line x1="40" y1={y} x2="480" y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
                        <text x="32" y={y + 4} textAnchor="end" fontSize="10" fill="#94a3b8">
                          {gridLine * 100}
                        </text>
                      </g>
                    );
                  })}

                  {/* Axis */}
                  <line x1="40" y1="200" x2="480" y2="200" stroke="#64748b" strokeWidth="1.5" />

                  {/* Bar rendering */}
                  {currentGraph.type === 'bar' &&
                    currentGraph.categories.map((cat, cIdx) => {
                      const xCenter = 90 + cIdx * 85;
                      const val1 = currentGraph.series[0].data[cIdx];
                      const val2 = currentGraph.series[1].data[cIdx];
                      const h1 = (val1 / 450) * 180;
                      const h2 = (val2 / 450) * 180;

                      return (
                        <g key={cat}>
                          {/* Bar 1 */}
                          <rect
                            x={xCenter - 26}
                            y={200 - h1}
                            width="24"
                            height={h1}
                            rx="4"
                            fill="#f59e0b"
                            className="hover:opacity-80 transition-opacity"
                          />
                          <text x={xCenter - 14} y={195 - h1} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#78350f">
                            {val1}
                          </text>

                          {/* Bar 2 */}
                          <rect
                            x={xCenter + 2}
                            y={200 - h2}
                            width="24"
                            height={h2}
                            rx="4"
                            fill="#10b981"
                            className="hover:opacity-80 transition-opacity"
                          />
                          <text x={xCenter + 14} y={195 - h2} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#065f46">
                            {val2}
                          </text>

                          {/* X label */}
                          <text x={xCenter} y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">
                            {cat}
                          </text>
                        </g>
                      );
                    })}

                  {/* Line rendering */}
                  {currentGraph.type === 'line' && (
                    <>
                      {currentGraph.series.map((s, sIdx) => {
                        const points = s.data
                          .map((val, idx) => {
                            const x = 70 + idx * 75;
                            const y = 200 - (val / 120) * 180;
                            return `${x},${y}`;
                          })
                          .join(' ');

                        return (
                          <g key={s.name}>
                            <polyline
                              fill="none"
                              stroke={s.color}
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              points={points}
                            />
                            {s.data.map((val, idx) => {
                              const cx = 70 + idx * 75;
                              const cy = 200 - (val / 120) * 180;
                              return (
                                <g key={idx}>
                                  <circle cx={cx} cy={cy} r="4.5" fill="#ffffff" stroke={s.color} strokeWidth="2.5" />
                                  <text x={cx} y={cy - 8} textAnchor="middle" fontSize="9" fontWeight="bold" fill={s.color}>
                                    {val}
                                  </text>
                                  {sIdx === 0 && (
                                    <text x={cx} y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="#334155">
                                      {currentGraph.categories[idx]}
                                    </text>
                                  )}
                                </g>
                              );
                            })}
                          </g>
                        );
                      })}
                    </>
                  )}
                </svg>

                {/* Series Legend */}
                <div className="flex items-center justify-center gap-4 pt-2 border-t border-slate-200 text-xs font-semibold">
                  {currentGraph.series.map((s) => (
                    <div key={s.name} className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-slate-700">{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Table Viewer */}
          {activeTab === 'table' && (
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    {currentTable.columns.map((col, cIdx) => (
                      <th key={cIdx} className="py-2.5 px-3 whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentTable.rows.map((row: any, rIdx: number) => (
                    <tr key={rIdx} className="hover:bg-slate-50 font-medium">
                      <td className="py-2.5 px-3 font-bold text-slate-900 bg-slate-50/50">
                        {row.college || row.year}
                      </td>
                      <td className="py-2.5 px-3 text-slate-700">{row.arts || row.p}</td>
                      <td className="py-2.5 px-3 text-slate-700">{row.science || row.q}</td>
                      <td className="py-2.5 px-3 text-slate-700">{row.commerce || row.r}</td>
                      <td className="py-2.5 px-3 text-slate-700">{row.agri || row.s}</td>
                      <td className="py-2.5 px-3 font-extrabold text-blue-900 bg-blue-50/40">
                        {row.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Questions Pane */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-400">
              Calculation Questions (5)
            </h4>
          </div>

          <div className="space-y-4">
            {(activeTab === 'graph' ? currentGraph.questions : currentTable.questions).map((q: any, qIdx: number) => {
              const userAns = answers[q.id];
              const isRev = revealed[q.id];

              return (
                <div key={q.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                  <p className="font-bold text-slate-900 text-sm leading-snug">
                    <span className="text-blue-600 mr-1.5 font-mono">Q{qIdx + 1}.</span>
                    {q.question}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt: string, oIdx: number) => {
                      const isCorrect = oIdx === q.answer;
                      const isSelected = userAns === oIdx;

                      let btnStyle = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700';
                      if (isRev) {
                        if (isCorrect) btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                        else if (isSelected) btnStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-bold';
                        else btnStyle = 'border-slate-100 opacity-60 text-slate-400';
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isRev}
                          onClick={() => handleSelectOption(q.id, oIdx, q.answer)}
                          className={`p-2.5 rounded-xl border text-left font-medium flex items-center justify-between cursor-pointer transition-all ${btnStyle}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center font-bold text-[10px] shrink-0">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isRev && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                          {isRev && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {isRev && (
                    <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-950 space-y-1 animate-in fade-in duration-150">
                      <div className="flex items-center gap-1 font-bold text-blue-800">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>गणना एवं हल विधि (Step-by-Step):</span>
                      </div>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
