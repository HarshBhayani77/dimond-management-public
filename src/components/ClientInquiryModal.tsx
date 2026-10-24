'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Send, PhoneCall, Building, MessageSquare, Mail, Sparkles } from 'lucide-react';

interface ClientInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ClientInquiryModal({ isOpen, onClose }: ClientInquiryModalProps) {
  const [fullName, setFullName] = useState('');
  const [firmName, setFirmName] = useState('');
  const [hub, setHub] = useState('Surat - Katargam GIDC');
  const [volume, setVolume] = useState('500 - 2,500 Cts / Month');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Rough Kapan Yield Tracking',
    'Surat-Mumbai Multi-Branch Sync',
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleInterest = (tag: string) => {
    if (selectedInterests.includes(tag)) {
      setSelectedInterests(selectedInterests.filter((t) => t !== tag));
    } else {
      setSelectedInterests([...selectedInterests, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API registration
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  const interestOptions = [
    'Rough Kapan Yield Tracking',
    'Worker Majuri & Biometric Payouts',
    'Surat-Mumbai Multi-Branch Sync',
    'Polished Vault & Jangad Consignments',
    'Rapaport Less % Settlement Memos',
    'Custom Production Reporting',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={handleReset}
      />

      {/* Modal Dialog */}
      <div className="relative bg-slate-900 border border-slate-750 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden z-10 my-8">
        {/* Top Accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />

        {/* Modal Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Private Enterprise Walkthrough
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">
                Request a Demonstration of Shreenathji ERP
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Schedule a private review of live screens, database architecture, and factory tablet deployment.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajeshbhai Patel"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-750 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Firm / Factory Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Shreenathji Diamonds LLP"
                    value={firmName}
                    onChange={(e) => setFirmName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-750 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Primary Operational Hub
                  </label>
                  <select
                    value={hub}
                    onChange={(e) => setHub(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-750 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Surat - Katargam GIDC">Surat - Katargam GIDC</option>
                    <option value="Surat - Mahidharpura / Varachha">Surat - Mahidharpura / Varachha</option>
                    <option value="Mumbai - Bharat Diamond Bourse (BKC)">Mumbai - Bharat Diamond Bourse (BKC)</option>
                    <option value="Ahmedabad / Gujarat Hub">Ahmedabad / Gujarat Hub</option>
                    <option value="International (Antwerp / Dubai)">International (Antwerp / Dubai)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Monthly Processing Scale
                  </label>
                  <select
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-750 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="< 500 Cts / Month">&lt; 500 Cts / Month</option>
                    <option value="500 - 2,500 Cts / Month">500 - 2,500 Cts / Month</option>
                    <option value="2,500 - 10,000 Cts / Month">2,500 - 10,000 Cts / Month</option>
                    <option value="10,000+ Cts / Month">10,000+ Cts / Month (Large Enterprise)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contact@yourfirm.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-750 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-750 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Module Focus Pills */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  Modules of Interest (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((opt) => {
                    const isSelected = selectedInterests.includes(opt);
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => toggleInterest(opt)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-medium border transition-all ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-500'
                            : 'bg-slate-800 text-slate-300 border-slate-750 hover:bg-slate-750'
                        }`}
                      >
                        {isSelected && '✓ '}
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom message */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Specific Factory Challenges or Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. We are currently migrating from tally/excel and need barcode scale integration..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-750 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Strict NDA & confidentiality guaranteed</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-lg shadow-emerald-950 transition-all"
                >
                  {isSubmitting ? (
                    'Scheduling...'
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Submit Demonstration Request
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-serif font-bold text-white">
                Demonstration Request Received
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
                Thank you, <strong className="text-white">{fullName}</strong> ({firmName}). 
                Our engineering team will connect with you within 24 hours to schedule a secure, private walkthrough.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-850 border border-slate-750 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Hub:</span>
                <span className="text-white font-medium">{hub}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Monthly Scale:</span>
                <span className="text-white font-medium">{volume}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Contact Email:</span>
                <span className="text-white font-medium">{email}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>WhatsApp:</span>
                <span className="text-white font-medium">{phone}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/919876543210?text=Hello%20Shreenathji%20ERP%20Team,%20I%20have%20submitted%20a%20demo%20request%20for%20${encodeURIComponent(
                  firmName || 'our diamond firm'
                )}.`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Connect Instantly on WhatsApp
              </a>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium border border-slate-750 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
