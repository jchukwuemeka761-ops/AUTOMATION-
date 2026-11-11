import type {Metadata} from 'next';
import './globals.css';
import { ExtensionErrorGuard } from '@/components/ExtensionErrorGuard';

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function isExtensionError(err, source) {
                  var str = (err && (err.message || err.stack || err.toString())) || '';
                  var file = source || (err && err.filename) || '';
                  return str.indexOf('MetaMask') !== -1 ||
                         str.indexOf('nkbihfbeogaeaoehlefnkodbefgpgknn') !== -1 ||
                         file.indexOf('chrome-extension://') !== -1 ||
                         file.indexOf('moz-extension://') !== -1 ||
                         str.indexOf('Failed to connect to MetaMask') !== -1;
                }

                var origError = console.error;
                console.error = function() {
                  var msg = arguments[0];
                  if (typeof msg === 'string' && isExtensionError({ message: msg })) {
                    return;
                  }
                  if (msg && (msg.stack || msg.message) && isExtensionError(msg)) {
                    return;
                  }
                  return origError.apply(console, arguments);
                };

                window.addEventListener('error', function(event) {
                  if (isExtensionError(event.error, event.filename || '')) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    return true;
                  }
                }, true);

                window.addEventListener('unhandledrejection', function(event) {
                  if (isExtensionError(event.reason)) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    return true;
                  }
                }, true);
              })();
            `,
          }}
        />
      </head>
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200 min-h-screen" suppressHydrationWarning>
        <ExtensionErrorGuard />
        {children}
      </body>
    </html>
  );
}
