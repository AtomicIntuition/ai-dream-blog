import type { Metadata } from 'next';
import { Inter, Playfair_Display, Source_Serif_4 } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
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
        url: `${baseUrl}/opengraph-image`,
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
        url: `${baseUrl}/twitter-image`,
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
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${sourceSerif.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('blog-theme');
                  if (theme && ['dark', 'light', 'sepia'].includes(theme)) {
                    document.documentElement.setAttribute('data-theme', theme);
                  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
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
      </body>
    </html>
  );
}
