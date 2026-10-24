'use client';

import React from 'react';
import { Download, LayoutGrid, Calculator, FileText, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onOpenInquiry: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenInquiry }) => {
  return (
    <section id="overview" className="relative pt-32 pb-20 overflow-hidden border-b border-slate-800/80">
      {/* Ambient background diamond glow */}
      <div className="absolute top-1/4 left-1/4 w-[34rem] h-[34rem] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-vault-700/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Operational Hubs Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-vault-900 border border-slate-700/80 text-xs font-medium text-slate-300 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-emerald-400 font-semibold">Surat Katargam GIDC</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300">Mumbai Bharat Diamond Bourse (BDB)</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          The Operating System for Modern Diamond Enterprises
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-sm sm:text-base lg:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          A unified, vault-to-bourse relational platform replacing spreadsheet chaos with{' '}
          <strong className="text-emerald-400 font-semibold">3-decimal carat precision (0.000 cts)</strong>,{' '}
          automated rough reconciliation (રફ મેળ), Kapan yield tracking, and multi-branch double-entry financial accounting.
        </p>

        {/* CTA Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#preview"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-700/30 transition-all"
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Explore Live Simulated ERP</span>
          </a>
          <a
            href="#kapan-sim"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-vault-850 hover:bg-vault-800 text-slate-200 border border-slate-700 transition-all"
          >
            <Calculator className="w-4 h-4 text-emerald-400" />
            <span>Kapan Yield Simulator</span>
          </a>
          <a
            href="/Shreenathji_Diamond_Management_System_Overview.docx"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span>Download Spec (.DOCX)</span>
          </a>
        </div>

        {/* Enterprise Key Metrics Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-xl bg-vault-900/80 border border-slate-800 border-l-2 border-l-emerald-500 text-left">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Precision Architecture</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">0.000 cts</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Strict thousandth carat accuracy</div>
          </div>
          <div className="p-4 rounded-xl bg-vault-900/80 border border-slate-800 border-l-2 border-l-teal-500 text-left">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Database Blueprint</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">34 Tables</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Across 9 operational domains</div>
          </div>
          <div className="p-4 rounded-xl bg-vault-900/80 border border-slate-800 border-l-2 border-l-amber-500 text-left">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Rough Reconciliation</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">100% Proof</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Zero unaccounted stone loss</div>
          </div>
          <div className="p-4 rounded-xl bg-vault-900/80 border border-slate-800 border-l-2 border-l-sky-500 text-left">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Multi-Branch Sync</div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">2 Centers</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Surat Factory & Mumbai BDB</div>
          </div>
        </div>
      </div>
    </section>
  );
};
