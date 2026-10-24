'use client';

import React, { useState } from 'react';
import {
  BRANCHES,
  MOCK_DASHBOARD_METRICS,
  MOCK_RECONCILIATION_STATEMENT,
  MOCK_KAPAN_LOTS,
  MOCK_RECEIVABLES_AGING,
  MOCK_PARTNER_LEDGER,
} from '../data/mockErpData';
import { BranchCode } from '../types';
import {
  LayoutDashboard,
  Scale,
  Factory,
  FileSpreadsheet,
  Users,
  Landmark,
  Building2,
  CheckCircle2,
  Search,
  Filter,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';

export const InteractiveDashboardPreview: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState<BranchCode>('ALL');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reconciliation' | 'kapan' | 'sales' | 'partners' | 'cashbook'>('dashboard');
  const [lotSearchQuery, setLotSearchQuery] = useState('');

  const metrics = MOCK_DASHBOARD_METRICS[selectedBranch];
  const branchInfo = BRANCHES.find((b) => b.code === selectedBranch)!;

  const filteredKapanLots = MOCK_KAPAN_LOTS.filter((k) =>
    k.kapanNumber.toLowerCase().includes(lotSearchQuery.toLowerCase()) ||
    k.roughLotCode.toLowerCase().includes(lotSearchQuery.toLowerCase())
  );

  return (
    <section id="preview" className="py-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 text-xs font-semibold mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Interactive Simulated Experience</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Inspect Software Workflows Without Logging In
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Click the branch switches and modules below to experience how real-world diamond transactions flow between the Surat factory and the Mumbai BDB trading bourse.
          </p>
        </div>

        {/* Global Multi-Branch Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-vault-900 border border-slate-800 mb-6">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-slate-300">Simulate Operating Branch:</span>
          </div>
          <div className="flex rounded-lg bg-vault-950 p-1 border border-slate-800 text-xs font-medium">
            {BRANCHES.map((b) => (
              <button
                key={b.code}
                type="button"
                onClick={() => setSelectedBranch(b.code)}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  selectedBranch === b.code
                    ? 'bg-emerald-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        {/* Module Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-vault-900 border border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Executive Dashboard</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reconciliation')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'reconciliation'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-vault-900 border border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Rough Reconciliation (રફ મેળ)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('kapan')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'kapan'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-vault-900 border border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <Factory className="w-3.5 h-3.5" />
            <span>Princess Kapan (કાપન)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sales')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'sales'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-vault-900 border border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Sales & Dalali (દલાલી)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('partners')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'partners'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-vault-900 border border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Partner Ledger (ઉપાડ-જમા)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cashbook')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'cashbook'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-vault-900 border border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>Cash & Bank Books</span>
          </button>
        </div>

        {/* Display Container */}
        <div className="p-6 sm:p-8 rounded-2xl bg-vault-900 border border-slate-700/80 shadow-2xl relative overflow-hidden">
          
          {/* TAB 1: EXECUTIVE DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold font-mono">
                      LIVE VIEW
                    </span>
                    <h3 className="text-lg font-bold text-white">Live Vault & Trading Overview</h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{branchInfo.description}</p>
                </div>
                <div className="text-xs font-mono text-emerald-400 bg-vault-950 px-3 py-1.5 rounded-lg border border-slate-800">
                  Active Hub: <span className="font-bold">{branchInfo.name}</span>
                </div>
              </div>

              {/* Dynamic KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-vault-950 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Rough Vault Stock (કાચુ)</div>
                  <div className="text-lg font-bold text-white font-mono mt-1">
                    {metrics.roughVaultCarats.toLocaleString('en-IN', { minimumFractionDigits: 3 })}{' '}
                    <span className="text-xs font-normal text-slate-400">cts</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">
                    ₹ {metrics.roughValuationINR.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-vault-950 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Princess Polished (પ્રિન્સેસ)</div>
                  <div className="text-lg font-bold text-white font-mono mt-1">
                    {metrics.princessStockCarats.toLocaleString('en-IN', { minimumFractionDigits: 3 })}{' '}
                    <span className="text-xs font-normal text-slate-400">cts</span>
                  </div>
                  <div className="text-[10px] text-teal-400 mt-0.5">
                    ₹ {metrics.princessValuationINR.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-vault-950 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Active Kapan Lots</div>
                  <div className="text-lg font-bold text-white font-mono mt-1">
                    {metrics.activeKapanCount} Lots Active
                  </div>
                  <div className="text-[10px] text-amber-400 mt-0.5">
                    Yield Avg: {metrics.avgYieldPercent > 0 ? `${metrics.avgYieldPercent}%` : 'N/A (Trading Hub)'}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-vault-950 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Customer Receivables</div>
                  <div className="text-lg font-bold text-white font-mono mt-1">
                    ₹ {metrics.pendingReceivablesINR.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-sky-400 mt-0.5">
                    Dalali: ₹ {metrics.accruedDalaliINR.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Receivables Aging breakdown visual bar */}
              <div className="p-4 rounded-xl bg-vault-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">Customer Outstanding Aging Distribution:</span>
                  <span className="text-[11px] text-slate-400">5 Strict Aging Brackets</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
                  {MOCK_RECEIVABLES_AGING.map((a) => (
                    <div key={a.bucket} className="p-2.5 rounded-lg bg-vault-900 border border-slate-800">
                      <div className="text-[10px] text-slate-400 truncate">{a.bucket}</div>
                      <div className="text-sm font-bold font-mono text-white mt-1">₹ {a.amountINR.toLocaleString('en-IN')}</div>
                      <div className="text-[10px] text-emerald-400 mt-0.5">{a.partyCount} Accounts • {a.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ROUGH RECONCILIATION */}
          {activeTab === 'reconciliation' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold">
                      રફ મેળ
                    </span>
                    <span>Rough Stock Reconciliation Proof</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Continuous mathematical proof ensuring no rough stone is ever unaccounted for.</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 font-bold">
                  {MOCK_RECONCILIATION_STATEMENT.verifiedStatus}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-vault-950 border border-slate-800 font-mono text-xs space-y-2.5">
                <div className="flex justify-between py-1 border-b border-slate-800 text-slate-300">
                  <span>(+) Opening Vault Stock (Katargam Unit):</span>
                  <span className="font-bold text-white">{MOCK_RECONCILIATION_STATEMENT.openingRoughCarats.toFixed(3)} cts</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800 text-emerald-400">
                  <span>(+) New Rough Inflow / Purchases:</span>
                  <span className="font-bold">+ {MOCK_RECONCILIATION_STATEMENT.newPurchasesCarats.toFixed(3)} cts</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800 text-teal-400">
                  <span>(+) Rejection Recovery (Credited back from Kapan):</span>
                  <span className="font-bold">+ {MOCK_RECONCILIATION_STATEMENT.rejectionRecoveryCarats.toFixed(3)} cts</span>
                </div>
                <div className="flex justify-between py-1.5 bg-vault-900 px-2 rounded text-slate-200 font-bold">
                  <span>(=) Total Rough Available:</span>
                  <span>{MOCK_RECONCILIATION_STATEMENT.totalAvailableRoughCarats.toFixed(3)} cts</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800 text-rose-400">
                  <span>(-) Production Kat Consumed (Active Kapan Lots):</span>
                  <span className="font-bold">- {MOCK_RECONCILIATION_STATEMENT.productionKatConsumedCarats.toFixed(3)} cts</span>
                </div>
                <div className="flex justify-between py-2 text-sm bg-emerald-950/70 border border-emerald-700/60 px-3 rounded text-emerald-300 font-bold">
                  <span>(=) Physical Vault Closing Stock:</span>
                  <span>{MOCK_RECONCILIATION_STATEMENT.closingPhysicalVaultCarats.toFixed(3)} cts</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRINCESS KAPAN */}
          {activeTab === 'kapan' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-teal-950 border border-teal-800 text-teal-300 font-bold">
                      કાપન
                    </span>
                    <span>Princess Cut Kapan Lifecycle</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Tracking rough Kat weight, polished yield, Ghat loss, and artisan wages.</p>
                </div>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search Kapan Lot..."
                    value={lotSearchQuery}
                    onChange={(e) => setLotSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-lg bg-vault-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Table of active kapan lots */}
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-vault-950">
                <table className="w-full text-left text-xs">
                  <thead className="bg-vault-900 text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">Kapan Lot</th>
                      <th className="py-2.5 px-3">Kat Weight (કાટ)</th>
                      <th className="py-2.5 px-3">Polish Yield (તૈયાર)</th>
                      <th className="py-2.5 px-3">Ghat (ઘાટ/લોસ)</th>
                      <th className="py-2.5 px-3">Rejections (રિજેક્શન)</th>
                      <th className="py-2.5 px-3">Majuri (મજૂરી)</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono text-slate-300">
                    {filteredKapanLots.map((k) => (
                      <tr key={k.kapanNumber} className="hover:bg-vault-900/40">
                        <td className="py-2.5 px-3 font-bold text-white">{k.kapanNumber}</td>
                        <td className="py-2.5 px-3">{k.katWeightCarats.toFixed(3)} cts</td>
                        <td className="py-2.5 px-3 text-emerald-400 font-semibold">{k.polishedCarats.toFixed(3)} cts ({k.yieldPercent}%)</td>
                        <td className="py-2.5 px-3 text-rose-400">{k.ghatLossCarats.toFixed(3)} cts</td>
                        <td className="py-2.5 px-3 text-amber-400">{k.rejectionsCarats.toFixed(3)} cts</td>
                        <td className="py-2.5 px-3">₹ {k.workerMajuriINR.toLocaleString('en-IN')}</td>
                        <td className="py-2.5 px-3 font-sans">
                          <span className={`text-[10px] px-2 py-0.5 rounded ${
                            k.status === 'COMPLETED'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}>
                            {k.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: SALES & DALALI */}
          {activeTab === 'sales' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300 font-bold">
                      દલાલી
                    </span>
                    <span>Commercial Invoicing & Dalali Brokerage</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Automated "Less %" discount billing and broker commission liabilities.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-vault-950 border border-slate-800 font-mono text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Polished Parcel: 50.000 cts @ $200.00/ct</span>
                  <span className="text-white font-bold">$ 10,000.00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Conversion to INR (@ ₹83.50):</span>
                  <span className="text-white">₹ 8,35,000.00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800 text-amber-400">
                  <span>Trade Discount ("4% Less" Multiplier = 0.96):</span>
                  <span>₹ 8,01,600.00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800 text-sky-400">
                  <span>(+) Dalali (1.0% Commission to Broker):</span>
                  <span>₹ 8,016.00 (Recorded as Liability)</span>
                </div>
                <div className="flex justify-between py-2 text-sm bg-vault-900 px-3 rounded text-emerald-300 font-bold">
                  <span>Net Commercial Invoice Total:</span>
                  <span>₹ 8,09,616.00</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PARTNER LEDGER */}
          {activeTab === 'partners' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 font-bold">
                      ઉપાડ-જમા
                    </span>
                    <span>Partner Capital & Personal Drawings Ledger</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Complete isolation of partner capital, personal drawings (Upad), and profit credits.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {MOCK_PARTNER_LEDGER.map((p) => (
                  <div key={p.partnerName} className="p-4 rounded-xl bg-vault-950 border border-slate-800">
                    <div className="text-xs font-bold text-white">{p.partnerName}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Equity Share: {p.sharePercent}%</div>
                    <div className="mt-3 pt-3 border-t border-slate-800 font-mono text-xs space-y-1">
                      <div className="flex justify-between text-slate-400">
                        <span>Capital Balance:</span>
                        <span className="text-emerald-400 font-bold">₹ {p.capitalBalanceINR.toLocaleString('en-IN')} (CR)</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Running Upad (Drawings):</span>
                        <span className="text-amber-400">₹ {p.runningUpadINR.toLocaleString('en-IN')} (DR)</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CASH & BANK BOOKS */}
          {activeTab === 'cashbook' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-blue-950 border border-blue-800 text-blue-300 font-bold">
                      રોકડ મેળ
                    </span>
                    <span>Daily Cash & Bank Books (આવક / જાવક)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Segregated Surat and Mumbai cash drawers and current bank accounts.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-vault-950 border border-slate-800 font-mono text-xs space-y-2.5">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">SURAT CASH DRAWER (Katargam Factory):</span>
                  <span className="text-emerald-400 font-bold">₹ 1,45,200.00 (Inflow / Avak)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">MUMBAI CASH DRAWER (BDB Trading Hub):</span>
                  <span className="text-emerald-400 font-bold">₹ 3,82,500.00 (Inflow / Avak)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">HDFC BANK CURRENT A/C (Operations):</span>
                  <span className="text-white font-bold">₹ 4,82,00,000.00</span>
                </div>
                <div className="flex justify-between py-2 bg-vault-900 px-3 rounded text-slate-200 font-bold">
                  <span>General Ledger Balanced Status:</span>
                  <span className="text-emerald-400">Total Debits == Total Credits (PERFECT)</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
