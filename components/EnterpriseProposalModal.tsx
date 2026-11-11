'use client';

import React, { useState } from 'react';
import {
  FileText,
  X,
  Printer,
  Copy,
  Check,
  ShieldCheck,
  Award,
  DollarSign,
  Calendar,
  Building2,
  Users,
} from 'lucide-react';
import { generateSOWDocument, IndustryType } from '@/lib/agent-swarm-logic';

interface EnterpriseProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrice?: number;
  initialHeadcount?: number;
  initialSalary?: number;
  industry?: IndustryType;
}

export function EnterpriseProposalModal({
  isOpen,
  onClose,
  initialPrice = 75000,
  initialHeadcount = 100,
  initialSalary = 60000,
  industry = 'ecommerce',
}: EnterpriseProposalModalProps) {
  const [clientName, setClientName] = useState('Acme Global Enterprises Inc.');
  const [turnkeyPrice, setTurnkeyPrice] = useState(initialPrice);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sow = generateSOWDocument({
    clientName,
    industry,
    headcount: initialHeadcount,
    avgSalary: initialSalary,
    turnkeyPrice,
  });

  const handleCopyText = () => {
    const textContent = `
================================================================================
SYNAPSE AI WORKFORCE OPERATING SYSTEM - ENTERPRISE MASTER SERVICES AGREEMENT (MSA)
STATEMENT OF WORK (SOW) & TURNKEY IMPLEMENTATION CONTRACT
Contract ID: ${sow.contractId}
Effective Date: ${sow.effectiveDate}
================================================================================

CLIENT: ${sow.clientCompanyName}
INDUSTRY: ${sow.industry}
WORKFORCE TARGET: 100 Full-Time Equivalent (FTE) Roles Displaced & Automated

1. COMMERCIAL INVESTMENT:
- Turnkey Multi-Agent Autonomous Fleet License: $${sow.turnkeyFee.toLocaleString()} (One-Time)
- Monthly Managed Autonomous Compute & Token Allocation: $${sow.monthlyManagedFee.toLocaleString()}/month
- Year 1 Total Investment: $${sow.totalFirstYearInvestment.toLocaleString()}

2. FINANCIAL RETURN & ROI:
- Traditional 100-Worker Annual Labor Cost Replaced: $${sow.estimatedLaborSavings.toLocaleString()}/year
- Net First-Year Bottom-Line Savings: $${(sow.estimatedLaborSavings - sow.totalFirstYearInvestment).toLocaleString()}
- Payback Horizon: ${sow.paybackDays} Days
- Projected Year-1 Net ROI: +${sow.projectedNetRoi.toLocaleString()}%

3. 6 DEPARTMENTAL SQUADS DELIVERED:
- Squad 1: Omnichannel Customer Experience & Rapid Deflection (25 FTEs)
- Squad 2: Autonomous Revenue Generation, Inbound & SDR Squad (20 FTEs)
- Squad 3: Supply Chain, Logistics, Multi-Branch & 3PL Restocking (20 FTEs)
- Squad 4: Finance, POS Audit, 3-Way Invoice Matching & AP/AR (15 FTEs)
- Squad 5: Autonomous DevOps, QA Smoke Testing & Incident Triage (10 FTEs)
- Squad 6: HR, Shift Scheduling, Compliance & Staff Onboarding (10 FTEs)

4. SLA & GOVERNANCE GUARANTEES:
- ${sow.slaUptime}
- Median Response Latency: ${sow.medianResponseTime}
- Safety Model: ${sow.governanceModel}

Executed on behalf of Client: _______________________ Date: _________
Executed on behalf of Synapse AI: ____________________ Date: _________
`;

    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-cyan-500/50 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative custom-scrollbar">
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950">
              <FileText className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Enterprise Commercial Proposal & Statement of Work
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Contract Reference: <strong className="text-cyan-300">{sow.contractId}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Contract' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800 hover:bg-cyan-900 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contract Customizer Bar */}
        <div className="bg-slate-950/70 p-4 border-b border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">
              Prospective Client / Enterprise Name:
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">
              Proposal Price Tier:
            </label>
            <div className="flex gap-2">
              {[50000, 75000, 100000].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setTurnkeyPrice(p)}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-mono font-bold text-center border transition-all ${
                    turnkeyPrice === p
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  ${p.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contract Document Body (Formal Legal & Deliverables presentation) */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-300 text-xs sm:text-sm font-sans leading-relaxed">
          {/* Header Box */}
          <div className="border border-slate-800 rounded-xl p-5 bg-slate-950/60 font-mono text-xs">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3 mb-3">
              <div>
                <span className="text-slate-500 block">PROVIDER:</span>
                <span className="font-bold text-white text-sm">SYNAPSE AI WORKFORCE SYSTEMS INC.</span>
                <p className="text-slate-400">Autonomous Enterprise Systems Division</p>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block">CLIENT ENTERPRISE:</span>
                <span className="font-bold text-cyan-300 text-sm">{sow.clientCompanyName}</span>
                <p className="text-slate-400">Industry: {sow.industry}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
              <div>
                <span className="text-slate-500">Effective Date:</span>
                <div className="text-white font-bold">{sow.effectiveDate}</div>
              </div>
              <div>
                <span className="text-slate-500">Target Displaced FTEs:</span>
                <div className="text-cyan-400 font-bold">{sow.headcountTarget} Workers</div>
              </div>
              <div>
                <span className="text-slate-500">System Availability:</span>
                <div className="text-emerald-400 font-bold">99.95% Tier-4 SLA</div>
              </div>
              <div>
                <span className="text-slate-500">First-Year Investment:</span>
                <div className="text-white font-bold">${sow.totalFirstYearInvestment.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Section 1: Executive Purpose */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-cyan-400 mb-2">
              1. Executive Purpose & Scope of Automation
            </h4>
            <p>
              This Master Services Agreement and Statement of Work authorizes the deployment of the
              <strong> SYNAPSE Autonomous AI Workforce Operating System</strong> to replace and augment
              <strong> {sow.headcountTarget} full-time equivalent (FTE) operational personnel</strong> across the
              Client&apos;s corporate divisions and operating branches. The system is designed to provide 24/7/365 uninterrupted
              business execution with sub-45-second task turnaround and zero human latency.
            </p>
          </div>

          {/* Section 2: Financial Investment & ROI Guarantee */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-cyan-400 mb-2">
              2. Commercial Investment & Verified Return on Investment
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3 font-mono">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block">One-Time Turnkey License</span>
                <span className="text-lg font-bold text-white">${sow.turnkeyFee.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 block">Complete deployment & IP access</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Traditional Labor Replaced</span>
                <span className="text-lg font-bold text-rose-400">${sow.estimatedLaborSavings.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 block">Annual baseline cost</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Net 1-Year Gain</span>
                <span className="text-lg font-bold text-emerald-400">
                  +${(sow.estimatedLaborSavings - sow.totalFirstYearInvestment).toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-300 block">Payback in {sow.paybackDays} Days</span>
              </div>
            </div>
          </div>

          {/* Section 3: The 6 Departmental Squads */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-cyan-400 mb-2">
              3. Deliverables: 6 Synchronized Autonomous Squads (100 FTE Capacity)
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-2">
                <span className="font-mono font-bold text-cyan-400 shrink-0">Squad 1:</span>
                <span><strong>Customer Experience & Omnichannel Support (25 FTEs):</strong> 24/7 ticket deflection, refunds, returns verification, and multilingual VIP retention.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-2">
                <span className="font-mono font-bold text-cyan-400 shrink-0">Squad 2:</span>
                <span><strong>Autonomous Revenue Generation & Inbound SDRs (20 FTEs):</strong> Lead enrichment, hyper-personalized outreach, objection handling, and executive meeting scheduling.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-2">
                <span className="font-mono font-bold text-cyan-400 shrink-0">Squad 3:</span>
                <span><strong>Supply Chain, Logistics & Multi-Branch Restocking (20 FTEs):</strong> Predictive inventory replenishment, inter-branch balance transfers, supplier PO creation, and 3PL warehouse sync.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-2">
                <span className="font-mono font-bold text-cyan-400 shrink-0">Squad 4:</span>
                <span><strong>Finance, AP/AR & Daily Cashflow Audit (15 FTEs):</strong> OCR 3-way invoice matching, POS settlement reconciliation, chargeback defense, and automated general ledger posting.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-2">
                <span className="font-mono font-bold text-cyan-400 shrink-0">Squad 5:</span>
                <span><strong>DevOps, QA Smoke Testing & Incident Sentry (10 FTEs):</strong> Automated regression testing, vulnerability scanning, cloud cost optimization, and real-time error deflection.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-2">
                <span className="font-mono font-bold text-cyan-400 shrink-0">Squad 6:</span>
                <span><strong>HR, Shift Scheduling & Safety Compliance (10 FTEs):</strong> Candidate resume screening, automated shift coverage algorithms, and regulatory compliance logging.</span>
              </div>
            </div>
          </div>

          {/* Section 4: Implementation Milestones */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-cyan-400 mb-2">
              4. Turnkey Phased Rollout Schedule
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-cyan-400 font-bold">Week 1: Ingestion</div>
                <div className="text-slate-400 text-[11px] mt-1">API integration, ERP/CRM data connection, and agent prompt calibrations.</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-cyan-400 font-bold">Week 2: Shadow Swarm</div>
                <div className="text-slate-400 text-[11px] mt-1">Agents run in observation mode alongside existing staff to establish 99%+ parity.</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-cyan-400 font-bold">Week 3: Cutover</div>
                <div className="text-slate-400 text-[11px] mt-1">Autonomous dispatch engaged with HITL governance console activated.</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-cyan-400 font-bold">Week 4: Optimization</div>
                <div className="text-slate-400 text-[11px] mt-1">Full 100 FTE displacement achieved with continuous margin audit tracking.</div>
              </div>
            </div>
          </div>

          {/* Section 5: Signatures */}
          <div className="pt-6 border-t border-slate-800 grid grid-cols-2 gap-8 font-mono text-xs">
            <div>
              <div className="text-slate-400 mb-6">AUTHORIZED SIGNATURE (CLIENT):</div>
              <div className="border-b border-slate-600 pb-1 text-white font-bold">
                {sow.clientCompanyName}
              </div>
              <div className="text-slate-500 mt-1">Title: Chief Executive Officer / Chief Operating Officer</div>
              <div className="text-slate-500">Date: {sow.effectiveDate}</div>
            </div>

            <div>
              <div className="text-slate-400 mb-6">AUTHORIZED SIGNATURE (PROVIDER):</div>
              <div className="border-b border-slate-600 pb-1 text-cyan-300 font-bold">
                Synapse Autonomous Systems Inc.
              </div>
              <div className="text-slate-500 mt-1">Title: Enterprise Managing Director</div>
              <div className="text-slate-500">Date: {sow.effectiveDate}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
