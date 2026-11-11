'use client';

import React, { useState } from 'react';
import {
  Users,
  Activity,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
  Sparkles,
  Bot,
  Zap,
  ShieldCheck,
  Package,
  ShoppingCart,
  Receipt,
  Truck,
  Code2,
  Calendar,
  UtensilsCrossed,
  MessageSquare,
  KeyRound,
  FileSpreadsheet,
  X,
} from 'lucide-react';
import { AgentWorker, DepartmentSquad } from '@/lib/agent-swarm-logic';

interface AgentFleetSquadGridProps {
  squads: DepartmentSquad[];
  onTriggerTaskForAgent: (agent: AgentWorker) => void;
}

export function AgentFleetSquadGrid({
  squads,
  onTriggerTaskForAgent,
}: AgentFleetSquadGridProps) {
  const [selectedSquadId, setSelectedSquadId] = useState<string>('all');
  const [inspectingAgent, setInspectingAgent] = useState<AgentWorker | null>(null);

  const filteredSquads =
    selectedSquadId === 'all'
      ? squads
      : squads.filter((s) => s.id === selectedSquadId);

  const totalHeadcount = squads.reduce((acc, s) => acc + s.headcountReplaced, 0);

  return (
    <section id="agent-fleet" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>100 Autonomous FTE Equivalent Squads</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            The 100-Agent Autonomous Workforce Fleet
          </h2>
          <p className="mt-2 text-slate-400 text-sm max-w-2xl">
            6 specialized operational squads running 24/7/365 with zero human latency.
            Each agent commands specific enterprise tools, APIs, and safety guardrails.
          </p>
        </div>

        {/* Squad Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setSelectedSquadId('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedSquadId === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Squads (100 FTEs)
          </button>
          {squads.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSquadId(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedSquadId === s.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {s.name.split(' ')[0]} ({s.headcountReplaced})
            </button>
          ))}
        </div>
      </div>

      {/* Squad Cards Grid */}
      <div className="space-y-10">
        {filteredSquads.map((squad) => (
          <div
            key={squad.id}
            className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden"
          >
            {/* Squad Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
              <div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-800">
                    Replaces {squad.headcountReplaced} Full-Time Workers
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Squad Lead: <span className="text-white font-semibold">{squad.leadAgent}</span>
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1.5">{squad.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{squad.description}</p>
              </div>

              {/* Squad Live KPI pill */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2 sm:text-right shrink-0">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
                  {squad.kpiTitle}
                </span>
                <span className="text-sm font-black text-emerald-400 font-mono">
                  {squad.kpiValue}
                </span>
              </div>
            </div>

            {/* Individual Agents inside this Squad */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {squad.agents.map((agent) => (
                <div
                  key={agent.id}
                  className="bg-slate-950/80 border border-slate-800/90 hover:border-cyan-500/50 rounded-xl p-4 transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow-cyan-500/10"
                >
                  <div>
                    {/* Top row: Agent Name & Status */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {agent.name}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-mono block">
                            {agent.role}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase font-mono tracking-wider ${
                          agent.status === 'executing'
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 animate-pulse'
                            : agent.status === 'optimizing'
                            ? 'bg-amber-950/80 text-amber-300 border border-amber-800/80'
                            : 'bg-slate-900 text-slate-400 border border-slate-800'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {agent.status}
                      </span>
                    </div>

                    {/* Headcount impact & stats */}
                    <div className="flex items-center justify-between text-[11px] font-mono py-2 my-2 border-y border-slate-900 text-slate-400">
                      <span>Equiv. FTEs: <strong className="text-cyan-300">+{agent.headcountEquivalent}</strong></span>
                      <span>24h Tasks: <strong className="text-slate-200">{agent.tasksCompleted24h.toLocaleString()}</strong></span>
                      <span>Accuracy: <strong className="text-emerald-400">{agent.successRate}%</strong></span>
                    </div>

                    {/* Current Live Task */}
                    <div className="mb-3">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block mb-0.5">
                        Live Execution Feed:
                      </span>
                      <p className="text-xs text-slate-300 line-clamp-2 bg-slate-900/60 p-2 rounded border border-slate-800/60 font-mono">
                        &gt; {agent.currentTask}
                      </p>
                    </div>

                    {/* Skills pills */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {agent.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 rounded text-[9px] bg-slate-900 text-slate-400 border border-slate-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between gap-2 mt-auto">
                    <button
                      type="button"
                      onClick={() => setInspectingAgent(agent)}
                      className="text-xs text-slate-400 hover:text-cyan-300 font-medium transition-colors"
                    >
                      Inspect Telemetry
                    </button>

                    <button
                      type="button"
                      onClick={() => onTriggerTaskForAgent(agent)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-cyan-950/90 text-cyan-300 border border-cyan-800 hover:bg-cyan-900 transition-colors"
                    >
                      <span>Task Swarm</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Inspect Agent Telemetry Modal */}
      {inspectingAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setInspectingAgent(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{inspectingAgent.name}</h3>
                <p className="text-xs text-slate-400 font-mono">{inspectingAgent.role} &bull; {inspectingAgent.department}</p>
              </div>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>Headcount Equivalent Displaced:</span>
                  <span className="text-cyan-300 font-bold">{inspectingAgent.headcountEquivalent} FTEs ($450,000/yr value)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Autonomy Confidence Threshold:</span>
                  <span className="text-emerald-400 font-bold">&gt; 96.5% Pre-approved</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Safety Sandbox:</span>
                  <span className="text-slate-300">Isolated Docker & API Token Vault</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                  Active Connected Enterprise Tools:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {inspectingAgent.skills.map((skill, idx) => (
                    <div key={idx} className="bg-slate-950/80 p-2 rounded border border-slate-800 text-slate-300 flex items-center gap-2">
                      <Zap className="w-3 h-3 text-cyan-400" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-cyan-950/30 border border-cyan-800/60 p-3 rounded-xl text-cyan-200">
                <span className="font-bold block mb-1 text-cyan-300">Current Execution Stream:</span>
                <p className="text-slate-300">{inspectingAgent.currentTask}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setInspectingAgent(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                Close Telemetry
              </button>
              <button
                type="button"
                onClick={() => {
                  const ag = inspectingAgent;
                  setInspectingAgent(null);
                  onTriggerTaskForAgent(ag);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20"
              >
                Send Task to {inspectingAgent.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
