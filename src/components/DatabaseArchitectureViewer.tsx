'use client';

import React, { useState, useMemo } from 'react';
import { Database, Search, Download, Key, Link2, Shield, Layers, FileText, CheckCircle2, Server } from 'lucide-react';
import { SCHEMA_TABLES } from '../data/schemaData';

export default function DatabaseArchitectureViewer() {
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTable, setSelectedTable] = useState<string | null>('kapans');

  const domains = useMemo(() => {
    const set = new Set<string>();
    SCHEMA_TABLES.forEach((t) => set.add(t.domain));
    return ['ALL', ...Array.from(set)];
  }, []);

  const filteredTables = useMemo(() => {
    return SCHEMA_TABLES.filter((t) => {
      const matchDomain = selectedDomain === 'ALL' || t.domain === selectedDomain;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        t.tableName.toLowerCase().includes(q) ||
        t.purpose.toLowerCase().includes(q) ||
        t.keyFields.some((f) => f.toLowerCase().includes(q));
      return matchDomain && matchSearch;
    });
  }, [selectedDomain, searchQuery]);

  const activeTableMeta = useMemo(() => {
    return SCHEMA_TABLES.find((t) => t.tableName === selectedTable) || filteredTables[0];
  }, [selectedTable, filteredTables]);

  return (
    <section id="architecture" className="py-20 bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Database className="w-3.5 h-3.5" />
            Enterprise Relational Blueprint
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Production Database Schema Architecture
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Engineered with strict foreign-key integrity, multi-branch row-level isolation, 
            and double-entry financial guarantees across 34 normalized relational tables.
          </p>

          {/* Quick Metrics */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium">Relational Tables</div>
              <div className="text-2xl font-bold font-mono text-emerald-400 mt-0.5">34</div>
              <div className="text-[10px] text-slate-500">PostgreSQL / Prisma</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium">Functional Domains</div>
              <div className="text-2xl font-bold font-mono text-white mt-0.5">9</div>
              <div className="text-[10px] text-slate-500">Full lifecycle scope</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium">Multi-Branch Keys</div>
              <div className="text-2xl font-bold font-mono text-emerald-400 mt-0.5">100%</div>
              <div className="text-[10px] text-slate-500">Surat & Mumbai isolated</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium">Foreign Key Enforce</div>
              <div className="text-2xl font-bold font-mono text-white mt-0.5">CASCADE</div>
              <div className="text-[10px] text-slate-500">Zero orphaned records</div>
            </div>
          </div>
        </div>

        {/* Schema Architectural Flow Diagram (High-level data pipeline) */}
        <div className="mb-12 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-x-auto">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              End-to-End Enterprise Data Pipeline
            </span>
            <span className="text-slate-400 text-[11px] font-mono">Row-Level Security via branch_id</span>
          </div>

          <div className="min-w-[720px] flex items-center justify-between gap-3 text-xs">
            {/* Step 1 */}
            <div className="flex-1 p-3 rounded-xl bg-slate-850 border border-slate-750">
              <div className="font-semibold text-emerald-400 mb-1">1. Rough Inward</div>
              <div className="text-slate-300 font-mono text-[11px]">purchases</div>
              <div className="text-slate-300 font-mono text-[11px]">parties (Supplier)</div>
              <div className="text-[10px] text-slate-400 mt-1">Carat mass logged into raw vault</div>
            </div>
            <span className="text-slate-600 font-bold">→</span>

            {/* Step 2 */}
            <div className="flex-1 p-3 rounded-xl bg-slate-850 border border-slate-750">
              <div className="font-semibold text-emerald-400 mb-1">2. Kapan Planning</div>
              <div className="text-slate-300 font-mono text-[11px]">kapans</div>
              <div className="text-slate-300 font-mono text-[11px]">kapan_lots</div>
              <div className="text-[10px] text-slate-400 mt-1">Rough split into Kat packets</div>
            </div>
            <span className="text-slate-600 font-bold">→</span>

            {/* Step 3 */}
            <div className="flex-1 p-3 rounded-xl bg-slate-850 border border-slate-750">
              <div className="font-semibold text-emerald-400 mb-1">3. Factory Floor</div>
              <div className="text-slate-300 font-mono text-[11px]">packets</div>
              <div className="text-slate-300 font-mono text-[11px]">worker_assignments</div>
              <div className="text-[10px] text-slate-400 mt-1">Laser, Ghadtar & Polish handoffs</div>
            </div>
            <span className="text-slate-600 font-bold">→</span>

            {/* Step 4 */}
            <div className="flex-1 p-3 rounded-xl bg-slate-850 border border-slate-750">
              <div className="font-semibold text-emerald-400 mb-1">4. Polished Vault</div>
              <div className="text-slate-300 font-mono text-[11px]">polished_inventory</div>
              <div className="text-slate-300 font-mono text-[11px]">kapan_daily_reports</div>
              <div className="text-[10px] text-slate-400 mt-1">Grading & yield reconciliation</div>
            </div>
            <span className="text-slate-600 font-bold">→</span>

            {/* Step 5 */}
            <div className="flex-1 p-3 rounded-xl bg-slate-850 border border-slate-750">
              <div className="font-semibold text-emerald-400 mb-1">5. BDB Trading</div>
              <div className="text-slate-300 font-mono text-[11px]">sales / jangad</div>
              <div className="text-slate-300 font-mono text-[11px]">journal_entries</div>
              <div className="text-[10px] text-slate-400 mt-1">Rap Less% & Dalali settled</div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-8">
          {/* Domain tabs */}
          <div className="flex flex-wrap gap-1.5">
            {domains.map((dom) => (
              <button
                key={dom}
                onClick={() => setSelectedDomain(dom)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  selectedDomain === dom
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white hover:bg-slate-850'
                }`}
              >
                {dom === 'ALL' ? 'All Domains (34)' : dom.replace(/^\d+\.\s*/, '')}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search table or column..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Master-Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Table List Column */}
          <div className="lg:col-span-5 space-y-2 max-h-[580px] overflow-y-auto pr-1">
            {filteredTables.map((t) => (
              <button
                key={t.tableName}
                onClick={() => setSelectedTable(t.tableName)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                  activeTableMeta?.tableName === t.tableName
                    ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg'
                    : 'bg-slate-900 border-slate-800 hover:bg-slate-850'
                }`}
              >
                <div>
                  <div className="font-mono text-xs font-bold text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    {t.tableName}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{t.purpose}</div>
                </div>
                <div className="text-[10px] text-slate-500 shrink-0 font-mono ml-2">
                  {t.keyFields.length} fields
                </div>
              </button>
            ))}

            {filteredTables.length === 0 && (
              <div className="p-8 text-center text-xs text-slate-500 bg-slate-900 rounded-xl border border-slate-800">
                No matching tables found for &ldquo;{searchQuery}&rdquo;.
              </div>
            )}
          </div>

          {/* Table Detail Column */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            {activeTableMeta ? (
              <div className="space-y-6">
                {/* Table Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
                  <div>
                    <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                      {activeTableMeta.domain}
                    </div>
                    <h3 className="text-2xl font-mono font-bold text-white mt-0.5">
                      {activeTableMeta.tableName}
                    </h3>
                  </div>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-mono">
                    PK: {activeTableMeta.primaryKey}
                  </span>
                </div>

                {/* Purpose */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Functional Purpose
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed bg-slate-850 p-3.5 rounded-xl border border-slate-750">
                    {activeTableMeta.purpose}
                  </p>
                </div>

                {/* Foreign Keys / Relations */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Link2 className="w-3.5 h-3.5 text-emerald-400" />
                    Relational Foreign Keys & Cascades
                  </h4>
                  {activeTableMeta.foreignKeys.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {activeTableMeta.foreignKeys.map((fk, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono"
                        >
                          {fk}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 italic">
                      Root Master Table (No outbound foreign keys)
                    </div>
                  )}
                </div>

                {/* Key Schema Columns */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-emerald-400" />
                    Key Indexed Columns
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeTableMeta.keyFields.map((field, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-2 rounded-lg bg-slate-850 border border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-between"
                      >
                        <span>{field}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/70 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Documentation download box */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-slate-400">
                    Want the complete 34-table field-by-field architectural whitepaper?
                  </div>
                  <a
                    href="/Shreenathji_Diamond_Management_System_Overview.docx"
                    download
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-colors shrink-0"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    Download System Blueprint (.docx)
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
