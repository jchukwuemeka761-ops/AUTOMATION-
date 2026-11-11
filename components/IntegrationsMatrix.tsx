'use client';

import React, { useState } from 'react';
import {
  Globe,
  Layers,
  CheckCircle2,
  Zap,
  RefreshCw,
  Server,
  Lock,
  ArrowRight,
} from 'lucide-react';

interface IntegrationConnector {
  id: string;
  name: string;
  category: string;
  status: 'CONNECTED' | 'SYNCHRONIZED' | 'IDLE';
  latencyMs: number;
  events24h: number;
}

export function IntegrationsMatrix({ onTriggerWebhook }: { onTriggerWebhook: (source: string) => void }) {
  const [connectors, setConnectors] = useState<IntegrationConnector[]>([
    { id: 'int-1', name: 'Shopify Plus / POS', category: 'E-Commerce & Orders', status: 'SYNCHRONIZED', latencyMs: 38, events24h: 18400 },
    { id: 'int-2', name: 'Salesforce & HubSpot CRM', category: 'Revenue & Pipeline', status: 'SYNCHRONIZED', latencyMs: 52, events24h: 9200 },
    { id: 'int-3', name: 'Zendesk / Gorgias Support', category: 'Omnichannel CX', status: 'SYNCHRONIZED', latencyMs: 24, events24h: 34100 },
    { id: 'int-4', name: 'QuickBooks & NetSuite ERP', category: 'Ledger & Accounting', status: 'SYNCHRONIZED', latencyMs: 85, events24h: 4600 },
    { id: 'int-5', name: 'Stripe & Merchant Terminals', category: 'Payments & POS', status: 'SYNCHRONIZED', latencyMs: 19, events24h: 21800 },
    { id: 'int-6', name: 'Jira & GitHub Enterprise', category: 'DevOps & Engineering', status: 'SYNCHRONIZED', latencyMs: 44, events24h: 11200 },
    { id: 'int-7', name: 'Workday & BambooHR', category: 'People Operations', status: 'SYNCHRONIZED', latencyMs: 91, events24h: 1800 },
    { id: 'int-8', name: 'Slack & Teams Dispatcher', category: 'Enterprise Comms', status: 'SYNCHRONIZED', latencyMs: 14, events24h: 42900 },
  ]);

  const [testingId, setTestingId] = useState<string | null>(null);

  const handleTestEvent = (connector: IntegrationConnector) => {
    setTestingId(connector.id);
    onTriggerWebhook(connector.name);

    setTimeout(() => {
      setTestingId(null);
    }, 1500);
  };

  return (
    <section id="integrations" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-semibold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Enterprise Systems Architecture</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Universal Enterprise Integrations & Webhooks
          </h2>
          <p className="mt-2 text-slate-400 text-sm max-w-2xl">
            Synapse binds directly to the company&apos;s existing software stack without requiring platform migrations or process redesign.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3.5 py-2 rounded-xl">
          <CheckCircle2 className="w-4 h-4" />
          <span>All 8 Enterprise Webhooks Active &bull; Zero Polling Overhead</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {connectors.map((c) => (
          <div
            key={c.id}
            className="bg-slate-900/60 border border-slate-800 hover:border-cyan-800 rounded-xl p-4 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">
                {c.category}
              </span>
              <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                {c.latencyMs}ms
              </span>
            </div>

            <h4 className="text-sm font-bold text-white mb-2">{c.name}</h4>

            <div className="text-[11px] font-mono text-slate-400 flex justify-between py-1.5 border-y border-slate-800/80 mb-3">
              <span>24h Inbound:</span>
              <strong className="text-slate-200">{c.events24h.toLocaleString()} msgs</strong>
            </div>

            <button
              onClick={() => handleTestEvent(c)}
              disabled={testingId === c.id}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-slate-700 hover:border-cyan-700 transition-colors cursor-pointer"
            >
              {testingId === c.id ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>Webhook Dispatched!</span>
                </>
              ) : (
                <>
                  <Zap className="w-3 h-3 text-cyan-400" />
                  <span>Simulate Event</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
