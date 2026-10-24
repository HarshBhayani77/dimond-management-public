'use client';

import React, { useState, useMemo } from 'react';
import { Scale, CheckCircle2, AlertTriangle, ShieldAlert, History, UserCheck, ArrowRight, Layers } from 'lucide-react';

interface AuditEvent {
  step: string;
  worker: string;
  department: string;
  issuedCts: number;
  returnedCts: number;
  lossCts: number;
  status: 'VERIFIED' | 'DISCREPANCY';
  time: string;
}

export default function RoughReconciliationSim({ onOpenDemoModal }: { onOpenDemoModal?: () => void }) {
  const [katInput, setKatInput] = useState<number>(100.000);
  const [polishedOutput, setPolishedOutput] = useState<number>(32.450);
  const [rejectionWeight, setRejectionWeight] = useState<number>(2.100);
  const [chokiWeight, setChokiWeight] = useState<number>(4.250);
  const [ghatDustWeight, setGhatDustWeight] = useState<number>(61.200);

  // Quick Preset Handlers
  const loadBalancedState = () => {
    setKatInput(100.000);
    setPolishedOutput(32.450);
    setRejectionWeight(2.100);
    setChokiWeight(4.250);
    setGhatDustWeight(61.200); // 32.45 + 2.10 + 4.25 + 61.20 = 100.000
  };

  const loadMissingStoneState = () => {
    setKatInput(100.000);
    setPolishedOutput(32.000); // 0.450 cts missing
    setRejectionWeight(2.100);
    setChokiWeight(4.250);
    setGhatDustWeight(61.200); // sum = 99.550 (Variance = +0.450 cts missing)
  };

  const loadExcessState = () => {
    setKatInput(100.000);
    setPolishedOutput(32.850); // mixup from another lot
    setRejectionWeight(2.100);
    setChokiWeight(4.250);
    setGhatDustWeight(61.200); // sum = 100.400 (Negative variance)
  };

  const totalAccounted = useMemo(() => {
    return Number((polishedOutput + rejectionWeight + chokiWeight + ghatDustWeight).toFixed(3));
  }, [polishedOutput, rejectionWeight, chokiWeight, ghatDustWeight]);

  const variance = useMemo(() => {
    return Number((katInput - totalAccounted).toFixed(3));
  }, [katInput, totalAccounted]);

  const isBalanced = Math.abs(variance) <= 0.005;

  const mockAuditTrail: AuditEvent[] = useMemo(() => {
    if (isBalanced) {
      return [
        {
          step: '1. Vault Rough Outward',
          worker: 'Pravinbhai K. (Vault Mgr)',
          department: 'Vault Control',
          issuedCts: 100.000,
          returnedCts: 100.000,
          lossCts: 0.000,
          status: 'VERIFIED',
          time: '08:45 AM',
        },
        {
          step: '2. 4P Laser Sawing',
          worker: 'Haresh D. (Station 04)',
          department: 'Laser Sawing',
          issuedCts: 100.000,
          returnedCts: 95.800,
          lossCts: 4.200,
          status: 'VERIFIED',
          time: '11:15 AM',
        },
        {
          step: '3. Bottom & Top Polishing',
          worker: 'Ketan P. (Table 12)',
          department: 'Main Polishing',
          issuedCts: 95.800,
          returnedCts: 38.800,
          lossCts: 57.000,
          status: 'VERIFIED',
          time: '03:30 PM',
        },
        {
          step: '4. Final Sorting & Assorting',
          worker: 'Jayeshbhai S. (Chief Assorter)',
          department: 'Final QC & Pack',
          issuedCts: 38.800,
          returnedCts: 38.800,
          lossCts: 0.000,
          status: 'VERIFIED',
          time: '05:10 PM',
        },
      ];
    } else {
      return [
        {
          step: '1. Vault Rough Outward',
          worker: 'Pravinbhai K. (Vault Mgr)',
          department: 'Vault Control',
          issuedCts: 100.000,
          returnedCts: 100.000,
          lossCts: 0.000,
          status: 'VERIFIED',
          time: '08:45 AM',
        },
        {
          step: '2. 4P Laser Sawing',
          worker: 'Haresh D. (Station 04)',
          department: 'Laser Sawing',
          issuedCts: 100.000,
          returnedCts: 95.800,
          lossCts: 4.200,
          status: 'VERIFIED',
          time: '11:15 AM',
        },
        {
          step: '3. Bottom & Top Polishing',
          worker: 'Ketan P. (Table 12)',
          department: 'Main Polishing',
          issuedCts: 95.800,
          returnedCts: 38.350,
          lossCts: 57.000,
          status: 'DISCREPANCY',
          time: '03:30 PM',
        },
        {
          step: '4. Final Sorting & Assorting',
          worker: 'Jayeshbhai S. (Chief Assorter)',
          department: 'Final QC & Pack',
          issuedCts: 38.350,
          returnedCts: 38.350,
          lossCts: 0.000,
          status: 'DISCREPANCY',
          time: '05:10 PM',
        },
      ];
    }
  }, [isBalanced]);

  return (
    <section id="reconciliation" className="py-20 bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Scale className="w-3.5 h-3.5" />
            5-Point Zero-Leakage Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Real-Time Rough Reconciliation Engine
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            In Surat diamond manufacturing, untracked weight loss is permanent capital loss. 
            Test how Shreenathji ERP locks packet balances at every worker handoff down to 0.001 carat precision.
          </p>

          {/* Quick Scenario Toggles */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={loadBalancedState}
              className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all ${
                isBalanced
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950'
                  : 'bg-slate-850 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              Test Case 1: Perfect 100% Reconciled Lot
            </button>
            <button
              onClick={loadMissingStoneState}
              className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all ${
                !isBalanced && variance > 0
                  ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-950'
                  : 'bg-slate-850 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              Test Case 2: 0.450 Ct Missing / Unaccounted Stone
            </button>
            <button
              onClick={loadExcessState}
              className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all ${
                !isBalanced && variance < 0
                  ? 'bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-950'
                  : 'bg-slate-850 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              Test Case 3: Mixed Lot Over-Weight (+0.400 Ct)
            </button>
          </div>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Equation Inputs */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                Physical Weight Reconciliation (વજન મેળવવાની રીત)
              </h3>
              <span className="text-[11px] font-mono text-slate-400">Scale Precision: ±0.001 Ct</span>
            </div>

            {/* Kat Input */}
            <div className="p-4 rounded-xl bg-slate-850 border border-slate-750 mb-5">
              <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-2">
                <span>Total Kat Weight Issued (શરૂઆત કાટ વજન)</span>
                <span className="font-mono text-emerald-400 font-bold">{katInput.toFixed(3)} Cts</span>
              </div>
              <input
                type="number"
                step="0.005"
                value={katInput}
                onChange={(e) => setKatInput(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
              />
              <div className="text-[11px] text-slate-500 mt-1">Verified with digital scale API integration</div>
            </div>

            {/* Sum Components */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span>Accounted Outward Components</span>
                <span>Sub-weights</span>
              </div>

              {/* Polished */}
              <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-slate-850/70 border border-slate-800">
                <div className="text-xs">
                  <div className="font-medium text-emerald-300">1. Polished Finished Diamonds (તૈયાર હીરા)</div>
                  <div className="text-[11px] text-slate-400">Packets ready for vault grading & assortment</div>
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    step="0.005"
                    value={polishedOutput}
                    onChange={(e) => setPolishedOutput(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded text-right font-mono text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Rejection */}
              <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-slate-850/70 border border-slate-800">
                <div className="text-xs">
                  <div className="font-medium text-amber-300">2. Rejections / Broken Pieces (રિજેક્શન)</div>
                  <div className="text-[11px] text-slate-400">Internal cracks or flawed stones culled</div>
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    step="0.005"
                    value={rejectionWeight}
                    onChange={(e) => setRejectionWeight(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded text-right font-mono text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Choki */}
              <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-slate-850/70 border border-slate-800">
                <div className="text-xs">
                  <div className="font-medium text-sky-300">3. Choki / Re-cuttable Side Cuts (ચોકી)</div>
                  <div className="text-[11px] text-slate-400">Recovered fragments sent for secondary sawing</div>
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    step="0.005"
                    value={chokiWeight}
                    onChange={(e) => setChokiWeight(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded text-right font-mono text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Ghat Dust */}
              <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-slate-850/70 border border-slate-800">
                <div className="text-xs">
                  <div className="font-medium text-slate-300">4. Ghat Loss & Scaife Dust (ઘાટ વજન)</div>
                  <div className="text-[11px] text-slate-400">Cutting wheel loss collected in extraction traps</div>
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    step="0.005"
                    value={ghatDustWeight}
                    onChange={(e) => setGhatDustWeight(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded text-right font-mono text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Sum Summary Bar */}
            <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Total Accounted Carats:</span>
              <span className="font-mono font-bold text-white text-sm">{totalAccounted.toFixed(3)} Cts</span>
            </div>
          </div>

          {/* Right Column: Real-Time Audit Verdict & Custody Trail */}
          <div className="lg:col-span-6 space-y-6">
            {/* Status Banner */}
            <div
              className={`p-6 rounded-2xl border transition-all duration-300 shadow-xl ${
                isBalanced
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100'
                  : variance > 0
                  ? 'bg-rose-950/50 border-rose-500/60 text-rose-100'
                  : 'bg-amber-950/50 border-amber-500/60 text-amber-100'
              }`}
            >
              <div className="flex items-start gap-4">
                {isBalanced ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0 mt-0.5" />
                ) : variance > 0 ? (
                  <ShieldAlert className="w-8 h-8 text-rose-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-8 h-8 text-amber-400 shrink-0 mt-0.5" />
                )}

                <div className="space-y-1">
                  <div className="text-xs uppercase tracking-wider font-semibold opacity-80">
                    {isBalanced ? 'Zero-Leakage Status: Reconciled' : 'Audit Exception Triggered'}
                  </div>
                  <h4 className="text-xl font-bold font-serif">
                    {isBalanced
                      ? 'Perfect Lot Balance (0.000 Ct Discrepancy)'
                      : variance > 0
                      ? `Missing Carats Detected: -${variance.toFixed(3)} Cts`
                      : `Surplus Lot Weight Detected: +${Math.abs(variance).toFixed(3)} Cts`}
                  </h4>
                  <p className="text-xs opacity-90 leading-relaxed pt-1">
                    {isBalanced
                      ? 'All input carats accurately match polished yield, rejections, choki fragments, and scaife dust within ±0.005 ct tolerance.'
                      : variance > 0
                      ? 'The batch cannot be closed in Shreenathji ERP. The system has automatically locked Table 12 handoffs until physical re-weighing is approved by Factory Manager.'
                      : 'More weight returned than originally issued. Indicates diamond lot mixing between concurrent work orders.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Worker Custody Chain Inspection */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <History className="w-4 h-4 text-emerald-400" />
                  Worker Hand-off Audit Log (કારીગર વાઇઝ હિસાબ)
                </h4>
                <span className="text-[11px] text-slate-400 font-mono">Lot #KP-2024-089</span>
              </div>

              <div className="space-y-3">
                {mockAuditTrail.map((ev, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs transition-colors ${
                      ev.status === 'VERIFIED'
                        ? 'bg-slate-850 border-slate-750'
                        : 'bg-rose-950/40 border-rose-800/80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-white">{ev.step}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          ev.status === 'VERIFIED'
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        }`}
                      >
                        {ev.status === 'VERIFIED' ? 'PASSED' : 'FLAGGED ON TABLE'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Worker:</span>
                        <span className="text-slate-200 font-medium">{ev.worker}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Issued Weight:</span>
                        <span className="font-mono text-slate-200">{ev.issuedCts.toFixed(3)} ct</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Returned Weight:</span>
                        <span className="font-mono text-slate-200">{ev.returnedCts.toFixed(3)} ct</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Logged At:</span>
                        <span className="text-slate-300">{ev.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Explanatory note */}
              <div className="mt-5 p-3 rounded-lg bg-slate-850 border border-slate-800 flex items-start gap-2 text-xs text-slate-400">
                <UserCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Supervisor Biometric Approval:</strong> Releasing an audit flag requires biometric or OTP 
                  authorization from the authorized factory supervisor, ensuring no backroom adjustments occur.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
