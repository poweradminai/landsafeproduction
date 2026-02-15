import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://landedsafe.com'),
  title: {
    default: 'LandedSafe - Never Text "Landed Safe" Again',
    template: '%s | LandedSafe',
  },
  description: 'Free automatic flight tracking for general aviation. Your people get notified when you take off and land. AI assistant helps with FBO, fuel, rides, and weather via text.',
  keywords: [
    'flight tracking',
    'general aviation',
    'GA flight tracker',
    'ADS-B tracking',
    'landed safe notification',
    'pilot flight following',
    'FBO finder',
    'aviation fuel prices',
    'flight notification service',
    'pilot assistant',
    'aircraft tracking',
    'N-number tracker',
    'landing notification',
    'takeoff notification',
    'aviation SMS',
    'free flight tracker',
    'crew car',
    'FBO services',
    'pilot weather briefing',
    'ground transportation pilot',
  ],
  authors: [{ name: 'LandedSafe' }],
  creator: 'LandedSafe',
  publisher: 'LandedSafe',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://landedsafe.com',
    siteName: 'LandedSafe',
    title: 'LandedSafe - Never Text "Landed Safe" Again',
    description: 'Free automatic flight tracking for general aviation. Get notified when your pilot takes off and lands. AI-powered post-landing assistant via SMS.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LandedSafe - Automatic Flight Tracking for General Aviation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LandedSafe - Never Text "Landed Safe" Again',
    description: 'Free automatic flight tracking for GA pilots. Your people get notified when you land. AI assistant helps with FBO, fuel, and rides.',
    images: ['/og-image.png'],
    creator: '@landedsafe',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  category: 'aviation',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'LandedSafe',
  url: 'https://landedsafe.com',
  description: 'Free automatic flight tracking and AI-powered post-landing assistant for general aviation pilots.',
  applicationCategory: 'Aviation',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  creator: {
    '@type': 'Organization',
    name: 'LandedSafe',
    url: 'https://landedsafe.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
