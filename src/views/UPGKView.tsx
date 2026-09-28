import React, { useState } from 'react';
import upGkData from '../data/up-gk.json';
import { Language } from '../types';
import { UPMapViewer } from '../components/UPMapViewer';
import {
  MapPin,
  Compass,
  Layers,
  Sparkles,
  Shield,
  Award,
  Navigation,
  CheckCircle2
} from 'lucide-react';

interface Props {
  lang: Language;
}

export const UPGKView: React.FC<Props> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'map' | 'divisions' | 'rivers' | 'odop'>('map');

  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800">
          <MapPin className="w-3.5 h-3.5" />
          <span>Uttar Pradesh Special (UP GK)</span>
        </span>

        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {lang === 'hi' ? 'उत्तर प्रदेश सामान्य ज्ञान एवं भूगोल' : 'Uttar Pradesh Special Comprehensive GK'}
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed mt-1">
            {lang === 'hi'
              ? '75 जिले, 18 मण्डल, नदियां, दुधवा राष्ट्रीय उद्यान, वन्यजीव अभयारण्य, एक जिला एक उत्पाद (ODOP) एवं औद्योगिक एक्सप्रेसवे।'
              : 'Detailed state geography: 75 districts, 18 administrative divisions, major rivers, Dudhwa National Park, and ODOP.'}
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2 pt-1 overflow-x-auto no-scrollbar">
          {[
            { id: 'map', label: 'Interactive Map' },
            { id: 'divisions', label: '18 Divisions & Districts' },
            { id: 'rivers', label: 'Rivers & Waterways' },
            { id: 'odop', label: 'ODOP Products Directory' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === t.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map Tab */}
      {activeTab === 'map' && <UPMapViewer lang={lang} />}

      {/* Divisions Tab */}
      {activeTab === 'divisions' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <h2 className="font-extrabold text-lg text-slate-900">
            {lang === 'hi' ? 'उत्तर प्रदेश के 18 प्रशासनिक मण्डल एवं उनके जिले' : '18 Administrative Divisions of Uttar Pradesh'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upGkData.divisions.map((div, idx) => (
              <div key={div.name} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">
                    {idx + 1}. {div.name} Division
                  </h3>
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-600">
                    HQ: {div.headquarters}
                  </span>
                </div>
                <div className="text-xs text-slate-600 pt-1">
                  <strong className="text-slate-700 block mb-1">Districts ({div.districts.length}):</strong>
                  <div className="flex flex-wrap gap-1">
                    {div.districts.map((d) => (
                      <span key={d} className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-[11px]">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rivers Tab */}
      {activeTab === 'rivers' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <h2 className="font-extrabold text-lg text-slate-900">
            {lang === 'hi' ? 'उत्तर प्रदेश की प्रमुख नदियां एवं अपवाह तंत्र' : 'Major River Systems in Uttar Pradesh'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upGkData.rivers.map((r) => (
              <div key={r.name} className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-extrabold text-base text-blue-900">{r.name} River</h3>
                  {r.lengthInUP && (
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {r.lengthInUP}
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-700 space-y-1.5">
                  {r.origin && (
                    <p><strong>Origin:</strong> {r.origin}</p>
                  )}
                  {r.entryDistrict && (
                    <p><strong>Entry District in UP:</strong> {r.entryDistrict}</p>
                  )}
                  {r.exitDistrict && (
                    <p><strong>Exit District from UP:</strong> {r.exitDistrict}</p>
                  )}
                  {r.confluence && (
                    <p><strong>Confluence (संगम):</strong> {r.confluence}</p>
                  )}
                  {r.tributaries && (
                    <p><strong>Tributaries:</strong> {r.tributaries}</p>
                  )}
                  {r.specialFact && (
                    <p className="p-2 bg-amber-50 rounded-lg text-amber-900 border border-amber-100 font-medium">
                      ★ {r.specialFact}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ODOP Tab */}
      {activeTab === 'odop' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <h2 className="font-extrabold text-lg text-slate-900">
            {lang === 'hi' ? 'एक जिला एक उत्पाद (ODOP) सूची' : 'One District One Product (ODOP) Directory'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {upGkData.odopProducts.map((p) => (
              <div key={p.district} className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1 text-xs">
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                  {p.district}
                </span>
                <p className="font-extrabold text-slate-900 text-sm mt-1">{p.product}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
