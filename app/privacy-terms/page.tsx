import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy & Terms of Service',
  description: 'LandedSafe privacy policy and terms of service. We never sell your data. Free service with no warranties. Read our aviation disclaimers, SMS terms, and liability limitations.',
  alternates: {
    canonical: 'https://landedsafe.com/privacy-terms',
  },
  openGraph: {
    title: 'Privacy Policy & Terms of Service - LandedSafe',
    description: 'LandedSafe privacy policy and terms of service. We never share your data with third parties for marketing purposes.',
    url: 'https://landedsafe.com/privacy-terms',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyTermsPage() {
  return (
    <main>
      {/* TODO: Migrate PrivacyTerms.tsx component from /components */}
      <h1>Privacy Policy & Terms of Service</h1>
      <p>Frontend migration in progress...</p>
    </main>
  );
}
