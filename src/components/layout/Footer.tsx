import Link from 'next/link';
import { Moon, Github, Twitter } from 'lucide-react';

const footerLinks = {
  categories: [
    { name: 'Dream Stories', href: '/category/dream-stories' },
    { name: 'Dream Science', href: '/category/dream-science' },
    { name: 'Sleep Tips', href: '/category/sleep-tips' },
    { name: 'Symbolism', href: '/category/symbolism' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Contact', href: '/contact' },
  ],
  app: [
    { name: 'Download App', href: 'https://dreamanalysis.netlify.app' },
    { name: 'Features', href: 'https://dreamanalysis.netlify.app/features' },
    { name: 'Pricing', href: 'https://dreamanalysis.netlify.app/pricing' },
  ],
};

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Moon className="h-6 w-6 text-dream-400" />
              <span className="font-display font-bold text-white">Dream Insights</span>
            </Link>
            <p className="text-sm text-slate-400 mb-4">
              Explore the fascinating world of dreams through AI-powered analysis and expert insights.
            </p>
            <div className="flex gap-3">
              <a
                href="https://twitter.com"
                className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* App */}
          <div>
            <h3 className="font-semibold text-white mb-4">The App</h3>
            <ul className="space-y-2">
              {footerLinks.app.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Dream Insights. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Powered by AI dream analysis
          </p>
        </div>
      </div>
    </footer>
  );
}
