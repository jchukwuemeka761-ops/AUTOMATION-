export interface RoiMetrics {
  traditionalAnnualPayroll: number;
  traditionalOverhead: number;
  traditionalTotalCost: number;
  synapseFirstYearCost: number;
  netFirstYearSavings: number;
  paybackPeriodDays: number;
  fiveYearNetSavings: number;
  roiPercentage: number;
}

export function calculateEnterpriseRoi(
  headcount: number,
  avgSalary: number = 60000,
  overheadMultiplier: number = 1.25,
  licenseFee: number = 75000,
  monthlyCompute: number = 3500
): RoiMetrics {
  const safeHeadcount = Math.max(1, headcount);
  const safeSalary = Math.max(1000, avgSalary);
  const safeOverhead = Math.max(1.0, overheadMultiplier);
  const safeLicense = Math.max(0, licenseFee);
  const safeMonthlyCompute = Math.max(0, monthlyCompute);

  const traditionalAnnualPayroll = safeHeadcount * safeSalary;
  const traditionalTotalCost = traditionalAnnualPayroll * safeOverhead;
  const traditionalOverhead = traditionalTotalCost - traditionalAnnualPayroll;

  const synapseFirstYearCost = safeLicense + (safeMonthlyCompute * 12);
  const netFirstYearSavings = Math.max(0, traditionalTotalCost - synapseFirstYearCost);

  // Payback period in days
  const dailyTraditionalCost = traditionalTotalCost / 365;
  const paybackPeriodDays = dailyTraditionalCost > 0
    ? Math.round((synapseFirstYearCost / dailyTraditionalCost) * 10) / 10
    : 365;

  // 5-year savings: Year 1 license+compute, Years 2-5 compute only
  const fiveYearSynapseCost = safeLicense + (safeMonthlyCompute * 12 * 5);
  const fiveYearTraditionalCost = traditionalTotalCost * 5;
  const fiveYearNetSavings = Math.max(0, fiveYearTraditionalCost - fiveYearSynapseCost);

  const roiPercentage = synapseFirstYearCost > 0
    ? Math.round((netFirstYearSavings / synapseFirstYearCost) * 100)
    : 0;

  return {
    traditionalAnnualPayroll,
    traditionalOverhead,
    traditionalTotalCost,
    synapseFirstYearCost,
    netFirstYearSavings,
    paybackPeriodDays,
    fiveYearNetSavings,
    roiPercentage,
  };
}

export type IndustryType = 'ecommerce' | 'technology' | 'hospitality' | 'financial';

export interface AgentWorker {
  id: string;
  name: string;
  role: string;
  department: string;
  squad: string;
  avatarIcon: string;
  headcountEquivalent: number;
  status: 'idle' | 'executing' | 'optimizing' | 'review_required';
  tasksCompleted24h: number;
  successRate: number;
  currentTask: string;
  skills: string[];
}

export interface DepartmentSquad {
  id: string;
  name: string;
  description: string;
  headcountReplaced: number;
  leadAgent: string;
  agents: AgentWorker[];
  kpiTitle: string;
  kpiValue: string;
  statusColor: string;
}

export function getWorkforceBreakdown(industry: IndustryType = 'ecommerce'): DepartmentSquad[] {
  if (industry === 'hospitality') {
    return [
      {
        id: 'guest_services',
        name: 'Guest Experience & Dining Concierge',
        description: 'Multi-branch table reservations, VIP guest dietary profiling, private banquet inquiries, and reviews triage.',
        headcountReplaced: 25,
        leadAgent: 'ChefMaitre-Prime',
        statusColor: 'cyan',
        kpiTitle: 'Daily Guest Bookings & Triage',
        kpiValue: '2,840 reservations / 99.8% confirmed',
        agents: [
          {
            id: 'hosp-1',
            name: 'Maitre-D Omni AI',
            role: 'Multi-Branch Reservation Dispatcher',
            department: 'Guest Services',
            squad: 'Guest Experience',
            avatarIcon: 'UtensilsCrossed',
            headcountEquivalent: 8,
            status: 'executing',
            tasksCompleted24h: 742,
            successRate: 99.4,
            currentTask: 'Auto-allocating VIP dining tables across Victoria Island & Ikeja GRA locations',
            skills: ['Reservation Engine', 'Floor Plan Optimization', 'Multi-Branch Load Balancing'],
          },
          {
            id: 'hosp-2',
            name: 'Gourmet Inquiries Bot',
            role: 'Menu, Allergies & Pan-African Wine Pairing',
            department: 'Guest Services',
            squad: 'Guest Experience',
            avatarIcon: 'Sparkles',
            headcountEquivalent: 7,
            status: 'idle',
            tasksCompleted24h: 531,
            successRate: 99.9,
            currentTask: 'Assisting wedding banquet coordinator with seafood okra dietary checklist',
            skills: ['Allergen Matrix', 'Catering Quotations', 'VIP Preferences CRM'],
          },
          {
            id: 'hosp-3',
            name: 'Feedback & Reputation Sentry',
            role: 'Social Sentiment & Delivery Review Deflector',
            department: 'Guest Services',
            squad: 'Guest Experience',
            avatarIcon: 'HeartPulse',
            headcountEquivalent: 10,
            status: 'optimizing',
            tasksCompleted24h: 914,
            successRate: 98.8,
            currentTask: 'Intercepting 2-star takeaway courier delay and offering instant chef voucher',
            skills: ['Sentiment Analysis', 'Instant Compensation Gate', 'Google Review Alerts'],
          },
        ],
      },
      {
        id: 'banquets_events',
        name: 'Banquets, Corporate Catering & Sales',
        description: 'Autonomous corporate event pipeline, bulk takeaway logistics, and catering contract proposals.',
        headcountReplaced: 20,
        leadAgent: 'CateringDirector-AI',
        statusColor: 'emerald',
        kpiTitle: 'Event Pipeline Generated',
        kpiValue: '$185,000 corporate catering pipeline',
        agents: [
          {
            id: 'hosp-4',
            name: 'Corporate Catering Prospector',
            role: 'Autonomous B2B Event Outreach',
            department: 'Catering & Sales',
            squad: 'Banquets & Corporate',
            avatarIcon: 'CalendarCheck',
            headcountEquivalent: 10,
            status: 'executing',
            tasksCompleted24h: 310,
            successRate: 97.2,
            currentTask: 'Pitching annual end-of-year executive banquets to 120 top financial institutions',
            skills: ['Outbound Sequencing', 'Budget Calculator', 'Custom Menu Proposal Writer'],
          },
          {
            id: 'hosp-5',
            name: 'Contract & Tasting Closer',
            role: 'Automated Event SOW & Deposit Collector',
            department: 'Catering & Sales',
            squad: 'Banquets & Corporate',
            avatarIcon: 'ReceiptCheck',
            headcountEquivalent: 10,
            status: 'idle',
            tasksCompleted24h: 184,
            successRate: 99.1,
            currentTask: 'Sending payment gateway deposit link for 350-guest diplomatic gala',
            skills: ['Contract Generation', 'Payment Webhook Sentry', 'Calendar Lock'],
          },
        ],
      },
      {
        id: 'kitchen_inventory',
        name: 'Culinary Supply Chain & Cold-Chain Ops',
        description: 'Real-time ingredient restock forecasting, fresh seafood & farm wholesale procurement, inter-branch transfers.',
        headcountReplaced: 20,
        leadAgent: 'SousChef-Logistics',
        statusColor: 'amber',
        kpiTitle: 'Food Waste Avoidance',
        kpiValue: '98.6% yield / $42,000 monthly spoilage saved',
        agents: [
          {
            id: 'hosp-6',
            name: 'Produce & Protein Forecaster',
            role: 'Predictive Stocking & Chef Re-Order Sentinel',
            department: 'Kitchen Logistics',
            squad: 'Supply Chain',
            avatarIcon: 'Package',
            headcountEquivalent: 10,
            status: 'executing',
            tasksCompleted24h: 620,
            successRate: 99.6,
            currentTask: 'Forecasting jumbo tiger prawns and goat meat consumption for weekend rush',
            skills: ['Demand Forecasting', 'Vendor EDI', 'Shelf-Life Expiry Alerter'],
          },
          {
            id: 'hosp-7',
            name: 'Inter-Branch Stock Transfer Bot',
            role: 'Inter-Branch Balancer (Ikeja GRA <-> VI)',
            department: 'Kitchen Logistics',
            squad: 'Supply Chain',
            avatarIcon: 'Truck',
            headcountEquivalent: 10,
            status: 'optimizing',
            tasksCompleted24h: 340,
            successRate: 98.9,
            currentTask: 'Balancing premium vintage wine stock between Ikeja GRA and Victoria Island cellar',
            skills: ['Stock Route Optimization', 'Courier Dispatch', 'Transfer Ledger'],
          },
        ],
      },
      {
        id: 'fnb_finance',
        name: 'F&B Finance, POS Audit & Daily Cashflow',
        description: 'Automated POS reconciliation, supplier invoice verification, food cost margin tracking, vendor payments.',
        headcountReplaced: 15,
        leadAgent: 'LedgerController-F&B',
        statusColor: 'violet',
        kpiTitle: 'Audit Accuracy',
        kpiValue: '100% daily register & card settlement match',
        agents: [
          {
            id: 'hosp-8',
            name: 'POS & Card Settlement Auditor',
            role: '3-Way Daily Cash & POS Reconciler',
            department: 'Finance',
            squad: 'Audit & POS',
            avatarIcon: 'BadgeDollarSign',
            headcountEquivalent: 8,
            status: 'idle',
            tasksCompleted24h: 1290,
            successRate: 100.0,
            currentTask: 'Reconciling shift terminals against bank merchant statements',
            skills: ['POS Reconciler', 'Stripe/Terminal Matcher', 'Discrepancy Tagger'],
          },
          {
            id: 'hosp-9',
            name: 'Supplier Invoice OCR Matcher',
            role: 'Food Cost & Wholesale Invoice Verifier',
            department: 'Finance',
            squad: 'Audit & POS',
            avatarIcon: 'FileSpreadsheet',
            headcountEquivalent: 7,
            status: 'executing',
            tasksCompleted24h: 412,
            successRate: 99.2,
            currentTask: 'Verifying delivery weight manifest from fresh fish supplier against PO price',
            skills: ['OCR Invoice Parsing', 'Purchase Order Verification', 'Price Variance Audit'],
          },
        ],
      },
      {
        id: 'hosp_tech',
        name: 'Hospitality Tech & Online Order Dispatch',
        description: 'Online ordering uptime, kitchen display systems (KDS) latency, third-party delivery aggregator sync.',
        headcountReplaced: 10,
        leadAgent: 'KDS-Sentry',
        statusColor: 'blue',
        kpiTitle: 'Online Order Latency',
        kpiValue: '0.4s sync to kitchen display screens',
        agents: [
          {
            id: 'hosp-10',
            name: 'Aggregator Bridge Agent',
            role: 'UberEats/DoorDash/Direct Web Order Sync',
            department: 'Tech & KDS',
            squad: 'Hospitality Tech',
            avatarIcon: 'Cpu',
            headcountEquivalent: 5,
            status: 'executing',
            tasksCompleted24h: 1840,
            successRate: 99.9,
            currentTask: 'Syncing online delivery surge orders directly to kitchen line printer queues',
            skills: ['Aggregator Webhooks', 'KDS Ticket Dispatch', 'Menu Modifier Sync'],
          },
          {
            id: 'hosp-11',
            name: 'Branch Infrastructure Monitor',
            role: 'POS Terminal, Wi-Fi & Generator Sentry',
            department: 'Tech & KDS',
            squad: 'Hospitality Tech',
            avatarIcon: 'ShieldAlert',
            headcountEquivalent: 5,
            status: 'idle',
            tasksCompleted24h: 580,
            successRate: 100.0,
            currentTask: 'Running heartbeat checks on backup power inverter and restaurant cloud gateways',
            skills: ['IoT Sentinel', 'Network Health Ping', 'Auto-Failover Router'],
          },
        ],
      },
      {
        id: 'hospitality_hr',
        name: 'Shift Scheduling, Waitstaff & Compliance',
        description: 'Dynamic floor shift scheduling, culinary hygiene compliance, staff tip pool calculation, onboarding.',
        headcountReplaced: 10,
        leadAgent: 'CrewMaster-AI',
        statusColor: 'rose',
        kpiTitle: 'Shift Fill Rate',
        kpiValue: '100% weekend cover / 0 unassigned stations',
        agents: [
          {
            id: 'hosp-12',
            name: 'Shift Roster Optimizer',
            role: 'Predictive Table-to-Server Staffing',
            department: 'People Operations',
            squad: 'Shift & Staffing',
            avatarIcon: 'Users',
            headcountEquivalent: 5,
            status: 'executing',
            tasksCompleted24h: 210,
            successRate: 99.0,
            currentTask: 'Auto-adjusting bartender and floor runner rosters based on rainy day reservation spikes',
            skills: ['Dynamic Scheduling', 'Labor Cost % Tracking', 'Overtime Sentry'],
          },
          {
            id: 'hosp-13',
            name: 'Hygiene & Compliance Auditor',
            role: 'HACCP & Kitchen Sanitation Verification',
            department: 'People Operations',
            squad: 'Shift & Staffing',
            avatarIcon: 'CheckCircle2',
            headcountEquivalent: 5,
            status: 'idle',
            tasksCompleted24h: 145,
            successRate: 100.0,
            currentTask: 'Verifying walk-in chiller temperature log entries and food safety certifications',
            skills: ['Sanitation Checklists', 'Audit Report Generator', 'Staff Certification Alerter'],
          },
        ],
      },
    ];
  }

  if (industry === 'technology') {
    return [
      {
        id: 'tech_support',
        name: 'Level 1-3 Enterprise Technical Support',
        description: 'Autonomous API debugging, customer ticket deflection, SLA breach prevention, and patch notes.',
        headcountReplaced: 25,
        leadAgent: 'SupportOmni-X',
        statusColor: 'cyan',
        kpiTitle: 'Median First-Response Time',
        kpiValue: '18 seconds / 94.2% autonomous close',
        agents: [
          {
            id: 'tech-1',
            name: 'L1 Instant Resolver',
            role: 'API, Auth & SDK Triage Agent',
            department: 'Technical Support',
            squad: 'L1-L3 Support',
            avatarIcon: 'MessageSquareText',
            headcountEquivalent: 12,
            status: 'executing',
            tasksCompleted24h: 1420,
            successRate: 98.9,
            currentTask: 'Resolving OAuth2 callback redirection errors for 45 developer signups',
            skills: ['Log Parsing', 'Code Snippet Generation', 'Zendesk Autoclose'],
          },
          {
            id: 'tech-2',
            name: 'L2 Bug Reproducer',
            role: 'Stack Trace Analysis & Sandbox Repro',
            department: 'Technical Support',
            squad: 'L1-L3 Support',
            avatarIcon: 'Terminal',
            headcountEquivalent: 8,
            status: 'executing',
            tasksCompleted24h: 410,
            successRate: 97.4,
            currentTask: 'Spinning up ephemeral docker container to reproduce customer GraphQL timeout',
            skills: ['Docker Sandbox', 'GraphQL Schema Query', 'Jira Issue Creator'],
          },
          {
            id: 'tech-3',
            name: 'Enterprise Escalation Concierge',
            role: 'Dedicated VIP SLA Watchdog',
            department: 'Technical Support',
            squad: 'L1-L3 Support',
            avatarIcon: 'ShieldAlert',
            headcountEquivalent: 5,
            status: 'idle',
            tasksCompleted24h: 98,
            successRate: 99.8,
            currentTask: 'Monitoring $250k ARR customer tenant uptime and latency thresholds',
            skills: ['SLA Monitor', 'PagerDuty Bridge', 'Executive Slack Broadcast'],
          },
        ],
      },
      {
        id: 'tech_sales',
        name: 'Autonomous Inbound & Outbound SDR Squad',
        description: 'Enriches developer signups, detects tech-stack signals, handles objections, books executive demos.',
        headcountReplaced: 20,
        leadAgent: 'RevenueHunter-Pro',
        statusColor: 'emerald',
        kpiTitle: 'Enterprise Pipeline Added',
        kpiValue: '$1,420,000 in qualified SQLs this month',
        agents: [
          {
            id: 'tech-4',
            name: 'Firmographic Lead Enricher',
            role: 'GitHub & LinkedIn Data Miner',
            department: 'Revenue & Sales',
            squad: 'SDR Swarm',
            avatarIcon: 'Target',
            headcountEquivalent: 8,
            status: 'executing',
            tasksCompleted24h: 2400,
            successRate: 99.1,
            currentTask: 'Scoring 850 newly registered engineering leaders based on team size & repo activity',
            skills: ['Apollo Enrichment', 'GitHub Org Intelligence', 'Predictive Deal Scoring'],
          },
          {
            id: 'tech-5',
            name: 'Hyper-Personalized Outreach SDR',
            role: 'Autonomous Cold Email & Social Drafter',
            department: 'Revenue & Sales',
            squad: 'SDR Swarm',
            avatarIcon: 'Send',
            headcountEquivalent: 7,
            status: 'executing',
            tasksCompleted24h: 1100,
            successRate: 98.4,
            currentTask: 'Drafting personalized multi-touch sequences citing prospect recent tech blog posts',
            skills: ['Dynamic Copywriting', 'Deliverability Optimization', 'Anti-Spam Verification'],
          },
          {
            id: 'tech-6',
            name: 'Demo Booking Concierge',
            role: 'Objection Handling & Calendar Setter',
            department: 'Revenue & Sales',
            squad: 'SDR Swarm',
            avatarIcon: 'Calendar',
            headcountEquivalent: 5,
            status: 'idle',
            tasksCompleted24h: 320,
            successRate: 96.8,
            currentTask: 'Securing meeting confirmation with VP of Infrastructure at Fortune 500 bank',
            skills: ['Cal.com / ChiliPiper API', 'Pricing FAQ Resolver', 'Time-zone Negotiator'],
          },
        ],
      },
      {
        id: 'tech_qa',
        name: 'Automated QA, CI/CD & DevOps Fleet',
        description: 'Auto-triage error logs, write smoke tests, run vulnerability scans, optimize cloud AWS/GCP bills.',
        headcountReplaced: 20,
        leadAgent: 'DevOpsSentinel-Max',
        statusColor: 'amber',
        kpiTitle: 'Test Coverage & Cloud Cost Cut',
        kpiValue: '100% PR smoke tested / $34,000 monthly cloud waste eliminated',
        agents: [
          {
            id: 'tech-7',
            name: 'Automated PR Reviewer & Tester',
            role: 'Static Code & Security Vulnerability Scanner',
            department: 'Engineering & QA',
            squad: 'DevOps & QA',
            avatarIcon: 'Code2',
            headcountEquivalent: 10,
            status: 'executing',
            tasksCompleted24h: 185,
            successRate: 99.5,
            currentTask: 'Scanning 14 open GitHub pull requests for OWASP vulnerabilities & SQL injections',
            skills: ['AST Code Parser', 'OWASP Ruleset', 'Automated Test Runner'],
          },
          {
            id: 'tech-8',
            name: 'Cloud FinOps Sentinel',
            role: 'Kubernetes & Serverless Idle Resource Reaper',
            department: 'Engineering & QA',
            squad: 'DevOps & QA',
            avatarIcon: 'Coins',
            headcountEquivalent: 10,
            status: 'optimizing',
            tasksCompleted24h: 430,
            successRate: 100.0,
            currentTask: 'Downscaling 38 idle staging pods and re-tagging unattached EBS volumes',
            skills: ['AWS Cost Explorer API', 'Kubernetes HPA Tuner', 'Spot Instance Allocator'],
          },
        ],
      },
      {
        id: 'tech_finance',
        name: 'SaaS Billing, Revenue Recognition & AP/AR',
        description: 'Stripe dunning automation, automated usage metering, ASC 606 revenue recognition, AP invoice matching.',
        headcountReplaced: 15,
        leadAgent: 'FinOps-Master',
        statusColor: 'violet',
        kpiTitle: 'Churn & Churn Recovery',
        kpiValue: '68% failed card recovery rate / $84k MRR saved',
        agents: [
          {
            id: 'tech-9',
            name: 'Smart Dunning & Payment Recovery',
            role: 'Smart Retries & B2B Invoicing Escalations',
            department: 'Finance & Billing',
            squad: 'FinOps Swarm',
            avatarIcon: 'CreditCard',
            headcountEquivalent: 8,
            status: 'executing',
            tasksCompleted24h: 890,
            successRate: 97.9,
            currentTask: 'Orchestrating smart retries for expired credit cards and sending updated portal links',
            skills: ['Stripe Billing Webhooks', 'Dunning Sequences', 'Payment Gateway Routing'],
          },
          {
            id: 'tech-10',
            name: 'Vendor AP & SaaS License Auditor',
            role: 'Duplicate SaaS Subscription Detector',
            department: 'Finance & Billing',
            squad: 'FinOps Swarm',
            avatarIcon: 'FileSpreadsheet',
            headcountEquivalent: 7,
            status: 'idle',
            tasksCompleted24h: 210,
            successRate: 99.7,
            currentTask: 'Flagging 18 unused software seats across engineering and sales divisions',
            skills: ['SaaS Spend Analyzer', 'QuickBooks Ledger Sync', 'Contract Expiry Tracker'],
          },
        ],
      },
      {
        id: 'tech_security',
        name: 'InfoSec, SOC2 Compliance & Data Privacy',
        description: 'Autonomous audit logging, employee access reviews, vendor risk questionnaires, privacy redaction.',
        headcountReplaced: 10,
        leadAgent: 'SecOfficer-AI',
        statusColor: 'blue',
        kpiTitle: 'Compliance Readiness',
        kpiValue: '100% continuous SOC2 & ISO 27001 audit score',
        agents: [
          {
            id: 'tech-11',
            name: 'Security Questionnaire Responder',
            role: 'Vendor Risk & RFP Compliance Bot',
            department: 'Security & Compliance',
            squad: 'InfoSec Fleet',
            avatarIcon: 'FileCheck',
            headcountEquivalent: 5,
            status: 'executing',
            tasksCompleted24h: 120,
            successRate: 98.7,
            currentTask: 'Auto-completing 240-question enterprise SIG security assessment for Fortune 100 prospect',
            skills: ['Compliance Knowledgebase', 'Vanta / Drata Bridge', 'RFP Answer Engine'],
          },
          {
            id: 'tech-12',
            name: 'Least-Privilege Access Auditor',
            role: 'Employee Role & Token Revocation Sentinel',
            department: 'Security & Compliance',
            squad: 'InfoSec Fleet',
            avatarIcon: 'KeyRound',
            headcountEquivalent: 5,
            status: 'idle',
            tasksCompleted24h: 640,
            successRate: 100.0,
            currentTask: 'Verifying IAM token expiry and flagging over-privileged AWS admin roles',
            skills: ['Okta/Google Workspace IAM', 'Zero Trust Verification', 'Audit Log Immutability'],
          },
        ],
      },
      {
        id: 'tech_hr',
        name: 'Autonomous Technical Recruiting & Onboarding',
        description: 'Screens engineering resumes, conducts automated coding triage, generates offer letters, auto-provisions laptop setups.',
        headcountReplaced: 10,
        leadAgent: 'TalentScout-Prime',
        statusColor: 'rose',
        kpiTitle: 'Time to First Technical Screen',
        kpiValue: '3.2 minutes / 88% candidate satisfaction',
        agents: [
          {
            id: 'tech-13',
            name: 'Code & Resume Evaluator',
            role: 'Candidate GitHub & Portfolio Analyzer',
            department: 'People Operations',
            squad: 'Talent Fleet',
            avatarIcon: 'UserCheck',
            headcountEquivalent: 5,
            status: 'executing',
            tasksCompleted24h: 420,
            successRate: 96.5,
            currentTask: 'Evaluating 85 Senior React/Node engineer applicants against production repo benchmarks',
            skills: ['Resume Semantic Parser', 'Code Assessment Evaluator', 'Greenhouse/Lever Sync'],
          },
          {
            id: 'tech-14',
            name: 'Day-1 Autonomous Onboarder',
            role: 'Account Provisioning & Policy Walkthrough',
            department: 'People Operations',
            squad: 'Talent Fleet',
            avatarIcon: 'Sparkles',
            headcountEquivalent: 5,
            status: 'idle',
            tasksCompleted24h: 75,
            successRate: 100.0,
            currentTask: 'Auto-provisioning GitHub, Slack, and VPN access for 4 new hires starting Monday',
            skills: ['Okta Scim API', 'Onboarding Checklist Automation', 'Company Wiki RAG'],
          },
        ],
      },
    ];
  }

  // Default: E-Commerce & Retail
  return [
    {
      id: 'ecom_support',
      name: 'Omnichannel Customer Experience Squad',
      description: '24/7 autonomous support across Email, Live Chat, WhatsApp, and SMS. Handles order tracking, returns, and damages.',
      headcountReplaced: 25,
      leadAgent: 'Aegis-Support',
      statusColor: 'cyan',
      kpiTitle: 'Daily Ticket Deflection',
      kpiValue: '93.8% resolved without human escalation',
      agents: [
        {
          id: 'ecom-1',
          name: 'Order & Shipping Resolv-AI',
          role: 'WISMO (Where Is My Order) & Carrier Triage',
          department: 'Customer Experience',
          squad: 'Omnichannel CX',
          avatarIcon: 'PackageCheck',
          headcountEquivalent: 10,
          status: 'executing',
          tasksCompleted24h: 2850,
          successRate: 99.4,
          currentTask: 'Resolving 312 delayed carrier scans with automated reshipment tracking tokens',
          skills: ['Shopify Order API', 'FedEx/UPS Tracking Webhook', 'Instant Customer Messaging'],
        },
        {
          id: 'ecom-2',
          name: 'Returns & Refund Gatekeeper',
          role: 'Autonomous RMA, Photo Damage Verification & Refunds',
          department: 'Customer Experience',
          squad: 'Omnichannel CX',
          avatarIcon: 'RotateCcw',
          headcountEquivalent: 8,
          status: 'executing',
          tasksCompleted24h: 1140,
          successRate: 98.7,
          currentTask: 'Verifying customer damage photo upload via Vision API and issuing return label',
          skills: ['Computer Vision Defect Check', 'Stripe Refund API', 'Warehouse Return Manifest'],
        },
        {
          id: 'ecom-3',
          name: 'VIP Concierge & Retention Sentry',
          role: 'High-LTV Customer Loyalty & Churn Prevention',
          department: 'Customer Experience',
          squad: 'Omnichannel CX',
          avatarIcon: 'Crown',
          headcountEquivalent: 7,
          status: 'optimizing',
          tasksCompleted24h: 620,
          successRate: 99.2,
          currentTask: 'Proactively issuing apology gift cards to 45 top-tier subscribers affected by inventory stockout',
          skills: ['Klaviyo Customer Profiles', 'Loyalty Program Integration', 'Churn Prediction Engine'],
        },
      ],
    },
    {
      id: 'ecom_sales',
      name: 'Revenue & Conversion Maximizer Squad',
      description: 'Cart abandonment recovery, upsell/cross-sell personalization, wholesale B2B quoting, and automated reviews collection.',
      headcountReplaced: 20,
      leadAgent: 'ConversionMax-Pro',
      statusColor: 'emerald',
      kpiTitle: 'Recovered Abandoned Revenue',
      kpiValue: '$340,000 monthly recovered checkout volume',
      agents: [
        {
          id: 'ecom-4',
          name: 'Cart Recovery & SMS Closer',
          role: 'Real-Time Dynamic Cart Abandonment Negotiator',
          department: 'Revenue & Growth',
          squad: 'Conversion Squad',
          avatarIcon: 'ShoppingCart',
          headcountEquivalent: 10,
          status: 'executing',
          tasksCompleted24h: 1850,
          successRate: 31.4,
          currentTask: 'Dispatching dynamic tiered discount SMS to 140 shoppers with carts > $250',
          skills: ['SMS Gateway', 'Cart Value Optimization', 'Real-Time Inventory Hold'],
        },
        {
          id: 'ecom-5',
          name: 'B2B Wholesale Account Executive',
          role: 'Autonomous Corporate Quoting & Net-30 Approval',
          department: 'Revenue & Growth',
          squad: 'Conversion Squad',
          avatarIcon: 'Briefcase',
          headcountEquivalent: 10,
          status: 'idle',
          tasksCompleted24h: 310,
          successRate: 97.8,
          currentTask: 'Generating $45,000 wholesale bulk purchase agreement for regional retailer',
          skills: ['Credit Check API', 'Wholesale Pricing Tiers', 'DocuSign Integration'],
        },
      ],
    },
    {
      id: 'ecom_supply',
      name: 'Supply Chain, 3PL & Inventory Fleet',
      description: 'Predictive inventory replenishment, supplier purchase order dispatch, 3PL warehouse sync, customs delay mitigation.',
      headcountReplaced: 20,
      leadAgent: 'SupplyLogistics-AI',
      statusColor: 'amber',
      kpiTitle: 'Stockout Prevention Rate',
      kpiValue: '99.94% in-stock rate across 12,000 SKUs',
      agents: [
        {
          id: 'ecom-6',
          name: 'Predictive Restock Sentry',
          role: 'Lead Time & Seasonal Demand Forecaster',
          department: 'Supply Chain',
          squad: 'Logistics Fleet',
          avatarIcon: 'TrendingUp',
          headcountEquivalent: 10,
          status: 'executing',
          tasksCompleted24h: 3400,
          successRate: 99.8,
          currentTask: 'Auto-generating purchase orders for 14 top-selling SKUs before Q4 supply crunch',
          skills: ['Time-Series Demand Modeling', 'ERP EDI Sync', 'Supplier Lead-Time Optimizer'],
        },
        {
          id: 'ecom-7',
          name: '3PL Fulfillment Auditor',
          role: 'Multi-Warehouse Routing & Split-Shipment Reducer',
          department: 'Supply Chain',
          squad: 'Logistics Fleet',
          avatarIcon: 'Boxes',
          headcountEquivalent: 10,
          status: 'optimizing',
          tasksCompleted24h: 4200,
          successRate: 99.6,
          currentTask: 'Rerouting 1,800 orders to West Coast warehouse to shave 1.8 shipping days',
          skills: ['Geographic Route Optimization', 'Carrier Rate Shopping', 'Split Order Minimizer'],
        },
      ],
    },
    {
      id: 'ecom_finance',
      name: 'E-Commerce Finance & Marketplace AP/AR',
      description: 'Automated 3-way matching between POs, receiving manifests, and supplier invoices. Chargeback disputer and fee auditor.',
      headcountReplaced: 15,
      leadAgent: 'FiscalSentinel-HQ',
      statusColor: 'violet',
      kpiTitle: 'Disputed Chargeback Win Rate',
      kpiValue: '84.2% chargebacks won ($118k preserved)',
      agents: [
        {
          id: 'ecom-8',
          name: 'Chargeback Defense Counsel',
          role: 'Autonomous Evidence Packager & Fraud Disputer',
          department: 'Finance & Accounting',
          squad: 'Fiscal Fleet',
          avatarIcon: 'ShieldCheck',
          headcountEquivalent: 8,
          status: 'executing',
          tasksCompleted24h: 145,
          successRate: 84.2,
          currentTask: 'Assembling delivery signature & IP proof dossiers for 12 friendly-fraud claims',
          skills: ['Evidence Aggregator', 'Payment Gateway Dispute API', 'Fraud Pattern Recognition'],
        },
        {
          id: 'ecom-9',
          name: 'Marketplace Fee & Ad Spend Auditor',
          role: 'Amazon/Meta Ad Spend & Seller Fee Reconciler',
          department: 'Finance & Accounting',
          squad: 'Fiscal Fleet',
          avatarIcon: 'BarChart3',
          headcountEquivalent: 7,
          status: 'idle',
          tasksCompleted24h: 310,
          successRate: 99.9,
          currentTask: 'Detecting $4,300 in duplicate Amazon FBA storage overcharges and filing claim',
          skills: ['Amazon SP-API', 'Meta Ad Account Ledger', 'Automated Dispute Filing'],
        },
      ],
    },
    {
      id: 'ecom_catalog',
      name: 'Catalog, SEO & Product Merchandising Squad',
      description: 'Generates SEO copy, updates tags, manages dynamic pricing elasticity against competitors, audits broken links.',
      headcountReplaced: 10,
      leadAgent: 'Merchandiser-Prime',
      statusColor: 'blue',
      kpiTitle: 'Catalog Efficiency',
      kpiValue: '4,500 SKU descriptions generated & live',
      agents: [
        {
          id: 'ecom-10',
          name: 'Dynamic Pricing Elasticity Bot',
          role: 'Real-Time Competitor Price Scraper & Margin Protector',
          department: 'Merchandising',
          squad: 'Catalog Squad',
          avatarIcon: 'Percent',
          headcountEquivalent: 5,
          status: 'executing',
          tasksCompleted24h: 8900,
          successRate: 99.4,
          currentTask: 'Adjusting prices within 5% guardrails based on competitor stock levels',
          skills: ['Scraper Proxy Engine', 'Margin Floor Guardrails', 'Shopify Price Update API'],
        },
        {
          id: 'ecom-11',
          name: 'AI Copywriter & Image Tag Optimizer',
          role: 'Multilingual Product Description & Schema.org Tagger',
          department: 'Merchandising',
          squad: 'Catalog Squad',
          avatarIcon: 'Wand2',
          headcountEquivalent: 5,
          status: 'idle',
          tasksCompleted24h: 1200,
          successRate: 99.7,
          currentTask: 'Generating localized German & Spanish copy for summer apparel collection',
          skills: ['SEO Copy Generation', 'Schema JSON-LD Injection', 'Alt-Text Vision Tagger'],
        },
      ],
    },
    {
      id: 'ecom_people',
      name: 'Warehouse Operations & Shift Workforce Bot',
      description: 'Warehouse picker shift optimization, seasonal temp worker onboarding, OSHA safety compliance monitoring.',
      headcountReplaced: 10,
      leadAgent: 'FloorManager-AI',
      statusColor: 'rose',
      kpiTitle: 'Warehouse Onboarding Speed',
      kpiValue: '12 minutes / 100% safety quiz pass rate',
      agents: [
        {
          id: 'ecom-12',
          name: 'Seasonal Staffing Dispatcher',
          role: 'Shift Fill & Overtime Minimization Optimizer',
          department: 'Operations & HR',
          squad: 'Warehouse People Ops',
          avatarIcon: 'Clock',
          headcountEquivalent: 5,
          status: 'executing',
          tasksCompleted24h: 310,
          successRate: 98.8,
          currentTask: 'Auto-booking 28 certified forklift operators for anticipated holiday intake spike',
          skills: ['Shift Scheduling Algorithm', 'SMS Shift Broadcast', 'Payroll Hours Sync'],
        },
        {
          id: 'ecom-13',
          name: 'Safety & Policy Compliance Sentry',
          role: 'Incident Logging & Safety Regulation Tracker',
          department: 'Operations & HR',
          squad: 'Warehouse People Ops',
          avatarIcon: 'AlertTriangle',
          headcountEquivalent: 5,
          status: 'idle',
          tasksCompleted24h: 120,
          successRate: 100.0,
          currentTask: 'Verifying daily warehouse equipment pre-check manifests and emergency exits',
          skills: ['OSHA Audit Checklist', 'Incident Report Generator', 'Safety Certification DB'],
        },
      ],
    },
  ];
}

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface HitlAction {
  id: string;
  title: string;
  department: string;
  agentName: string;
  amount?: number;
  riskLevel: RiskLevel;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
  reasoning: string;
  actionPayload: Record<string, unknown>;
  approverRoleRequired: string;
}

export function evaluateHumanInTheLoopRisk(action: {
  type: string;
  amount?: number;
  recipient?: string;
  impactLevel?: 'low' | 'medium' | 'high';
}): { riskLevel: RiskLevel; requiresApproval: boolean; approverRole: string } {
  const amount = action.amount || 0;

  if (amount >= 10000 || action.type === 'BULK_REFUND_BATCH' || action.type === 'DATA_PURGE') {
    return {
      riskLevel: 'CRITICAL',
      requiresApproval: true,
      approverRole: 'Executive Officer / VP of Finance',
    };
  }

  if (amount >= 2500 || action.type === 'VENDOR_CONTRACT_AMENDMENT' || action.type === 'MASS_CLIENT_EMAIL') {
    return {
      riskLevel: 'HIGH',
      requiresApproval: true,
      approverRole: 'Department Director / Branch Manager',
    };
  }

  if (amount >= 500 || action.type === 'PRICE_OVERRIDE' || action.type === 'VIP_COMPENSATION') {
    return {
      riskLevel: 'MEDIUM',
      requiresApproval: true,
      approverRole: 'Shift Supervisor / Senior Agent',
    };
  }

  return {
    riskLevel: 'LOW',
    requiresApproval: false,
    approverRole: 'Autonomous Engine (Pre-Approved)',
  };
}

export interface EnterpriseSOW {
  contractId: string;
  clientCompanyName: string;
  industry: string;
  turnkeyFee: number;
  monthlyManagedFee: number;
  totalFirstYearInvestment: number;
  estimatedLaborSavings: number;
  projectedNetRoi: number;
  paybackDays: number;
  headcountTarget: number;
  slaUptime: string;
  medianResponseTime: string;
  governanceModel: string;
  effectiveDate: string;
}

export function generateSOWDocument(params: {
  clientName?: string;
  industry?: IndustryType;
  headcount?: number;
  avgSalary?: number;
  turnkeyPrice?: number;
}): EnterpriseSOW {
  const clientName = params.clientName || 'Acme Enterprises International';
  const industry = params.industry || 'ecommerce';
  const headcount = params.headcount || 100;
  const avgSalary = params.avgSalary || 60000;
  const turnkeyPrice = params.turnkeyPrice || 75000;

  const roi = calculateEnterpriseRoi(headcount, avgSalary, 1.25, turnkeyPrice, 3500);

  return {
    contractId: `SYN-${Date.now().toString(36).toUpperCase()}-SOW`,
    clientCompanyName: clientName,
    industry: industry.toUpperCase(),
    turnkeyFee: turnkeyPrice,
    monthlyManagedFee: 3500,
    totalFirstYearInvestment: roi.synapseFirstYearCost,
    estimatedLaborSavings: roi.traditionalTotalCost,
    projectedNetRoi: roi.roiPercentage,
    paybackDays: roi.paybackPeriodDays,
    headcountTarget: headcount,
    slaUptime: '99.95% System Availability with Tier-4 Redundancy',
    medianResponseTime: '< 45 Seconds Across All Channels',
    governanceModel: 'Triple-Layer Human-in-the-Loop (HITL) with Audit Immutability',
    effectiveDate: new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
  };
}
