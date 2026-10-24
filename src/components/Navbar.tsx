'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Gem, Download, Menu, X, Sun, Moon, ArrowRight, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenInquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme, onOpenInquiry }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-vault-950/90 border-b border-slate-800/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-600/20 group-hover:scale-105 transition-transform">
            <Gem className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-base tracking-wider text-white">SHREENATHJI</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-700/60 text-emerald-400 font-mono font-bold">
                ERP
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium tracking-wide">Surat & Mumbai Operations</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-300">
          <a href="#overview" className="hover:text-emerald-400 transition-colors">Overview</a>
          <a href="#preview" className="hover:text-emerald-400 transition-colors">Simulated ERP</a>
          <a href="#kapan-sim" className="hover:text-emerald-400 transition-colors">Kapan Yield Simulator</a>
          <a href="#calculator" className="hover:text-emerald-400 transition-colors">Trade Calculator</a>
          <a href="#architecture" className="hover:text-emerald-400 transition-colors">Database Blueprint</a>
          <a href="#lexicon" className="hover:text-emerald-400 transition-colors">Gujarati Lexicon</a>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-700 bg-vault-900 text-xs font-semibold text-slate-200 hover:border-emerald-500 transition-all cursor-pointer"
            title="Toggle theme view"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">White Theme</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Black Theme</span>
              </>
            )}
          </button>

          {/* Download DOCX */}
          <a
            href="/Shreenathji_Diamond_Management_System_Overview.docx"
            download
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-vault-850 hover:bg-vault-800 text-slate-200 border border-slate-700 hover:border-emerald-600 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Docx Specs</span>
          </a>

          {/* Book Briefing / Inquiry */}
          <button
            type="button"
            onClick={onOpenInquiry}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-700/30 transition-all cursor-pointer"
          >
            <span>Request Briefing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-vault-900 border border-slate-800"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-vault-950 border-b border-slate-800 px-4 py-4 space-y-3 animate-fadeIn">
          <nav className="flex flex-col space-y-2 text-xs font-medium text-slate-300">
            <a
              href="#overview"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-vault-900 hover:text-emerald-400"
            >
              Overview
            </a>
            <a
              href="#preview"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-vault-900 hover:text-emerald-400"
            >
              Simulated ERP Views
            </a>
            <a
              href="#kapan-sim"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-vault-900 hover:text-emerald-400"
            >
              Kapan Yield Simulator
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-vault-900 hover:text-emerald-400"
            >
              Trade Pricing Calculator
            </a>
            <a
              href="#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-vault-900 hover:text-emerald-400"
            >
              Database Architecture (34 Tables)
            </a>
            <a
              href="#lexicon"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-vault-900 hover:text-emerald-400"
            >
              Gujarati Lexicon Reference
            </a>
          </nav>
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <a
              href="/Shreenathji_Diamond_Management_System_Overview.docx"
              download
              className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-vault-900 text-slate-200 border border-slate-700 text-center flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Download Full Overview Docx</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
