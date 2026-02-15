import type { Metadata } from 'next';
import { prisma } from '@/lib/db';

type Props = {
  params: { trackingId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Fetch tracking data to get tail number and status
  const tracking = await prisma.tracking.findUnique({
    where: { trackingId: params.trackingId },
    select: {
      tailNumber: true,
      status: true,
    },
  });

  const tailNumber = tracking?.tailNumber || 'Aircraft';
  const status = tracking?.status || 'monitoring';

  const statusText =
    status === 'airborne'
      ? `${tailNumber} is currently airborne`
      : status === 'landed'
      ? `${tailNumber} landed safely`
      : `Tracking ${tailNumber}`;

  return {
    title: `Track ${tailNumber} - Live Flight Status`,
    description: `${statusText}. Follow this flight in real time with LandedSafe. Free automatic flight tracking for general aviation.`,
    alternates: {
      canonical: `https://landedsafe.com/track/${params.trackingId}`,
    },
    openGraph: {
      title: `Track ${tailNumber} - LandedSafe`,
      description: `${statusText}. Live flight tracking powered by ADS-B.`,
      url: `https://landedsafe.com/track/${params.trackingId}`,
      images: [
        {
          url: '/og-tracking.png',
          width: 1200,
          height: 630,
          alt: `Live tracking for ${tailNumber}`,
        },
      ],
    },
    twitter: {
      title: `Track ${tailNumber} - LandedSafe`,
      description: `${statusText}. Live flight tracking powered by ADS-B.`,
    },
    // Don't index individual tracking pages (they're ephemeral)
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function TrackingPage({ params }: Props) {
  return (
    <main>
      {/* TODO: Migrate TrackingPage.tsx component from /components */}
      <h1>Track Flight: {params.trackingId}</h1>
      <p>Frontend migration in progress...</p>
    </main>
  );
}
