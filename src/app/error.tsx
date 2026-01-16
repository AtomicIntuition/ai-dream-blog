'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <AlertCircle className="h-20 w-20 text-red-500/50 mx-auto mb-6" />
        <h1 className="text-4xl font-display font-bold text-white mb-4">
          Something went wrong
        </h1>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          We encountered an unexpected error. Please try again.
        </p>
        <button
          onClick={reset}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
