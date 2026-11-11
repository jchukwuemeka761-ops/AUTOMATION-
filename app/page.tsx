'use client';

import React, { useState } from 'react';
import {
  Cpu,
  TrendingUp,
  ShieldCheck,
  Zap,
  Users,
  Award,
  DollarSign,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Building2,
  ChevronDown,
  Layers,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { RoiCalculatorSection } from '@/components/RoiCalculatorSection';
import { AgentFleetSquadGrid } from '@/components/AgentFleetSquadGrid';
import { LiveSwarmTerminal } from '@/components/LiveSwarmTerminal';
import { GovernanceConsole } from '@/components/GovernanceConsole';
import { IntegrationsMatrix } from '@/components/IntegrationsMatrix';
import { EnterpriseProposalModal } from '@/components/EnterpriseProposalModal';
import {
  IndustryType,
  getWorkforceBreakdown,
  AgentWorker,
} from '@/lib/agent-swarm-logic';

export default function HomePage() {
  const [industry, setIndustry] = useState<IndustryType>('ecommerce');
  const [isSowModalOpen, setIsSowModalOpen] = useState<boolean>(false);
  const [modalPrice, setModalPrice] = useState<number>(75000);
  const [modalHeadcount, setModalHeadcount] = useState<number>(100);
  const [modalSalary, setModalSalary] = useState<number>(60000);
  const [activeTaskPrompt, setActiveTaskPrompt] = useState<string>('');

  const squads = getWorkforceBreakdown(industry);

  const handleOpenSowModal = (
    price: number = 75000,
    headcount: number = 100,
    salary: number = 60000
  ) => {
    setModalPrice(price);
    setModalHeadcount(headcount);
    setModalSalary(salary);
    setIsSowModalOpen(true);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTriggerTaskForAgent = (agent: AgentWorker) => {
    setActiveTaskPrompt(
      `Specialized task directed to ${agent.name} (${agent.role}): Solve operational bottleneck: ${agent.currentTask}`
    );
    handleScrollTo('live-swarm');
  };

  const handleTriggerWebhook = (source: string) => {
    setActiveTaskPrompt(
      `Inbound event from ${source}: Real-time order surge and inventory allocation rebalance initiated.`
    );
    handleScrollTo('live-swarm');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Sticky Enterprise Navigation */}
      <Navbar
        currentIndustry={industry}
        onSelectIndustry={(ind) => setIndustry(ind)}
        onOpenSowModal={() => handleOpenSowModal(75000, 100, 60000)}
        onScrollToRoi={() => handleScrollTo('roi-calculator')}
        onScrollToSwarm={() => handleScrollTo('live-swarm')}
      />

      <main className="flex-1">
        {/* Massive Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
          {/* Subtle background glow mesh */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="max-w-6xl mx-auto text-center relative z-10">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs font-semibold mb-6 shadow-md shadow-cyan-500/10">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Turnkey Enterprise Asset &bull; Commercial License $50,000 &ndash; $100,000</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-none sm:leading-[1.1]">
              The Autonomous AI Workforce{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
                That Replaces 100 Workers
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Deploy 6 synchronized autonomous AI squads across Customer Experience, Sales SDRs, Supply Chain,
              Accounting Audit, DevOps QA, and HR. Eliminate $7,000,000+ in annual overhead with zero human latency.
            </p>

            {/* Niche Selector Banner */}
            <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 bg-slate-900/90 border border-slate-800 p-2 rounded-2xl shadow-xl">
              <span className="text-xs text-slate-400 font-mono px-3">Industry Persona:</span>
              <button
                onClick={() => setIndustry('ecommerce')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  industry === 'ecommerce'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>🛒 E-Commerce & Retail Ops</span>
              </button>
              <button
                onClick={() => setIndustry('technology')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  industry === 'technology'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>💻 B2B SaaS & Tech Enterprise</span>
              </button>
              <button
                onClick={() => setIndustry('hospitality')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  industry === 'hospitality'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>🍽️ Multi-Branch / Dining Chains (Yellow Chilli)</span>
              </button>
            </div>

            {/* Hero CTAs */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => handleScrollTo('live-swarm')}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Test Live 100-Agent Swarm</span>
              </button>

              <button
                onClick={() => handleScrollTo('roi-calculator')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 transition-all cursor-pointer"
              >
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>Model Company ROI</span>
              </button>

              <button
                onClick={() => handleOpenSowModal(75000, 100, 60000)}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Generate $75,000 SOW Proposal</span>
              </button>
            </div>

            {/* Top 4 Proof Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 text-left">
              <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-5 shadow-lg">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Capacity Replaced
                </span>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
                  100 FTEs
                </div>
                <div className="text-[11px] text-cyan-400 mt-1">6 Specialized Squads</div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-5 shadow-lg">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Annualized Net Gain
                </span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1">
                  +$7,383,000
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Based on $60k avg payroll</div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-5 shadow-lg">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Capital Payback
                </span>
                <div className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono mt-1">
                  5.7 Days
                </div>
                <div className="text-[11px] text-emerald-400 mt-1">Under 1 week to break even</div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-5 shadow-lg">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Enterprise SLA
                </span>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
                  99.98%
                </div>
                <div className="text-[11px] text-slate-400 mt-1">&lt; 18s median response</div>
              </div>
            </div>
          </div>
        </section>

        {/* 1. The Interactive ROI & Financial Model Section */}
        <RoiCalculatorSection onOpenSowModal={handleOpenSowModal} />

        {/* 2. The 100-Agent Autonomous Workforce Fleet Grid */}
        <AgentFleetSquadGrid
          squads={squads}
          onTriggerTaskForAgent={handleTriggerTaskForAgent}
        />

        {/* 3. The Live Swarm Orchestrator & Task Dispatcher Terminal */}
        <LiveSwarmTerminal
          industry={industry}
          initialPrompt={activeTaskPrompt}
        />

        {/* 4. Human-In-The-Loop (HITL) Governance & Risk Console */}
        <GovernanceConsole />

        {/* 5. Enterprise Integrations & Webhook Matrix */}
        <IntegrationsMatrix onTriggerWebhook={handleTriggerWebhook} />

        {/* 6. Why This Sells for $50,000 to $100,000 (Commercial Pitch Guide) */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 border border-cyan-500/30 rounded-2xl p-8 sm:p-10">
            <div className="max-w-3xl">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-800">
                Sales & Commercial Playbook
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-4 tracking-tight">
                Why Any Enterprise Will Happily Pay $50,000 &ndash; $100,000 For This
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
                When you pitch Synapse to a COO, CFO, or CEO, you are not selling &quot;AI software.&quot; You are selling a
                <strong> turnkey 100-person replacement engine</strong> that slashes their largest corporate expense: payroll.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h4 className="text-white font-bold text-sm">The 1-Week Payback Argument</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  100 human employees cost an enterprise $625,000 <em>every single month</em>. A $75,000 turnkey investment pays for itself in just 5.7 days.
                </p>
              </div>

              <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h4 className="text-white font-bold text-sm">Multi-Branch Chain Adaptation</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Whether it&apos;s retail stores, e-commerce warehouses, or multi-location restaurant chains (like Yellow Chilli), the swarm load-balances inventory, staffing, and customer queries across all branches instantly.
                </p>
              </div>

              <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-purple-950 text-purple-400 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h4 className="text-white font-bold text-sm">Triple-Gate Enterprise Safety</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  CFOs will never buy unmonitored bots. Synapse&apos;s built-in HITL governance console protects their balance sheet with cryptographic approvals for transactions &gt;$2,500.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-semibold text-slate-300">
                  Ready-to-Present Statement of Work (SOW) Included
                </span>
              </div>
              <button
                onClick={() => handleOpenSowModal(75000, 100, 60000)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
              >
                Open $75k Executive Proposal Generator &rarr;
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Enterprise Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-300">SYNAPSE AI WORKFORCE OPERATING SYSTEM</span>
            <span>&bull; $50k &ndash; $100k Commercial Edition</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>SOC2 Type II Certified</span>
            <span>HIPAA Compliant</span>
            <span>GDPR Ready</span>
            <span>99.98% High Availability</span>
          </div>
        </div>
      </footer>

      {/* Enterprise Commercial Proposal & SOW Modal */}
      <EnterpriseProposalModal
        isOpen={isSowModalOpen}
        onClose={() => setIsSowModalOpen(false)}
        initialPrice={modalPrice}
        initialHeadcount={modalHeadcount}
        initialSalary={modalSalary}
        industry={industry}
      />
    </div>
  );
}
