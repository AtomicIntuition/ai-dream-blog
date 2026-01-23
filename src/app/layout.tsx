import type { Metadata } from 'next';
import { DM_Sans, DM_Serif_Display, Literata } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';
import '@/styles/globals.css';

// Display font - elegant, modern serif for headlines
const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

// Reading font - designed specifically for digital reading
const literata = Literata({
  subsets: ['latin'],
  variable: '--font-reading',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

// UI font - clean, geometric sans-serif
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-ui',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const baseUrl = 'https://ai-dream-blog.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Dream Insights | AI-Powered Dream Analysis Blog',
    template: '%s | Dream Insights',
  },
  description: 'Explore the fascinating world of dreams through AI-powered analysis, dream interpretation, sleep science, and symbolism guides.',
  keywords: ['dreams', 'dream analysis', 'dream interpretation', 'sleep', 'psychology', 'symbolism'],
  authors: [{ name: 'Luna Vale' }, { name: 'Dream Insights' }],
  creator: 'Luna Vale',
  publisher: 'Dream Insights',
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Dream Insights',
    title: 'Dream Insights | AI-Powered Dream Analysis Blog',
    description: 'Explore the fascinating world of dreams through AI-powered analysis, dream interpretation, sleep science, and symbolism guides.',
    images: [
      {
        url: `${baseUrl}/images/ai-dream-blog.jpg`,
        width: 1200,
        height: 630,
        alt: 'Dream Insights by Luna Vale - AI Dream Analysis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@CodeAI4Crypto',
    creator: '@CodeAI4Crypto',
    title: 'Dream Insights | AI-Powered Dream Analysis Blog',
    description: 'Explore the fascinating world of dreams through AI-powered analysis, dream interpretation, sleep science, and symbolism guides.',
    images: [
      {
        url: `${baseUrl}/images/ai-dream-blog.jpg`,
        width: 1200,
        height: 630,
        alt: 'Dream Insights by Luna Vale - AI Dream Analysis',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${literata.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('blog-theme');
                  if (theme && ['obsidian', 'alabaster', 'dusk'].includes(theme)) {
                    document.documentElement.setAttribute('data-theme', theme);
                  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                    document.documentElement.setAttribute('data-theme', 'alabaster');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'obsidian');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
