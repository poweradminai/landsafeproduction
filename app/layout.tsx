import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500'],
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
