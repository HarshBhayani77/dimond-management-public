'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { ProblemSolution } from '../components/ProblemSolution';
import { InteractiveDashboardPreview } from '../components/InteractiveDashboardPreview';
import KapanYieldSimulator from '../components/KapanYieldSimulator';
import RoughReconciliationSim from '../components/RoughReconciliationSim';
import TradePricingEngine from '../components/TradePricingEngine';
import DatabaseArchitectureViewer from '../components/DatabaseArchitectureViewer';
import GujaratiLexiconTable from '../components/GujaratiLexiconTable';
import { Footer } from '../components/Footer';
import ClientInquiryModal from '../components/ClientInquiryModal';

export default function HomePage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-vault-950 text-slate-100 flex flex-col selection:bg-emerald-600 selection:text-white">
      {/* Top Fixed Navigation */}
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenInquiry={handleOpenModal}
      />

      {/* Hero Section */}
      <HeroSection onOpenInquiry={handleOpenModal} />

      {/* Spreadsheet Chaos vs Shreenathji ERP */}
      <ProblemSolution />

      {/* Simulated Live ERP Interface */}
      <InteractiveDashboardPreview />

      {/* Kapan Yield Simulator */}
      <div id="kapan-sim">
        <KapanYieldSimulator onOpenDemoModal={handleOpenModal} />
      </div>

      {/* 5-Point Rough Mass Balance Reconciliation Engine */}
      <RoughReconciliationSim onOpenDemoModal={handleOpenModal} />

      {/* Commercial Diamond Trade & Rap Less% Engine */}
      <div id="calculator">
        <TradePricingEngine onOpenDemoModal={handleOpenModal} />
      </div>

      {/* 34-Table Relational Schema Explorer */}
      <DatabaseArchitectureViewer />

      {/* Surat & Mumbai Gujarati Industry Lexicon */}
      <GujaratiLexiconTable onOpenDemoModal={handleOpenModal} />

      {/* Enterprise Footer */}
      <Footer />

      {/* Demonstration Request Modal */}
      <ClientInquiryModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </main>
  );
}
