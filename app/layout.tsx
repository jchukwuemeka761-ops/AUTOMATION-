import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SYNAPSE AI Workforce OS | $50k Enterprise Multi-Agent System',
  description: 'Enterprise autonomous AI multi-agent workforce platform replacing 100+ FTEs across Customer Support, Sales, Supply Chain, Finance, QA, and HR with real-time swarm orchestration and governance.',
  openGraph: {
    title: 'SYNAPSE AI Workforce OS | $50k Enterprise Multi-Agent System',
    description: 'Enterprise autonomous AI multi-agent workforce platform replacing 100+ FTEs with 99.4% SLA.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SYNAPSE AI Workforce OS | $50k Enterprise Multi-Agent System',
    description: 'Autonomous AI multi-agent system replacing 100 FTEs across enterprise operations.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200 min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
