import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About LandedSafe - How It Works, Features & Contact',
  description: 'Learn how LandedSafe tracks your flight via ADS-B, notifies your contacts, and provides AI-powered FBO info, fuel prices, ride comparison, and weather briefings after you land.',
  alternates: {
    canonical: 'https://landedsafe.com/about',
  },
  openGraph: {
    title: 'About LandedSafe - Your AI Co-Pilot from Takeoff to Tiedown',
    description: 'Automatic flight tracking, landing notifications, AI-powered FBO and ground transport assistance. Free forever for every GA pilot. See how it works.',
    url: 'https://landedsafe.com/about',
    images: [
      {
        url: '/og-about.png',
        width: 1200,
        height: 630,
        alt: 'LandedSafe features - flight tracking, notifications, AI assistant',
      },
    ],
  },
  twitter: {
    title: 'About LandedSafe - Your AI Co-Pilot from Takeoff to Tiedown',
    description: 'Flight tracking, landing notifications, FBO info, fuel prices, ride comparison, weather. All via text. All free.',
  },
};

export default function AboutPage() {
  return (
    <main>
      {/* TODO: Migrate About.tsx component from /components */}
      <h1>About LandedSafe</h1>
      <p>Frontend migration in progress...</p>
    </main>
  );
}
