'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Clock,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Sparkles,
  Zap,
  Users,
  Award,
} from 'lucide-react';
import { calculateEnterpriseRoi } from '@/lib/agent-swarm-logic';

interface RoiCalculatorSectionProps {
  onOpenSowModal: (price: number, headcount: number, salary: number) => void;
}

export function RoiCalculatorSection({ onOpenSowModal }: RoiCalculatorSectionProps) {
  const [headcount, setHeadcount] = useState<number>(100);
  const [avgSalary, setAvgSalary] = useState<number>(60000);
  const [overheadMultiplier, setOverheadMultiplier] = useState<number>(1.25);
  const [turnkeyTier, setTurnkeyTier] = useState<number>(75000);

  const metrics = calculateEnterpriseRoi(
    headcount,
    avgSalary,
    overheadMultiplier,
    turnkeyTier,
    3500
  );

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="roi-calculator" className="py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The $50,000 &ndash; $100,000 Value Equation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Enterprise Financial ROI & Workforce Replacement Model
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Quantify the exact dollar return of deploying an autonomous multi-agent fleet.
            Replacing 100 full-time workers generates millions in immediate annualized operating margin.
          </p>
        </div>

        {/* 2-Column Grid: Sliders on Left, Live Financial Output on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl shadow-black/40">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-cyan-400" />
              <span>Target Workforce Parameters</span>
            </h3>

            {/* Slider 1: Headcount */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-300">
                  Workers Replaced / Augmented
                </label>
                <span className="text-base font-black text-cyan-300 bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-800/60 font-mono">
                  {headcount} FTEs
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="250"
                step="5"
                value={headcount}
                onChange={(e) => setHeadcount(Number(e.target.value))}
                className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>20 Workers (Small Hub)</span>
                <span>100 Workers (Standard)</span>
                <span>250 Workers (Enterprise)</span>
              </div>
            </div>

            {/* Slider 2: Average Salary */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-300">
                  Average Annual Salary per Worker
                </label>
                <span className="text-base font-black text-cyan-300 bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-800/60 font-mono">
                  {formatCurrency(avgSalary)}/yr
                </span>
              </div>
              <input
                type="range"
                min="35000"
                max="120000"
                step="5000"
                value={avgSalary}
                onChange={(e) => setAvgSalary(Number(e.target.value))}
                className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>$35k (Entry CX / Ops)</span>
                <span>$60k (Blended Average)</span>
                <span>$120k (Tech / Finance)</span>
              </div>
            </div>

            {/* Slider 3: Benefits & Overhead */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-300">
                  Overhead Multiplier (Healthcare, Taxes, IT)
                </label>
                <span className="text-sm font-bold text-slate-200 font-mono">
                  {overheadMultiplier}x ({Math.round((overheadMultiplier - 1) * 100)}% load)
                </span>
              </div>
              <input
                type="range"
                min="1.1"
                max="1.4"
                step="0.05"
                value={overheadMultiplier}
                onChange={(e) => setOverheadMultiplier(Number(e.target.value))}
                className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Tier Selector ($50k vs $75k vs $100k) */}
            <div className="pt-4 border-t border-slate-800">
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Select Enterprise System Package Tier
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTurnkeyTier(50000)}
                  className={`p-2.5 rounded-xl text-center border transition-all ${
                    turnkeyTier === 50000
                      ? 'bg-cyan-500/20 border-cyan-500 text-white font-bold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">Core</div>
                  <div className="text-sm font-extrabold text-cyan-400">$50,000</div>
                  <div className="text-[9px] text-slate-500">Starter Swarm</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTurnkeyTier(75000)}
                  className={`relative p-2.5 rounded-xl text-center border transition-all ${
                    turnkeyTier === 75000
                      ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold ring-1 ring-cyan-400'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 px-1.5 py-0.2 rounded-full text-[8px] font-bold bg-cyan-400 text-slate-950 uppercase tracking-widest">
                    Best Deal
                  </span>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">Enterprise</div>
                  <div className="text-sm font-extrabold text-cyan-400">$75,000</div>
                  <div className="text-[9px] text-slate-500">100 FTE Swarm</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTurnkeyTier(100000)}
                  className={`p-2.5 rounded-xl text-center border transition-all ${
                    turnkeyTier === 100000
                      ? 'bg-cyan-500/20 border-cyan-500 text-white font-bold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">Infinite</div>
                  <div className="text-sm font-extrabold text-cyan-400">$100,000</div>
                  <div className="text-[9px] text-slate-500">Multi-Branch OS</div>
                </button>
              </div>
            </div>

            {/* Quick Pitch Action Button */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() => onOpenSowModal(turnkeyTier, headcount, avgSalary)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 transition-all"
              >
                <FileText className="w-4 h-4 stroke-[2.5]" />
                <span>Prepare $ {turnkeyTier.toLocaleString()} Client Agreement & SOW</span>
              </button>
            </div>
          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Massive Hero Metric Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>

              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" />
                    Net Year-1 Enterprise Savings
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-white mt-1 font-mono tracking-tight">
                    {formatCurrency(metrics.netFirstYearSavings)}
                  </div>
                </div>

                <div className="bg-slate-950/80 border border-cyan-800/60 rounded-xl px-4 py-2.5 text-right">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    1st-Year Capital ROI
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                    +{metrics.roiPercentage.toLocaleString()}%
                  </div>
                </div>
              </div>

              {/* Sub-metrics breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                <div>
                  <div className="text-[11px] text-slate-400">Payback Period</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-cyan-300 font-mono mt-0.5">
                    {metrics.paybackPeriodDays} Days
                  </div>
                  <div className="text-[10px] text-emerald-400">Break-even under 2 weeks</div>
                </div>

                <div>
                  <div className="text-[11px] text-slate-400">Traditional Labor Cost</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-rose-400 font-mono mt-0.5">
                    {formatCurrency(metrics.traditionalTotalCost)}
                  </div>
                  <div className="text-[10px] text-slate-500">Payroll + 25% Overhead</div>
                </div>

                <div>
                  <div className="text-[11px] text-slate-400">Synapse 1st-Yr Investment</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-200 font-mono mt-0.5">
                    {formatCurrency(metrics.synapseFirstYearCost)}
                  </div>
                  <div className="text-[10px] text-cyan-400">License + Cloud Compute</div>
                </div>

                <div>
                  <div className="text-[11px] text-slate-400">5-Year Cumulative Gain</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-emerald-300 font-mono mt-0.5">
                    {formatCurrency(metrics.fiveYearNetSavings)}
                  </div>
                  <div className="text-[10px] text-emerald-400">Direct Enterprise Margin</div>
                </div>
              </div>
            </div>

            {/* Human vs. Synapse AI Fleet Head-to-Head Table */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="px-6 py-3.5 bg-slate-800/40 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Award className="w-4 h-4 text-cyan-400" />
                  Operational Comparison: 100 Human Staff vs. Synapse AI Workforce
                </span>
                <span className="text-[11px] text-emerald-400 font-mono font-semibold">
                  Zero Human Latency
                </span>
              </div>

              <div className="divide-y divide-slate-800/60 text-xs">
                <div className="grid grid-cols-12 px-6 py-3 items-center">
                  <span className="col-span-4 text-slate-400 font-medium">Operating Hours</span>
                  <span className="col-span-4 text-rose-400 font-mono">40 hrs/wk &bull; 9 to 5</span>
                  <span className="col-span-4 text-cyan-300 font-bold font-mono">168 hrs/wk &bull; 24/7/365 Non-stop</span>
                </div>
                <div className="grid grid-cols-12 px-6 py-3 items-center">
                  <span className="col-span-4 text-slate-400 font-medium">Response Latency</span>
                  <span className="col-span-4 text-rose-400 font-mono">2 to 6 hours median</span>
                  <span className="col-span-4 text-cyan-300 font-bold font-mono">18 to 45 seconds instant</span>
                </div>
                <div className="grid grid-cols-12 px-6 py-3 items-center">
                  <span className="col-span-4 text-slate-400 font-medium">Resolution Throughput</span>
                  <span className="col-span-4 text-rose-400 font-mono">35 tickets/day/worker</span>
                  <span className="col-span-4 text-cyan-300 font-bold font-mono">4,500+ tasks/day/agent</span>
                </div>
                <div className="grid grid-cols-12 px-6 py-3 items-center">
                  <span className="col-span-4 text-slate-400 font-medium">Attrition & Retraining</span>
                  <span className="col-span-4 text-rose-400 font-mono">18% annual turnover</span>
                  <span className="col-span-4 text-cyan-300 font-bold font-mono">0% turnover &bull; Zero memory loss</span>
                </div>
                <div className="grid grid-cols-12 px-6 py-3 items-center">
                  <span className="col-span-4 text-slate-400 font-medium">Safety & Governance</span>
                  <span className="col-span-4 text-rose-400 font-mono">Manual auditing (sample 2%)</span>
                  <span className="col-span-4 text-cyan-300 font-bold font-mono">100% Immutable HITL Audit Trail</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
