'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  FileText,
  UserCheck,
  Lock,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { HitlAction, RiskLevel } from '@/lib/agent-swarm-logic';

export function GovernanceConsole() {
  const [actions, setActions] = useState<HitlAction[]>([
    {
      id: 'ACT-9021',
      title: 'Bulk Damage Compensation Credit ($14,800)',
      department: 'Finance & Accounting',
      agentName: 'FiscalSentinel-HQ',
      amount: 14800,
      riskLevel: 'CRITICAL',
      status: 'pending',
      timestamp: '10:48 AM',
      reasoning: 'Batch reimbursement proposed for 216 damaged items. Exceeds $10,000 auto-clearance threshold.',
      actionPayload: { carrierClaim: 'CLM-SUP-8192', affectedCustomers: 45 },
      approverRoleRequired: 'Executive Officer / VP of Finance',
    },
    {
      id: 'ACT-9022',
      title: 'Supplier Master Agreement Restocking Amendment',
      department: 'Culinary & Supply Chain',
      agentName: 'SousChef-Logistics AI',
      amount: 6400,
      riskLevel: 'HIGH',
      status: 'pending',
      timestamp: '10:52 AM',
      reasoning: 'Locking priority weekly cold-chain allocation for weekend VIP banquet surge across Victoria Island & Ikeja branches.',
      actionPayload: { vendor: 'Oceanic Seafood Wholesalers Ltd', commitmentMonths: 3 },
      approverRoleRequired: 'Branch General Manager',
    },
    {
      id: 'ACT-9023',
      title: 'Customer Loyalty Tier Elevation & $250 Dining Credit',
      department: 'Guest Experience',
      agentName: 'VIP Concierge Sentry',
      amount: 250,
      riskLevel: 'MEDIUM',
      status: 'pending',
      timestamp: '11:05 AM',
      reasoning: 'High-LTV customer flight delay caused late check-in. Autonomous appeasement with chef table priority.',
      actionPayload: { customerLtv: '$12,400', visitCount: 28 },
      approverRoleRequired: 'Shift Supervisor',
    },
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const handleAction = (id: string, newStatus: 'approved' | 'rejected') => {
    setActions((prev) =>
      prev.map((act) => (act.id === id ? { ...act, status: newStatus } : act))
    );

    const target = actions.find((a) => a.id === id);
    if (target) {
      setNotification(
        `Action ${id} (${target.title}) successfully marked as ${newStatus.toUpperCase()}. Audit log updated.`
      );
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const pendingCount = actions.filter((a) => a.status === 'pending').length;

  return (
    <section id="governance-console" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Enterprise Safety Architecture (SOC2 & HIPAA Compliant)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Human-in-the-Loop (HITL) Governance Console
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              100% autonomous operation for standard business tasks with strict cryptographic safety gates for high-risk actions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-right">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                Pending Approvals
              </span>
              <span className="text-xl font-bold font-mono text-amber-400">
                {pendingCount} Required
              </span>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-right">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                Autonomous Rate
              </span>
              <span className="text-xl font-bold font-mono text-emerald-400">
                97.4%
              </span>
            </div>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="mt-4 p-3.5 rounded-xl bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="font-mono">{notification}</span>
          </div>
        )}

        {/* Actions List */}
        <div className="mt-6 space-y-4">
          {actions.map((act) => (
            <div
              key={act.id}
              className={`p-5 rounded-2xl border transition-all ${
                act.status === 'approved'
                  ? 'bg-slate-950/40 border-emerald-900/60 opacity-75'
                  : act.status === 'rejected'
                  ? 'bg-slate-950/40 border-rose-900/60 opacity-60'
                  : 'bg-slate-950/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left Info */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400">{act.id}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                        act.riskLevel === 'CRITICAL'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : act.riskLevel === 'HIGH'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-blue-950 text-blue-300 border border-blue-800'
                      }`}
                    >
                      {act.riskLevel} RISK
                    </span>
                    <span className="text-xs text-slate-500 font-mono">&bull; {act.timestamp}</span>
                    <span className="text-xs text-slate-400 font-mono">
                      Agent: <strong className="text-cyan-300">{act.agentName}</strong> ({act.department})
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white">{act.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono">
                    {act.reasoning}
                  </p>

                  <div className="text-[11px] text-slate-400 font-mono pt-1">
                    Sign-off Authority: <span className="text-slate-200 font-semibold">{act.approverRoleRequired}</span>
                  </div>
                </div>

                {/* Right Decision Controls */}
                <div className="flex items-center gap-2 shrink-0">
                  {act.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleAction(act.id, 'rejected')}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-rose-950/80 text-rose-300 border border-slate-700 hover:border-rose-800 transition-colors cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                      <button
                        onClick={() => handleAction(act.id, 'approved')}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Approve Action</span>
                      </button>
                    </>
                  ) : (
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold font-mono uppercase tracking-wider ${
                        act.status === 'approved'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}
                    >
                      {act.status === 'approved' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                      <span>{act.status}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
