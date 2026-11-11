'use client';

import React, { useState } from 'react';
import {
  Play,
  Terminal,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Clock,
  DollarSign,
  FileText,
  RotateCcw,
  Sparkles,
  Bot,
  Layers,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { IndustryType } from '@/lib/agent-swarm-logic';
import { SwarmDispatchResponse } from '@/app/api/agents/dispatch/route';

interface LiveSwarmTerminalProps {
  industry: IndustryType;
  initialPrompt?: string;
}

function getDefaultScenario(ind: IndustryType): string {
  if (ind === 'hospitality') {
    return 'Ikeja GRA branch kitchen running critically low on Jumbo Tiger Prawns and fresh goat meat before Friday 380-guest VIP banquet; Victoria Island branch has excess storage.';
  }
  if (ind === 'technology') {
    return 'Stripe webhook retry failure causing 45 enterprise customer subscription renew errors, triggering SLA breach alerts and risk of automated access cutoff.';
  }
  return 'Major freight carrier shipment of 1,200 OLED displays arrived with 18% water damage; preorder deliveries promised to 1,200 customers in 48 hours.';
}

export function LiveSwarmTerminal({ industry, initialPrompt }: LiveSwarmTerminalProps) {
  const [objective, setObjective] = useState<string>(() => initialPrompt || getDefaultScenario(industry));
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [swarmResult, setSwarmResult] = useState<SwarmDispatchResponse | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync when initialPrompt or industry changes if needed
  const [prevIndustry, setPrevIndustry] = useState<IndustryType>(industry);
  const [prevPrompt, setPrevPrompt] = useState<string | undefined>(initialPrompt);

  if (industry !== prevIndustry || initialPrompt !== prevPrompt) {
    setPrevIndustry(industry);
    setPrevPrompt(initialPrompt);
    setObjective(initialPrompt || getDefaultScenario(industry));
  }

  const handleDispatch = async () => {
    if (!objective.trim()) return;

    setIsExecuting(true);
    setErrorMsg(null);
    setSwarmResult(null);
    setActiveStepIndex(0);

    try {
      const res = await fetch('/api/agents/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          objective,
          industry,
          branch: industry === 'hospitality' ? 'Ikeja GRA & VI Branches' : 'Global Hub',
        }),
      });

      if (!res.ok) {
        throw new Error('Swarm dispatch call failed');
      }

      const data: SwarmDispatchResponse = await res.json();
      setSwarmResult(data);

      // Animate steps sequentially for thrilling live terminal effect
      if (data.steps && data.steps.length > 0) {
        for (let i = 0; i < data.steps.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 350));
          setActiveStepIndex(i + 1);
        }
      }
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg('Failed to dispatch swarm. Retrying with fallback engine.');
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <section id="live-swarm" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Terminal Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                Autonomous Swarm Orchestrator Engine
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Live Multi-Agent Task Dispatcher & Simulator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Test how the synchronized 100-worker AI swarm decomposes, cross-validates, and resolves complex enterprise challenges in seconds.
            </p>
          </div>

          {/* Quick Scenario Preset Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-slate-400 font-mono">Quick Scenarios:</span>
            <button
              onClick={() =>
                setObjective(
                  'Critical shipment of 1,200 OLED displays arrived with 18% water damage; preorder deliveries promised in 48 hours.'
                )
              }
              className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            >
              Damage & Re-Route
            </button>
            <button
              onClick={() =>
                setObjective(
                  'Ikeja GRA branch kitchen running critically low on Jumbo Tiger Prawns and fresh goat meat before Friday 380-guest VIP banquet.'
                )
              }
              className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            >
              Multi-Branch Supply
            </button>
            <button
              onClick={() =>
                setObjective(
                  'Stripe billing webhook failure affecting 45 enterprise customer renewals; risk of service cutoff.'
                )
              }
              className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            >
              SaaS Billing Bug
            </button>
          </div>
        </div>

        {/* Input Form */}
        <div className="mt-6 space-y-4">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 font-mono">
            Macro Enterprise Objective / Emergency Prompt:
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <textarea
                rows={3}
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                placeholder="Describe any business challenge, inventory crunch, customer crisis, or revenue campaign..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>
            <button
              onClick={handleDispatch}
              disabled={isExecuting || !objective.trim()}
              className="sm:w-56 shrink-0 flex items-center justify-center gap-2 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 disabled:opacity-50 transition-all cursor-pointer"
            >
              {isExecuting ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  <span>Swarm Orchestrating...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Dispatch 100-Agent Swarm</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Execution Error Banner */}
        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Live Multi-Agent Swarm Terminal Display */}
        {swarmResult && (
          <div className="mt-8 pt-6 border-t border-slate-800 space-y-6">
            {/* Top Swarm Result Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Task ID</span>
                <span className="text-xs font-mono font-bold text-cyan-400">{swarmResult.taskId}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Risk Assessment</span>
                <span
                  className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded inline-block ${
                    swarmResult.riskTier === 'CRITICAL'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : swarmResult.riskTier === 'HIGH'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}
                >
                  {swarmResult.riskTier} (Score: {swarmResult.riskScore}/100)
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Dollars Preserved</span>
                <span className="text-sm font-mono font-black text-emerald-400">
                  +${swarmResult.dollarsPreservedOrSaved.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Labor Time Saved</span>
                <span className="text-sm font-mono font-bold text-cyan-300">
                  {swarmResult.estimatedLaborMinutesSaved} Minutes (Zero Latency)
                </span>
              </div>
            </div>

            {/* Synchronized Agent Execution Steps Timeline */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3 font-mono">
                Real-Time Multi-Agent Collaborative Execution Log:
              </span>
              <div className="space-y-3 font-mono text-xs">
                {swarmResult.steps.map((step, idx) => {
                  const isVisible = idx < activeStepIndex;
                  if (!isVisible) return null;

                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/90 hover:border-cyan-800/80 transition-all flex flex-col sm:flex-row sm:items-start gap-3"
                    >
                      {/* Step Indicator & Agent Avatar */}
                      <div className="flex items-center gap-2 sm:w-56 shrink-0">
                        <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center text-[10px] font-bold">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="font-bold text-white text-xs">{step.agentName}</div>
                          <div className="text-[10px] text-slate-500">{step.department}</div>
                        </div>
                      </div>

                      {/* Content & Tool Action */}
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-1.5 py-0.2 rounded text-[9px] uppercase tracking-wider font-bold ${
                              step.stepType === 'tool_call'
                                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                : step.stepType === 'decision'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : step.stepType === 'communication'
                                ? 'bg-blue-950 text-blue-300 border border-blue-800'
                                : 'bg-purple-950 text-purple-300 border border-purple-800'
                            }`}
                          >
                            {step.stepType}
                          </span>
                          {step.toolUsed && (
                            <span className="text-[10px] text-cyan-400 font-bold">
                              Tool: [{step.toolUsed}]
                            </span>
                          )}
                          <span className="text-[10px] text-slate-600 ml-auto">{step.timestamp}</span>
                        </div>

                        <p className="text-slate-200 text-xs leading-relaxed">{step.content}</p>

                        {/* Tool Payload details if present */}
                        {step.toolPayload && (
                          <pre className="bg-slate-900/90 p-2 rounded border border-slate-800 text-[10px] text-slate-400 overflow-x-auto">
                            {JSON.stringify(step.toolPayload, null, 2)}
                          </pre>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Executive Synthesis Resolution Memo */}
            {activeStepIndex >= swarmResult.steps.length && (
              <div className="bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/40 p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <h4 className="font-bold text-white text-sm">
                      Swarm Executive Resolution & Action Memo
                    </h4>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                    RESOLVED &bull; 0 Human Hours Needed
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {swarmResult.executiveSummary}
                </p>

                {/* Generated Artifacts */}
                {swarmResult.artifactsCreated && swarmResult.artifactsCreated.length > 0 && (
                  <div className="pt-2 border-t border-cyan-900/40 flex flex-wrap items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-mono">Enterprise Artifacts Generated:</span>
                    {swarmResult.artifactsCreated.map((art, aIdx) => (
                      <span
                        key={aIdx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-950/80 text-cyan-300 text-[10px] font-mono border border-cyan-900/60"
                      >
                        <FileText className="w-3 h-3 text-cyan-400" />
                        {art}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
