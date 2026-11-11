'use client';

import { useEffect } from 'react';

export function ExtensionErrorGuard() {
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const message =
        typeof reason === 'string'
          ? reason
          : reason?.message || reason?.stack || '';

      // Suppress extension-originated errors (e.g. MetaMask, Phantom, wallet injection)
      if (
        message.includes('MetaMask') ||
        message.includes('chrome-extension://') ||
        message.includes('moz-extension://') ||
        message.includes('Failed to connect to MetaMask')
      ) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const handleError = (event: ErrorEvent) => {
      const filename = event.filename || '';
      const message = event.message || '';

      if (
        filename.includes('chrome-extension://') ||
        filename.includes('moz-extension://') ||
        message.includes('MetaMask') ||
        message.includes('Failed to connect to MetaMask')
      ) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection, true);
    window.addEventListener('error', handleError, true);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection, true);
      window.removeEventListener('error', handleError, true);
    };
  }, []);

  return null;
}
