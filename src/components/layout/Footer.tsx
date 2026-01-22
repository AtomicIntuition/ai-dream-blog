import Link from 'next/link';
import { Sparkles, Github, Twitter } from 'lucide-react';

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
    <footer className="mt-24 border-t border-[rgb(var(--border-color))]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[rgba(var(--accent-primary),0.1)]">
                <Sparkles className="h-4 w-4 text-[rgb(var(--accent-primary))]" />
              </div>
              <span className="font-display text-[rgb(var(--text-primary))]">Dream Insights</span>
            </Link>
            <p className="text-sm font-reading text-[rgb(var(--text-muted))] mb-4 leading-relaxed">
              Explore the fascinating world of dreams through AI-powered analysis and expert insights.
            </p>
            <div className="flex gap-2">
              <a
                href="https://twitter.com/CodeAI4Crypto"
                className="p-2 text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-hover))] rounded-lg transition-colors"
                aria-label="Follow on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                className="p-2 text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-hover))] rounded-lg transition-colors"
                aria-label="View on GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-ui font-semibold text-[rgb(var(--text-primary))] mb-4 text-sm">Categories</h3>
            <ul className="space-y-2.5">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-reading text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-ui font-semibold text-[rgb(var(--text-primary))] mb-4 text-sm">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-reading text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* App */}
          <div>
            <h3 className="font-ui font-semibold text-[rgb(var(--text-primary))] mb-4 text-sm">The App</h3>
            <ul className="space-y-2.5">
              {footerLinks.app.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm font-reading text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-[rgb(var(--border-color))] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm font-ui text-[rgb(var(--text-muted))]">
            &copy; {new Date().getFullYear()} Dream Insights. All rights reserved.
          </p>
          <p className="text-sm font-ui text-[rgb(var(--text-muted))]">
            Powered by AI dream analysis
          </p>
        </div>
      </div>
    </footer>
  );
}
