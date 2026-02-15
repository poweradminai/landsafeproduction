'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ConfirmContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="w-full py-4 px-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">Landed</span>
            <span className="text-2xl font-bold text-blue-500">Safe</span>
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/" className="text-gray-300 hover:text-white transition">Home</Link>
            <Link href="/chat" className="text-gray-300 hover:text-white transition">ai Copilot</Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition">About Us</Link>
            <Link href="/signin" className="text-gray-300 hover:text-white transition">Sign In</Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl w-full text-center">
          <div className="glass-card rounded-xl p-12">
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-4xl font-bold text-white mb-4">You&apos;re All Set!</h1>
            <p className="text-lg text-gray-300 mb-8">
              We&apos;re watching for your flight. You&apos;ll get a text when you take off, and your contacts will be notified when you land.
            </p>
            {sessionId && (
              <p className="text-sm text-gray-400 mb-6 font-mono">
                Session ID: {sessionId}
              </p>
            )}
            <div className="space-y-4">
              <Link
                href="/"
                className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Track Another Flight
              </Link>
              <Link
                href="/about"
                className="block w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          Powered by ADS-B Exchange • © 2026 LandedSafe. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900" />}>
      <ConfirmContent />
    </Suspense>
  );
}
