'use client';

import React, { useState, useMemo } from 'react';
import { DollarSign, FileSpreadsheet, Building2, Percent, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface TradeScenario {
  label: string;
  carats: number;
  rapRateUSD: number;
  lessPercent: number;
  dalaliPercent: number;
  vatavPercent: number;
  termDays: number;
}

const PRESET_TRADES: TradeScenario[] = [
  {
    label: 'BDB Mumbai Single Stone Lot (VVS2 / F)',
    carats: 1.25,
    rapRateUSD: 5200,
    lessPercent: 28.5,
    dalaliPercent: 1.0,
    vatavPercent: 1.5,
    termDays: 30,
  },
  {
    label: 'Surat Commercial Parcel (SI1-SI2 / G-H)',
    carats: 48.60,
    rapRateUSD: 850,
    lessPercent: 34.0,
    dalaliPercent: 0.5,
    vatavPercent: 0.0,
    termDays: 60,
  },
  {
    label: 'Direct Export Parcel (Princess Cut Antwerp)',
    carats: 112.40,
    rapRateUSD: 680,
    lessPercent: 26.0,
    dalaliPercent: 1.0,
    vatavPercent: 2.0,
    termDays: 15,
  },
];

export default function TradePricingEngine({ onOpenDemoModal }: { onOpenDemoModal?: () => void }) {
  const [carats, setCarats] = useState<number>(PRESET_TRADES[0].carats);
  const [rapRateUSD, setRapRateUSD] = useState<number>(PRESET_TRADES[0].rapRateUSD);
  const [lessPercent, setLessPercent] = useState<number>(PRESET_TRADES[0].lessPercent);
  const [dalaliPercent, setDalaliPercent] = useState<number>(PRESET_TRADES[0].dalaliPercent);
  const [vatavPercent, setVatavPercent] = useState<number>(PRESET_TRADES[0].vatavPercent);
  const [dollarRate, setDollarRate] = useState<number>(86.5);
  const [termDays, setTermDays] = useState<number>(PRESET_TRADES[0].termDays);
  const [activeScenario, setActiveScenario] = useState<number>(0);

  const applyScenario = (idx: number) => {
    setActiveScenario(idx);
    const s = PRESET_TRADES[idx];
    setCarats(s.carats);
    setRapRateUSD(s.rapRateUSD);
    setLessPercent(s.lessPercent);
    setDalaliPercent(s.dalaliPercent);
    setVatavPercent(s.vatavPercent);
    setTermDays(s.termDays);
  };

  const tradeResults = useMemo(() => {
    // 1. Gross Rapaport Value
    const grossUSD = carats * rapRateUSD;
    const grossINR = grossUSD * dollarRate;

    // 2. Net Rate after 'Less %'
    const discountedRateUSD = rapRateUSD * (1 - lessPercent / 100);
    const tradeValueUSD = carats * discountedRateUSD;
    const tradeValueINR = tradeValueUSD * dollarRate;

    // 3. Dalali (Brokerage)
    const dalaliINR = tradeValueINR * (dalaliPercent / 100);
    const dalaliUSD = dalaliINR / dollarRate;

    // 4. Vatav (Cash discount if settled)
    const vatavINR = tradeValueINR * (vatavPercent / 100);

    // 5. Net Settlement Amounts
    const netSellerReceivableINR = tradeValueINR - dalaliINR - vatavINR;
    const netBuyerPayableINR = tradeValueINR; // Buyer pays trade value (+ dalali depending on contract terms)

    return {
      grossUSD,
      grossINR,
      discountedRateUSD,
      tradeValueUSD,
      tradeValueINR,
      dalaliINR,
      dalaliUSD,
      vatavINR,
      netSellerReceivableINR,
      netBuyerPayableINR,
      effectiveRateINRPerCt: carats > 0 ? tradeValueINR / carats : 0,
    };
  }, [carats, rapRateUSD, lessPercent, dalaliPercent, vatavPercent, dollarRate]);

  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const formatUSD = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <section id="trading" className="py-20 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Building2 className="w-3.5 h-3.5" />
            Bharat Diamond Bourse (BDB) Standard
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Commercial Diamond Pricing & Settlement Engine
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Eliminate error-prone Excel sheets with automated Rapaport Less %, Dalali (brokerage) withholding, 
            and Chithi credit term tracking standard across Mumbai and Surat markets.
          </p>

          {/* Preset Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {PRESET_TRADES.map((s, idx) => (
              <button
                key={s.label}
                onClick={() => applyScenario(idx)}
                className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all ${
                  activeScenario === idx
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Trade Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-6 bg-slate-850 border border-slate-750 rounded-2xl p-6 sm:p-7 shadow-xl">
            <h3 className="text-sm font-semibold text-white mb-5 flex items-center justify-between border-b border-slate-750 pb-4">
              <span className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                Deal Terms & Less % Parameters
              </span>
              <span className="text-xs text-slate-400 font-mono">Currency: INR / USD</span>
            </h3>

            <div className="space-y-4">
              {/* Row 1: Carats & Rap Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Carat Weight (વજન)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={carats}
                    onChange={(e) => setCarats(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Rapaport Price ($/ct)
                  </label>
                  <input
                    type="number"
                    step="10"
                    value={rapRateUSD}
                    onChange={(e) => setRapRateUSD(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Row 2: Less % & Dalali % */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Less % (ડિસ્કાઉન્ટ)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-400">-</span>
                    <input
                      type="number"
                      step="0.5"
                      value={lessPercent}
                      onChange={(e) => setLessPercent(parseFloat(e.target.value) || 0)}
                      className="w-full pl-6 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Dalali % (દલાલી)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={dalaliPercent}
                      onChange={(e) => setDalaliPercent(parseFloat(e.target.value) || 0)}
                      className="w-full pr-7 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400">%</span>
                  </div>
                </div>
              </div>

              {/* Row 3: Vatav (Cash discount) & Term Days */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Vatav / Cash Discount
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.5"
                      value={vatavPercent}
                      onChange={(e) => setVatavPercent(parseFloat(e.target.value) || 0)}
                      className="w-full pr-7 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Credit Term (ચિઠ્ઠી દિવસો)
                  </label>
                  <select
                    value={termDays}
                    onChange={(e) => setTermDays(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value={0}>Immediate Cash / RTGS (0 Days)</option>
                    <option value={15}>15 Days Chithi</option>
                    <option value={30}>30 Days Chithi</option>
                    <option value={60}>60 Days Chithi</option>
                    <option value={90}>90 Days Chithi</option>
                  </select>
                </div>
              </div>

              {/* FX Rate */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  USD / INR Exchange Rate
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-400">₹</span>
                  <input
                    type="number"
                    step="0.1"
                    value={dollarRate}
                    onChange={(e) => setDollarRate(parseFloat(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-750 flex items-start gap-2.5 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Jangad Protection:</strong> In Shreenathji ERP, outgoing stones on approval (Jangad) 
                automatically expire after 48 hours unless converted into a firm sale memo or physically scanned back.
              </span>
            </div>
          </div>

          {/* Generated Memo & Invoicing Preview */}
          <div className="lg:col-span-6 bg-slate-850 border border-slate-750 rounded-2xl p-6 sm:p-7 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-750 pb-4 mb-5">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Simulated BDB Commercial Memo (સોદા ચિઠ્ઠી)
              </h4>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Auto-Generated Memo #BDB-8419
              </span>
            </div>

            {/* Memo Box */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-750 font-mono text-xs space-y-3">
              <div className="flex justify-between text-slate-400 border-b border-slate-800 pb-2">
                <span>Lot Carats: <strong className="text-white">{carats.toFixed(2)} cts</strong></span>
                <span>Term: <strong className="text-white">{termDays === 0 ? 'Cash / Instant' : `${termDays} Days`}</strong></span>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-slate-300">
                  <span>Gross Rap Value ({formatUSD(rapRateUSD)}/ct):</span>
                  <span>{formatUSD(tradeResults.grossUSD)}</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Trade Discount (Less {lessPercent}%):</span>
                  <span>- {formatUSD(tradeResults.grossUSD - tradeResults.tradeValueUSD)}</span>
                </div>
                <div className="flex justify-between text-white font-bold pt-1 border-t border-slate-800">
                  <span>Agreed Trade Value (USD):</span>
                  <span>{formatUSD(tradeResults.tradeValueUSD)} ({formatUSD(tradeResults.discountedRateUSD)}/ct)</span>
                </div>
                <div className="flex justify-between text-white font-bold">
                  <span>Agreed Trade Value (INR):</span>
                  <span>{formatINR(tradeResults.tradeValueINR)}</span>
                </div>
              </div>

              {/* Deductions: Brokerage & Vatav */}
              <div className="pt-2 border-t border-slate-800 space-y-1 text-slate-400">
                <div className="flex justify-between text-amber-300/90">
                  <span>Dalali / Brokerage ({dalaliPercent}%):</span>
                  <span>- {formatINR(tradeResults.dalaliINR)}</span>
                </div>
                {vatavPercent > 0 && (
                  <div className="flex justify-between text-sky-300/90">
                    <span>Vatav / Early Cash Discount ({vatavPercent}%):</span>
                    <span>- {formatINR(tradeResults.vatavINR)}</span>
                  </div>
                )}
                <div className="flex justify-between text-emerald-400 font-bold text-sm pt-2 border-t border-slate-800">
                  <span>Net Seller Receivable:</span>
                  <span>{formatINR(tradeResults.netSellerReceivableINR)}</span>
                </div>
              </div>
            </div>

            {/* Feature Callouts */}
            <div className="mt-5 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Multi-party ledger auto-posts seller credit & broker commission payable</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Automated WhatsApp reminder when Chithi due date approaches (T-3 days)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero rounding discrepancies across USD/INR conversion splits</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-750 flex justify-end">
              <button
                onClick={onOpenDemoModal}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border border-slate-600"
              >
                Inquire About Trading Module
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
