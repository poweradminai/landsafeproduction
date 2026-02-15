import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LandedSafe - Never Text "Landed Safe" Again | Free Flight Tracking',
  description: 'Enter your tail number and we track your flight automatically. Your contacts get notified when you take off and land. Free forever. No app required.',
  alternates: {
    canonical: 'https://landedsafe.com',
  },
  openGraph: {
    title: 'LandedSafe - Never Text "Landed Safe" Again',
    description: 'Enter your tail number. We track your flight and notify your people when you land. Free automatic flight tracking for general aviation pilots.',
    url: 'https://landedsafe.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LandedSafe - Enter your tail number and start tracking',
      },
    ],
  },
  twitter: {
    title: 'LandedSafe - Never Text "Landed Safe" Again',
    description: 'Enter your tail number. We track your flight and notify your people when you land. Free. No app.',
  },
};

export default function Home() {
  return (
    <main>
      {/* TODO: Migrate Home.tsx component from /components */}
      <h1>LandedSafe - Landing Page</h1>
      <p>Frontend migration in progress...</p>
    </main>
  );
}
