'use client';

import React from 'react';
import {
  Cpu,
  ShieldCheck,
  Building2,
  FileText,
  Sliders,
  Sparkles,
  Zap,
} from 'lucide-react';
import { IndustryType } from '@/lib/agent-swarm-logic';

interface NavbarProps {
  currentIndustry: IndustryType;
  onSelectIndustry: (ind: IndustryType) => void;
  onOpenSowModal: () => void;
  onScrollToRoi: () => void;
  onScrollToSwarm: () => void;
}

export function Navbar({
  currentIndustry,
  onSelectIndustry,
  onOpenSowModal,
  onScrollToRoi,
  onScrollToSwarm,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand & Badge */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/20">
            <Cpu className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-wider text-white">
                SYNAPSE<span className="text-cyan-400">.OS</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 uppercase tracking-wider">
                Enterprise Autonomous Workforce
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              100 Active AI FTEs Replaced &bull; 99.98% SLA
            </p>
          </div>
        </div>

        {/* Industry switcher & actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Industry dropdown selector */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
            <span className="hidden md:flex items-center px-2 text-slate-400 font-medium">
              <Building2 className="w-3.5 h-3.5 mr-1 text-cyan-400" />
              Niche:
            </span>
            <button
              onClick={() => onSelectIndustry('ecommerce')}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                currentIndustry === 'ecommerce'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              E-Commerce
            </button>
            <button
              onClick={() => onSelectIndustry('technology')}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                currentIndustry === 'technology'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tech / SaaS
            </button>
            <button
              onClick={() => onSelectIndustry('hospitality')}
              className={`px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                currentIndustry === 'hospitality'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Multi-Branch / Dining
            </button>
          </div>

          {/* ROI Calculator Button */}
          <button
            onClick={onScrollToRoi}
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>ROI Model ($50k-$100k)</span>
          </button>

          {/* Live Dispatch Shortcut */}
          <button
            onClick={onScrollToSwarm}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-800/50 transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Live Swarm Run</span>
          </button>

          {/* SOW Commercial Proposal Modal Trigger */}
          <button
            onClick={onOpenSowModal}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md shadow-cyan-500/25 transition-all transform active:scale-95"
          >
            <FileText className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Generate $75k SOW</span>
          </button>
        </div>
      </div>
    </header>
  );
}
