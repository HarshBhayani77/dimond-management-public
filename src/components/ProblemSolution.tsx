'use client';

import React from 'react';
import { AlertTriangle, CheckCheck, X, Check } from 'lucide-react';

export const ProblemSolution: React.FC = () => {
  return (
    <section className="py-16 bg-vault-900/60 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Industry Reality Check</h2>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-2">Why Spreadsheets Fail Diamond Houses</h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            The diamond trade has unique commercial realities that general accounting packages or Excel workbooks cannot handle safely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* The Legacy Pain */}
          <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-rose-900/40 border border-rose-700/60 flex items-center justify-center text-rose-400">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h4 className="text-base font-bold text-rose-300">Traditional Spreadsheet Chaos</h4>
            </div>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>Floating-Point Math Errors:</strong> Excel roundoffs cause phantom gains and losses across carats, rates, and dollar conversions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>Desynchronized Branch Records:</strong> Surat factory logs cutting weight on one sheet, while Mumbai BDB trades on another, leading to mismatched inventory.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>Unprovable Rough Vaults:</strong> No mathematical audit showing opening rough minus cutting Kat, sales, and rejections equals vault stock.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>Partner Loan Confusion:</strong> Personal partner drawings (Upad) and deposits (Jama) mixed with routine diamond business cash flow.</span>
              </li>
            </ul>
          </div>

          {/* The Shreenathji Solution */}
          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-800/40">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-900/40 border border-emerald-600/60 flex items-center justify-center text-emerald-400">
                <CheckCheck className="w-4 h-4" />
              </div>
              <h4 className="text-base font-bold text-emerald-300">The Shreenathji Unified ERP</h4>
            </div>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Deterministic Precision:</strong> High-precision numerical arithmetic guaranteed to exact decimal places with zero rounding drift.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Synchronized Multi-Branch Ledgers:</strong> Real-time integration between Surat manufacturing lots and Mumbai BDB sales registers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Mathematical Rough Reconciliation:</strong> Continuous mathematical proof verifying every single carat across all factory vaults.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Dedicated Partner & Broker Ledgers:</strong> Dedicated partner capital accounts (ઉપાડ-જમા) and automated Dalali brokerage liabilities.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
