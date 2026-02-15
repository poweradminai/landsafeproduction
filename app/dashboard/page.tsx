import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Manage your aircraft, recipients, and flight history. Quick-start tracking for your saved aircraft.',
  // Don't index dashboard (requires auth, no public value)
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return (
    <main>
      {/* TODO: Migrate Dashboard.tsx component from /components */}
      <h1>Dashboard</h1>
      <p>Frontend migration in progress...</p>
    </main>
  );
}
