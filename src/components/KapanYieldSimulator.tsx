'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, Sparkles, TrendingUp, AlertCircle, ShieldCheck, RefreshCw, ArrowRight } from 'lucide-react';

interface KapanInputs {
  katWeight: number;
  roughRateUSD: number;
  dollarRate: number;
  targetYieldPercent: number;
  rejectionPercent: number;
  rejectionRateUSD: number;
  majuriPerCaratINR: number;
  marketPriceUSD: number;
}

const PRESETS: { name: string; desc: string; values: KapanInputs }[] = [
  {
    name: 'Standard Make (0.30-0.50ct)',
    desc: 'Typical Katargam round brilliant production run',
    values: {
      katWeight: 450.0,
      roughRateUSD: 145.0,
      dollarRate: 86.5,
      targetYieldPercent: 32.4,
      rejectionPercent: 2.1,
      rejectionRateUSD: 24.0,
      majuriPerCaratINR: 380,
      marketPriceUSD: 620.0,
    },
  },
  {
    name: 'Princess Cut (0.70-1.50ct)',
    desc: 'Square modified fancy make with higher yield efficiency',
    values: {
      katWeight: 680.0,
      roughRateUSD: 260.0,
      dollarRate: 86.5,
      targetYieldPercent: 44.8,
      rejectionPercent: 1.5,
      rejectionRateUSD: 45.0,
      majuriPerCaratINR: 520,
      marketPriceUSD: 890.0,
    },
  },
  {
    name: 'Commercial Make (Mixed Lots)',
    desc: 'High-volume mixed rough lots with conservative margin',
    values: {
      katWeight: 1200.0,
      roughRateUSD: 85.0,
      dollarRate: 86.5,
      targetYieldPercent: 28.5,
      rejectionPercent: 3.8,
      rejectionRateUSD: 18.0,
      majuriPerCaratINR: 310,
      marketPriceUSD: 410.0,
    },
  },
];

export default function KapanYieldSimulator({ onOpenDemoModal }: { onOpenDemoModal?: () => void }) {
  const [inputs, setInputs] = useState<KapanInputs>(PRESETS[0].values);
  const [activePreset, setActivePreset] = useState<number>(0);

  const setPreset = (idx: number) => {
    setActivePreset(idx);
    setInputs(PRESETS[idx].values);
  };

  const results = useMemo(() => {
    const {
      katWeight,
      roughRateUSD,
      dollarRate,
      targetYieldPercent,
      rejectionPercent,
      rejectionRateUSD,
      majuriPerCaratINR,
      marketPriceUSD,
    } = inputs;

    const polishedCarats = Number(((katWeight * targetYieldPercent) / 100).toFixed(3));
    const rejectionCarats = Number(((katWeight * rejectionPercent) / 100).toFixed(3));
    const ghatLossCarats = Number(Math.max(0, katWeight - (polishedCarats + rejectionCarats)).toFixed(3));
    const ghatLossPercent = Number(Math.max(0, 100 - (targetYieldPercent + rejectionPercent)).toFixed(2));

    const roughCostUSD = katWeight * roughRateUSD;
    const roughCostINR = roughCostUSD * dollarRate;

    const totalLabourINR = polishedCarats * majuriPerCaratINR;
    const rejectionRecoveryUSD = rejectionCarats * rejectionRateUSD;
    const rejectionRecoveryINR = rejectionRecoveryUSD * dollarRate;

    const netProductionCostINR = roughCostINR + totalLabourINR - rejectionRecoveryINR;
    const costPerPolishedCaratINR = polishedCarats > 0 ? netProductionCostINR / polishedCarats : 0;
    const costPerPolishedCaratUSD = costPerPolishedCaratINR / dollarRate;

    const revenuePolishedUSD = polishedCarats * marketPriceUSD;
    const revenuePolishedINR = revenuePolishedUSD * dollarRate;
    const totalRevenueINR = revenuePolishedINR + rejectionRecoveryINR;

    const totalInvestmentINR = roughCostINR + totalLabourINR;
    const netProfitINR = totalRevenueINR - totalInvestmentINR;
    const profitMarginPercent = totalRevenueINR > 0 ? (netProfitINR / totalRevenueINR) * 100 : 0;

    return {
      polishedCarats,
      rejectionCarats,
      ghatLossCarats,
      ghatLossPercent,
      roughCostUSD,
      roughCostINR,
      totalLabourINR,
      rejectionRecoveryUSD,
      rejectionRecoveryINR,
      netProductionCostINR,
      costPerPolishedCaratINR,
      costPerPolishedCaratUSD,
      revenuePolishedUSD,
      revenuePolishedINR,
      totalRevenueINR,
      totalInvestmentINR,
      netProfitINR,
      profitMarginPercent,
    };
  }, [inputs]);

  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const formatUSD = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <section id="simulator" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle diamond facet backdrop */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diamondGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diamondGrid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5" />
            Interactive Manufacturing Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Kapan Yield & Unit Economics Simulator
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Simulate actual Katargam & Mahidharpura rough diamond processing. Adjust rough weight, target yields, and 
            labor rates to inspect break-even thresholds and zero-leakage carat accounting.
          </p>

          {/* Presets */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {PRESETS.map((preset, idx) => (
              <button
                key={preset.name}
                onClick={() => setPreset(idx)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-150 border ${
                  activePreset === idx
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-950'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750 hover:text-white'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Inputs vs Real-Time Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 bg-slate-850 border border-slate-750 rounded-2xl p-6 sm:p-7 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-750 pb-4 mb-6">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Rough Batch Parameters (કાટ ગણતરી)
              </h3>
              <button
                onClick={() => setInputs(PRESETS[activePreset].values)}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
                title="Reset to preset"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>

            <div className="space-y-5">
              {/* Kat Weight */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-slate-300">Raw Kat Weight (કાટ વજન)</span>
                  <span className="text-emerald-400 font-mono font-semibold">{inputs.katWeight.toFixed(2)} Cts</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="10"
                  value={inputs.katWeight}
                  onChange={(e) => setInputs({ ...inputs, katWeight: parseFloat(e.target.value) })}
                  className="w-full accent-emerald-500 bg-slate-700 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>50 Cts (Choki)</span>
                  <span>1,000 Cts (Medium)</span>
                  <span>2,000 Cts (Jumbo)</span>
                </div>
              </div>

              {/* Polish Yield % */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-slate-300">Target Polish Yield (તૈયાર ટકા)</span>
                  <span className="text-emerald-400 font-mono font-semibold">{inputs.targetYieldPercent.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="22"
                  max="52"
                  step="0.2"
                  value={inputs.targetYieldPercent}
                  onChange={(e) => setInputs({ ...inputs, targetYieldPercent: parseFloat(e.target.value) })}
                  className="w-full accent-emerald-500 bg-slate-700 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>22% (Conservative)</span>
                  <span>32.5% (Surat Avg)</span>
                  <span>50% (High Sawing)</span>
                </div>
              </div>

              {/* Rejection % */}
              <div>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-slate-300">Rejection Carats (રિજેક્શન ટકા)</span>
                  <span className="text-amber-400 font-mono font-semibold">{inputs.rejectionPercent.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="8.0"
                  step="0.1"
                  value={inputs.rejectionPercent}
                  onChange={(e) => setInputs({ ...inputs, rejectionPercent: parseFloat(e.target.value) })}
                  className="w-full accent-amber-500 bg-slate-700 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Two-column rates */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Rough Cost ($/ct)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 text-xs">$</span>
                    <input
                      type="number"
                      min="10"
                      max="2000"
                      value={inputs.roughRateUSD}
                      onChange={(e) => setInputs({ ...inputs, roughRateUSD: parseFloat(e.target.value) || 0 })}
                      className="w-full pl-7 pr-2 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Majuri / Labor (₹/ct)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 text-xs">₹</span>
                    <input
                      type="number"
                      min="100"
                      max="3000"
                      value={inputs.majuriPerCaratINR}
                      onChange={(e) => setInputs({ ...inputs, majuriPerCaratINR: parseFloat(e.target.value) || 0 })}
                      className="w-full pl-7 pr-2 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    USD / INR Exchange
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 text-xs">₹</span>
                    <input
                      type="number"
                      min="70"
                      max="110"
                      step="0.1"
                      value={inputs.dollarRate}
                      onChange={(e) => setInputs({ ...inputs, dollarRate: parseFloat(e.target.value) || 0 })}
                      className="w-full pl-7 pr-2 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Polished Price ($/ct)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 text-xs">$</span>
                    <input
                      type="number"
                      min="100"
                      max="5000"
                      value={inputs.marketPriceUSD}
                      onChange={(e) => setInputs({ ...inputs, marketPriceUSD: parseFloat(e.target.value) || 0 })}
                      className="w-full pl-7 pr-2 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-750 flex items-start gap-3 text-xs text-slate-400">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>ERP Lock Rule:</strong> In production mode, once a Kapan passes the 4P Laser Sawing stage, 
                its Kat weight is digitally sealed to prevent unauthorized physical weight alterations.
              </span>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Visual Yield Distribution Bar */}
            <div className="bg-slate-850 border border-slate-750 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Carat Mass Distribution (વજન વિતરણ)
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Input: <strong>{inputs.katWeight.toFixed(2)} Cts</strong>
                </span>
              </div>

              {/* Progress Stack */}
              <div className="w-full h-7 bg-slate-800 rounded-lg overflow-hidden flex p-1 gap-1 border border-slate-700">
                <div
                  style={{ width: `${inputs.targetYieldPercent}%` }}
                  className="bg-emerald-500 rounded-md transition-all duration-300 flex items-center justify-center text-[11px] font-mono font-bold text-slate-950 truncate px-1"
                  title={`Polished Yield: ${results.polishedCarats} Cts (${inputs.targetYieldPercent}%)`}
                >
                  {inputs.targetYieldPercent >= 15 ? `${inputs.targetYieldPercent.toFixed(1)}% Polish` : ''}
                </div>
                <div
                  style={{ width: `${inputs.rejectionPercent}%` }}
                  className="bg-amber-400 rounded-md transition-all duration-300 flex items-center justify-center text-[10px] font-mono font-bold text-slate-950 truncate px-1"
                  title={`Rejections: ${results.rejectionCarats} Cts (${inputs.rejectionPercent}%)`}
                >
                  {inputs.rejectionPercent >= 5 ? `${inputs.rejectionPercent.toFixed(1)}% Rej` : ''}
                </div>
                <div
                  style={{ width: `${results.ghatLossPercent}%` }}
                  className="bg-slate-600 rounded-md transition-all duration-300 flex items-center justify-center text-[11px] font-mono font-medium text-slate-200 truncate px-1"
                  title={`Ghat Loss: ${results.ghatLossCarats} Cts (${results.ghatLossPercent}%)`}
                >
                  {results.ghatLossPercent >= 20 ? `${results.ghatLossPercent.toFixed(1)}% Ghat Loss` : ''}
                </div>
              </div>

              {/* Carat Legend */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-slate-750 text-center">
                <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-900/50">
                  <div className="text-[11px] text-emerald-300 font-medium">Polished Finished</div>
                  <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">
                    {results.polishedCarats.toFixed(2)} <span className="text-xs font-normal">cts</span>
                  </div>
                  <div className="text-[10px] text-emerald-400/70">{inputs.targetYieldPercent.toFixed(1)}% yield</div>
                </div>

                <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-900/50">
                  <div className="text-[11px] text-amber-300 font-medium">Rejections Salvaged</div>
                  <div className="text-lg font-bold font-mono text-amber-400 mt-0.5">
                    {results.rejectionCarats.toFixed(2)} <span className="text-xs font-normal">cts</span>
                  </div>
                  <div className="text-[10px] text-amber-400/70">{inputs.rejectionPercent.toFixed(1)}% salvaged</div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60">
                  <div className="text-[11px] text-slate-300 font-medium">Ghat (Dust Loss)</div>
                  <div className="text-lg font-bold font-mono text-slate-300 mt-0.5">
                    {results.ghatLossCarats.toFixed(2)} <span className="text-xs font-normal">cts</span>
                  </div>
                  <div className="text-[10px] text-slate-400">{results.ghatLossPercent.toFixed(1)}% wheel loss</div>
                </div>
              </div>
            </div>

            {/* Financial Ledger Breakdown */}
            <div className="bg-slate-850 border border-slate-750 rounded-2xl p-6 shadow-xl">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>Unit Cost & Profitability Ledger (નફો & ખર્ચ ખાતાવહી)</span>
                <span className="text-slate-400 font-normal">Surat Factory Rates</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Cost Per Polished Carat */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-750">
                  <div className="text-xs text-slate-400">Net Cost / Polished Carat</div>
                  <div className="text-2xl font-bold font-mono text-white mt-1">
                    {formatUSD(results.costPerPolishedCaratUSD)}
                    <span className="text-xs font-normal text-slate-400 ml-1.5">
                      ({formatINR(results.costPerPolishedCaratINR)} / ct)
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Calculated after factoring rough procurement + majuri - rejection recovery
                  </div>
                </div>

                {/* Net Profit Margin */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-900/60">
                  <div className="text-xs text-emerald-300 flex items-center justify-between">
                    <span>Estimated Net Profit</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {results.profitMarginPercent.toFixed(1)}% margin
                    </span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                    {formatINR(results.netProfitINR)}
                  </div>
                  <div className="text-[11px] text-emerald-300/80 mt-1">
                    Total Revenue: {formatINR(results.totalRevenueINR)} | Investment: {formatINR(results.totalInvestmentINR)}
                  </div>
                </div>
              </div>

              {/* Line Item Breakdown */}
              <div className="space-y-2 text-xs border-t border-slate-750 pt-4">
                <div className="flex justify-between py-1 text-slate-300">
                  <span>Rough Diamond Procurement ({inputs.katWeight} cts @ ${inputs.roughRateUSD})</span>
                  <span className="font-mono font-medium text-white">{formatINR(results.roughCostINR)}</span>
                </div>
                <div className="flex justify-between py-1 text-slate-300">
                  <span>Worker Majuri ({results.polishedCarats.toFixed(2)} polished cts @ ₹{inputs.majuriPerCaratINR})</span>
                  <span className="font-mono font-medium text-white">{formatINR(results.totalLabourINR)}</span>
                </div>
                <div className="flex justify-between py-1 text-amber-300/90">
                  <span>Less: Rejection Recovery ({results.rejectionCarats.toFixed(2)} cts salvaged)</span>
                  <span className="font-mono font-medium">- {formatINR(results.rejectionRecoveryINR)}</span>
                </div>
                <div className="flex justify-between py-2 border-t border-slate-750 font-semibold text-emerald-400 text-sm">
                  <span>Net Cost Basis for Finished Diamond Lot</span>
                  <span className="font-mono">{formatINR(results.netProductionCostINR)}</span>
                </div>
              </div>

              {/* CTA footer */}
              <div className="mt-5 pt-4 border-t border-slate-750 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-400 text-center sm:text-left">
                  Ready to deploy these real-time calculations directly to your factory tablet screens?
                </div>
                <button
                  onClick={onOpenDemoModal}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-950 shrink-0"
                >
                  Schedule Live ERP Walkthrough
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
