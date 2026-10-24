'use client';

import React from 'react';
import { Gem, Download, Github, Shield, MapPin, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-14 bg-vault-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 pb-10 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-700/20">
                <Gem className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-white text-sm tracking-wide">
                SHREENATHJI DIAMONDS
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Enterprise Relational Platform for Diamond Manufacturing, Vault Rough Reconciliation, and Commercial Accounts across Surat and Mumbai operations.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-500">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              <span>Zero Floating-Point Math Drift • 3-Decimal Precision</span>
            </div>
          </div>

          {/* Operational Hubs */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Operational Locations</span>
            </h4>
            <div className="space-y-3 text-slate-300 text-[11px]">
              <div className="p-2.5 rounded-lg bg-vault-900 border border-slate-800">
                <div className="font-semibold text-emerald-400">Surat Manufacturing Hub</div>
                <div className="text-slate-400 mt-0.5">Katargam GIDC, Surat, Gujarat - 395004</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Rough procurement, vault registers & Kapan cutting</div>
              </div>
              <div className="p-2.5 rounded-lg bg-vault-900 border border-slate-800">
                <div className="font-semibold text-teal-400">Mumbai Trading Office</div>
                <div className="text-slate-400 mt-0.5">Bharat Diamond Bourse (BDB), BKC, Mumbai - 400051</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Polished trading floor, invoicing & Dalali settlement</div>
              </div>
            </div>
          </div>

          {/* Documentation & Specifications */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Downloads & Architecture
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <a
                  href="/Shreenathji_Diamond_Management_System_Overview.docx"
                  download
                  className="text-slate-300 hover:text-emerald-400 flex items-center gap-2 transition-colors group"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
                  <span>Download Executive Docx Specification</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/HarshBhayani77/dimond-management-public"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-emerald-400 flex items-center gap-2 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-slate-400" />
                  <span>Public GitHub Documentation</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li className="pt-2">
                <div className="text-[10px] text-slate-500 bg-vault-900 p-2 rounded border border-slate-800">
                  Notice: This repository publishes documentation, architectural blueprints, and functional walkthroughs for clients without exposing proprietary source code.
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <div>© 2026 Harsh Bhayani / Shreenathji Diamonds. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span>Surat • Mumbai BDB</span>
            <span>Licensed under MIT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
