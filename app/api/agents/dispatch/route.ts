import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export interface SwarmExecutionStep {
  agentName: string;
  agentRole: string;
  department: string;
  stepType: 'thought' | 'tool_call' | 'decision' | 'communication';
  content: string;
  toolUsed?: string;
  toolPayload?: Record<string, unknown>;
  timestamp: string;
}

export interface SwarmDispatchResponse {
  taskId: string;
  industry: string;
  macroObjective: string;
  status: 'COMPLETED' | 'AWAITING_EXECUTIVE_APPROVAL' | 'INTERVENED';
  riskScore: number;
  riskTier: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  estimatedLaborMinutesSaved: number;
  dollarsPreservedOrSaved: number;
  steps: SwarmExecutionStep[];
  executiveSummary: string;
  artifactsCreated: string[];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { objective, industry = 'ecommerce', branch = 'Main Headquarters' } = body;

    if (!objective || typeof objective !== 'string') {
      return NextResponse.json(
        { error: 'Objective string is required' },
        { status: 400 }
      );
    }

    const taskId = `TSK-${Date.now().toString(36).toUpperCase()}`;
    const nowIso = new Date().toLocaleTimeString();

    // Try Gemini API if key is available
    if (process.env.GEMINI_API_KEY) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const prompt = `You are the Master Swarm Orchestrator of SYNAPSE Enterprise AI Workforce OS (a $75,000 automated system replacing 100 corporate workers).
The user submitted an enterprise business objective or emergency:
Industry: ${industry}
Branch: ${branch}
Objective: "${objective}"

Execute this task across 3 to 4 specialized AI agents working as a synchronized autonomous workforce.
Provide a valid JSON response with EXACTLY this structure:
{
  "riskTier": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "riskScore": number (1-100),
  "status": "COMPLETED" | "AWAITING_EXECUTIVE_APPROVAL",
  "estimatedLaborMinutesSaved": number,
  "dollarsPreservedOrSaved": number,
  "executiveSummary": "1-2 paragraphs of sharp executive resolution",
  "artifactsCreated": ["list of generated files/records e.g. PO_Reorder_7421.pdf, Refund_Manifest.json"],
  "steps": [
    {
      "agentName": "Name of Agent (e.g. Master Swarm Orchestrator, Supply Chain Sentry, Customer Retention Concierge, Fiscal Auditor)",
      "agentRole": "Role Title",
      "department": "Department name",
      "stepType": "thought" | "tool_call" | "decision" | "communication",
      "content": "Detailed realistic thought, tool output, or agent action",
      "toolUsed": "Optional name of tool called (e.g. ERP_Inventory_Query, Stripe_Webhook_Dispatcher, OCR_Invoice_Matcher)",
      "toolPayload": { "sample": "details" },
      "timestamp": "HH:MM:SS"
    }
  ]
}
Include 4 to 6 detailed chronological steps demonstrating multi-agent coordination. Return JSON only, no markdown backticks.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          return NextResponse.json({
            taskId,
            industry,
            macroObjective: objective,
            ...parsed,
          });
        }
      } catch (geminiError) {
        console.warn('Gemini dispatch fallback to deterministic simulation:', geminiError);
        // Fallback to high-fidelity agent engine below
      }
    }

    // High-fidelity autonomous simulation fallback
    const fallbackResponse = generateDeterministicSwarmPlan(taskId, objective, industry, branch, nowIso);
    return NextResponse.json(fallbackResponse);

  } catch (error) {
    console.error('Error in agent dispatch route:', error);
    return NextResponse.json(
      { error: 'Internal agent execution failed' },
      { status: 500 }
    );
  }
}

function generateDeterministicSwarmPlan(
  taskId: string,
  objective: string,
  industry: string,
  branch: string,
  timestamp: string
): SwarmDispatchResponse {
  const isHighRisk = objective.toLowerCase().includes('refund') ||
    objective.toLowerCase().includes('damage') ||
    objective.toLowerCase().includes('fail') ||
    objective.toLowerCase().includes('spoilage') ||
    objective.toLowerCase().includes('4,500') ||
    objective.toLowerCase().includes('100,000');

  const riskTier = isHighRisk ? 'HIGH' : 'LOW';
  const riskScore = isHighRisk ? 78 : 14;
  const status = isHighRisk ? 'AWAITING_EXECUTIVE_APPROVAL' : 'COMPLETED';

  let steps: SwarmExecutionStep[] = [];
  let executiveSummary = '';
  let artifactsCreated: string[] = [];
  let dollarsPreserved = 14850;

  if (industry === 'hospitality') {
    steps = [
      {
        agentName: 'MaitreD-Orchestrator',
        agentRole: 'Lead Operations Dispatcher',
        department: 'Operations & Dining Concierge',
        stepType: 'thought',
        content: `Decomposed crisis for ${branch}: Cross-referencing cold-storage sensor telemetry with Saturday banquet RSVP manifest (380 guests).`,
        timestamp,
      },
      {
        agentName: 'SousChef-Logistics AI',
        agentRole: 'Culinary Supply Chain Sentry',
        department: 'Kitchen Logistics',
        stepType: 'tool_call',
        toolUsed: 'EDI_Wholesale_Transfer_Engine',
        toolPayload: {
          sourceBranch: 'Victoria Island Central Depo',
          targetBranch: branch,
          allocatedSKUs: ['Jumbo Tiger Prawns 45kg', 'Prime Goat Ribs 80kg', 'Fresh Scent Leaf 12kg'],
          transitTimeMinutes: 38,
        },
        content: `Dispatched cold-chain courier transfer from VI branch warehouse. Verified cold-storage temp at 2.4°C throughout transit.`,
        timestamp,
      },
      {
        agentName: 'FiscalAuditor-F&B',
        agentRole: 'POS & Food Cost Controller',
        department: 'Finance',
        stepType: 'decision',
        content: `Calculated inter-branch ledger credit of $3,420. Rebalanced food-cost variance to maintain 26.8% plate margin.`,
        timestamp,
      },
      {
        agentName: 'GuestConcierge-VIP',
        agentRole: 'Banquet & Client Retention Sentry',
        department: 'Guest Experience',
        stepType: 'communication',
        content: `Broadcasted silent service prep update to lead banquet coordinator. Pre-printed customized place cards with zero wait time.`,
        timestamp,
      },
    ];
    executiveSummary = `The multi-agent swarm intercepted potential ingredient shortage at ${branch} with zero disruption to the 380-guest dinner banquet. Autonomous inter-branch transfer routed supplies within 38 minutes while holding food-cost margins strictly at 26.8%.`;
    artifactsCreated = ['InterBranch_Transfer_Manifest_VI_IKEJA.pdf', 'Banquet_380_Catering_Ledger.json', 'ColdChain_Telemetry_Report.csv'];
    dollarsPreserved = 24600;
  } else if (industry === 'technology') {
    steps = [
      {
        agentName: 'DevOpsSentinel-Max',
        agentRole: 'Autonomous Incident Commander',
        department: 'Engineering & DevOps',
        stepType: 'thought',
        content: `Analyzed telemetry logs across 45 enterprise tenant nodes. Identified bottleneck in billing webhook retry queue.`,
        timestamp,
      },
      {
        agentName: 'BugReproducer-L2',
        agentRole: 'Sandbox Diagnostic Worker',
        department: 'Technical Support',
        stepType: 'tool_call',
        toolUsed: 'Docker_Ephemeral_Debugger',
        toolPayload: {
          reproducedErrorCode: 'HTTP_429_RATE_LIMIT',
          retryBackoffTarget: 'Exponential_Jitter_v3',
          affectedAccounts: 45,
        },
        content: `Spun up isolated sandbox cluster and successfully simulated idempotent retry patch with zero token leakage.`,
        timestamp,
      },
      {
        agentName: 'EnterpriseEscalation-AI',
        agentRole: 'VIP Customer Retention Concierge',
        department: 'Customer Success',
        stepType: 'communication',
        content: `Triggered proactive personalized status briefings to all affected CTO accounts, including 100% SLA uptime waiver credit.`,
        timestamp,
      },
      {
        agentName: 'FinOps-Master',
        agentRole: 'Revenue Recognition Sentry',
        department: 'Finance & Billing',
        stepType: 'decision',
        content: `Recovered $48,200 in pending enterprise renewals without manual finance intervention. Synced ledger to NetSuite.`,
        timestamp,
      },
    ];
    executiveSummary = `Incident resolved in 4.2 minutes with 0 minutes of downtime. Idempotent webhook retry patch successfully applied to billing cluster, recovering $48,200 in ARR while preserving enterprise SLA trust.`;
    artifactsCreated = ['Incident_PostMortem_INC8492.md', 'Stripe_Recovery_Audit.csv', 'Automated_Patch_PR_9182.diff'];
    dollarsPreserved = 48200;
  } else {
    // E-Commerce
    steps = [
      {
        agentName: 'Master-Orchestrator',
        agentRole: 'Swarm Task Commander',
        department: 'Operations HQ',
        stepType: 'thought',
        content: `Ingested objective: "${objective}". Mobilizing Supply Chain, Customer Retention, and Fiscal Audit swarms simultaneously.`,
        timestamp,
      },
      {
        agentName: '3PL-Logistics Fleet',
        agentRole: 'Fulfillment Routing Agent',
        department: 'Supply Chain',
        stepType: 'tool_call',
        toolUsed: 'Warehouse_Allocation_Engine',
        toolPayload: {
          reallocatedUnits: 1200,
          alternateFacility: 'Hub-West-04',
          freightRateDiscount: '14.2%',
        },
        content: `Queried 3PL warehouse inventory. Re-routed orders from secondary distribution hub to guarantee 48-hour delivery SLA.`,
        timestamp,
      },
      {
        agentName: 'Returns-Gatekeeper AI',
        agentRole: 'Customer RMA & Refund Sentry',
        department: 'Customer Experience',
        stepType: 'tool_call',
        toolUsed: 'Vision_Damage_Verification_API',
        toolPayload: {
          damagedUnitsLogged: 216,
          supplierClaimRef: 'CLM-SUP-8192',
          insuranceCoverage: '100% Guaranteed',
        },
        content: `Generated automated supplier freight claim for damaged stock with photo manifests, preserving $18,400 in direct inventory cost.`,
        timestamp,
      },
      {
        agentName: 'FiscalSentinel-HQ',
        agentRole: 'Financial Risk Controller',
        department: 'Finance & Accounting',
        stepType: 'decision',
        content: `Filed carrier insurance indemnification and scheduled chargeback reserve hold. Synced general ledger entries.`,
        timestamp,
      },
    ];
    executiveSummary = `Autonomous multi-agent execution completed. Inventory re-routed to meet delivery SLAs for 1,200 customers while recovering $18,400 in damaged stock claims from the freight supplier without requiring human staff hours.`;
    artifactsCreated = ['Supplier_Claim_Dossier_CLM8192.pdf', 'ReRoute_Manifest_HubWest.json', 'Customer_Delivery_Tracker.csv'];
    dollarsPreserved = 18400;
  }

  return {
    taskId,
    industry,
    macroObjective: objective,
    status,
    riskScore,
    riskTier,
    estimatedLaborMinutesSaved: 340,
    dollarsPreservedOrSaved: dollarsPreserved,
    steps,
    executiveSummary,
    artifactsCreated,
  };
}
