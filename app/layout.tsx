import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LandedSafe - Never Text "Landed Safe" Again',
  description: 'Free automatic flight tracking for general aviation. Your people get notified when you take off and land. AI assistant helps with FBO, fuel, rides, and weather via text.',
  keywords: 'flight tracking, general aviation, GA flight tracker, ADS-B tracking, landed safe notification, pilot flight following, FBO finder, aviation fuel prices, flight notification service, pilot assistant, aircraft tracking, N-number tracker, landing notification, takeoff notification, aviation SMS, free flight tracker, crew car, FBO services, pilot weather briefing, ground transportation pilot',
  authors: [{ name: 'LandedSafe' }],
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}
