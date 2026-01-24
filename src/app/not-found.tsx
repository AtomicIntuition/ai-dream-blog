import Link from 'next/link';
import { Moon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <Moon className="h-20 w-20 text-dream-500/50 mx-auto mb-6" />
        <h1 className="text-4xl font-display font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Perhaps it was just a dream?
        </p>
        <Link
          href="/"
          className="button-primary inline-flex"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
