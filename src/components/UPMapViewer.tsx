import React, { useState } from 'react';
import upGkData from '../data/up-gk.json';
import { Language } from '../types';
import { MapPin, Navigation, Compass, Info, Shield, Layers } from 'lucide-react';

interface Props {
  lang: Language;
}

export const UPMapViewer: React.FC<Props> = ({ lang }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'capital' | 'cultural' | 'historical' | 'industrial' | 'park'>('all');
  const [selectedPoint, setSelectedPoint] = useState<any>(upGkData.interactiveMapPoints[0]);

  const filteredPoints =
    activeFilter === 'all'
      ? upGkData.interactiveMapPoints
      : upGkData.interactiveMapPoints.filter((pt) => pt.type === activeFilter);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 mb-2">
            UP Special Geography & Map Mastery
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {lang === 'hi' ? 'उत्तर प्रदेश: संवादात्मक मानचित्र (Interactive Map)' : 'Uttar Pradesh Interactive Geography Map'}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200 mt-1">
            75 Districts • 18 Divisions • Major Rivers • Dudhwa National Park • Historical Landmarks
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white/10 p-1.5 rounded-xl backdrop-blur-xs">
          {[
            { id: 'all', label: 'All' },
            { id: 'cultural', label: 'Cultural' },
            { id: 'historical', label: 'Historical' },
            { id: 'industrial', label: 'Industrial' },
            { id: 'park', label: 'Parks' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeFilter === f.id
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive SVG Map Container */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>Map of Uttar Pradesh (Geographic Plot)</span>
            </span>
            <span className="text-xs text-slate-500 font-medium">Click on any hub to inspect</span>
          </div>

          <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-emerald-50/60 via-teal-50/30 to-blue-50/50 rounded-2xl border border-emerald-100 overflow-hidden flex items-center justify-center p-4">
            {/* Outline representation of UP State boundary */}
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              {/* Generalized UP Polygon Boundary */}
              <polygon
                points="18,20 28,12 36,15 50,28 65,30 82,38 90,52 82,68 85,82 72,85 58,68 45,72 32,78 28,68 22,50 15,35"
                fill="#ffffff"
                stroke="#059669"
                strokeWidth="1.2"
                strokeDasharray="none"
                className="transition-colors"
              />

              {/* Ganga River Flow representation */}
              <path
                d="M 22,25 Q 40,42 55,56 T 82,65"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="opacity-80"
              />

              {/* Yamuna River Flow representation */}
              <path
                d="M 18,22 Q 25,45 42,58 T 62,66"
                fill="none"
                stroke="#0284c7"
                strokeWidth="2"
                strokeLinecap="round"
                className="opacity-75"
              />

              {/* Interactive Points */}
              {filteredPoints.map((pt) => {
                const isSelected = selectedPoint?.id === pt.id;
                let dotColor = '#3b82f6';
                if (pt.type === 'capital') dotColor = '#dc2626';
                if (pt.type === 'cultural') dotColor = '#d97706';
                if (pt.type === 'park') dotColor = '#059669';
                if (pt.type === 'industrial') dotColor = '#7c3aed';

                return (
                  <g
                    key={pt.id}
                    className="cursor-pointer group"
                    onClick={() => setSelectedPoint(pt)}
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? 4 : 2.5}
                      fill={dotColor}
                      stroke="#ffffff"
                      strokeWidth={isSelected ? 1.5 : 0.8}
                      className="group-hover:scale-125 transition-transform"
                    />
                    {isSelected && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="6"
                        fill="none"
                        stroke={dotColor}
                        strokeWidth="0.8"
                        className="animate-ping"
                      />
                    )}
                    <text
                      x={pt.x}
                      y={pt.y - 3.5}
                      textAnchor="middle"
                      fontSize="3.2"
                      fontWeight="bold"
                      fill="#0f172a"
                      className="select-none pointer-events-none drop-shadow-xs"
                    >
                      {pt.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pt-1">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-600" /> Capital</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-600" /> Cultural</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> National Park</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-600" /> Industrial</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-1 bg-sky-400 rounded" />
              <span>Ganga & Yamuna Systems</span>
            </div>
          </div>
        </div>

        {/* Selected Point Inspector */}
        <div className="lg:col-span-4 space-y-4">
          {selectedPoint ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{selectedPoint.name}</h3>
                  <span className="text-[11px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {selectedPoint.type}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 space-y-2">
                <p className="font-semibold text-slate-900 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-blue-600" />
                  <span>Exam Significance / महत्वपूर्ण तथ्य:</span>
                </p>
                <p className="leading-relaxed">{selectedPoint.fact}</p>
              </div>

              {/* State Profile Quick Metrics */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Total Districts:</span>
                  <span className="font-bold text-slate-900">75 Districts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Total Divisions:</span>
                  <span className="font-bold text-slate-900">18 Divisions</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">High Court:</span>
                  <span className="font-bold text-slate-900">Prayagraj (Allahabad)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">State Animal:</span>
                  <span className="font-bold text-slate-900">Barasingha (Swamp Deer)</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center text-slate-400 text-xs">
              Select a location on the map to view detailed facts.
            </div>
          )}

          {/* Dudhwa & Tiger Reserves Card */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 text-xs space-y-2">
            <h4 className="font-bold text-emerald-950 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-700" />
              <span>UP Tiger Reserves & Sanctuaries</span>
            </h4>
            <ul className="space-y-1 text-emerald-900">
              <li>• <strong>Dudhwa National Park:</strong> Lakhimpur Kheri</li>
              <li>• <strong>Pilibhit Tiger Reserve:</strong> TX2 Awardee</li>
              <li>• <strong>Ranipur Tiger Reserve:</strong> Chitrakoot</li>
              <li>• <strong>Amanagarh:</strong> Bijnor buffer zone</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
