'use client';

import React, { useState, useMemo } from 'react';
import { BookOpen, Search, ArrowRight, Tag } from 'lucide-react';
import { LEXICON_ENTRIES } from '../data/lexiconData';
import { LexiconEntry } from '../types';

export default function GujaratiLexiconTable({ onOpenDemoModal }: { onOpenDemoModal?: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['ALL', 'Material', 'Production', 'Commercial', 'Accounts'];

  const filteredLexicon = useMemo(() => {
    return LEXICON_ENTRIES.filter((item) => {
      const matchCat = selectedCategory === 'ALL' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        item.gujarati.includes(q) ||
        item.transliteration.toLowerCase().includes(q) ||
        item.englishConcept.toLowerCase().includes(q) ||
        item.businessRole.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="lexicon" className="py-20 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Domain Lexicon & Vernacular Mapping
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Surat & Mumbai Diamond Industry Glossary
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Generic Western ERPs fail in diamond factories because their inventory models cannot reflect 
            vernacular diamond trade workflows. Shreenathji ERP natively speaks the language of Katargam & BDB.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950'
                    : 'bg-slate-850 text-slate-300 border-slate-750 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat === 'ALL' ? 'All Terminology (13)' : `${cat} Terms`}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search Gujarati or English terms (e.g. Kapan, Dalali, કાટ)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-850 border border-slate-750 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 shadow-lg"
          />
        </div>

        {/* Lexicon Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLexicon.map((term: LexiconEntry, idx: number) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-850 border border-slate-750 hover:border-slate-650 transition-all flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold font-serif text-white">{term.gujarati}</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {term.category}
                  </span>
                </div>

                <div className="mb-2">
                  <span className="text-emerald-400 font-semibold text-sm">
                    {term.transliteration}
                  </span>
                  <span className="text-xs text-slate-400 ml-2 font-medium">
                    ({term.englishConcept})
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mt-2 pt-2 border-t border-slate-750/70">
                  {term.businessRole}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span className="font-mono text-emerald-400/90">Mapped in ERP Core</span>
                <Tag className="w-3.5 h-3.5 text-slate-500" />
              </div>
            </div>
          ))}
        </div>

        {filteredLexicon.length === 0 && (
          <div className="p-12 text-center text-sm text-slate-500 bg-slate-850 rounded-2xl border border-slate-750">
            No terms found matching &ldquo;{searchQuery}&rdquo;.
          </div>
        )}

        {/* Call to action bar */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-850 via-slate-800 to-slate-850 border border-slate-750 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-semibold text-white">Need custom manufacturing terminology for your factory?</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Shreenathji ERP supports custom stages, department names, and localized terminology configurations.
            </p>
          </div>
          <button
            onClick={onOpenDemoModal}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-all shrink-0 shadow-lg shadow-emerald-950"
          >
            Request Customized Terminology Demo
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
