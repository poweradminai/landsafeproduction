'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [tailNumber, setTailNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/track/flight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tailNumber: tailNumber.toUpperCase(),
          phoneNumber: phoneNumber.replace(/\D/g, ''),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to start tracking');
      }

      router.push(`/confirm?session=${data.sessionId}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="w-full py-4 px-6">
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

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Never Text &apos;Landed Safe&apos; Again
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Enter your tail number. We provide flight following and notify your people when you land.
          </p>

          {/* Form Card */}
          <div className="glass-card rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-left">
                <label htmlFor="tailNumber" className="block text-sm font-medium text-gray-300 mb-2">
                  Tail Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="tailNumber"
                  value={tailNumber}
                  onChange={(e) => setTailNumber(e.target.value)}
                  placeholder="N12345"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="text-left">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Mobile <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1 555 123 4567"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {error && (
                <div className="text-red-400 text-sm text-left">{error}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                {loading ? 'Starting...' : 'Track This Flight'}
              </button>
            </form>

            <div className="mt-6 text-sm text-gray-400">
              Returning user?{' '}
              <Link href="/signin" className="text-blue-400 hover:text-blue-300 font-medium">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl font-bold text-white">Landed</span>
              <span className="text-xl font-bold text-blue-500">Safe</span>
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm text-gray-400">
              Helping travelers with real-time safety and AI-driven travel intelligence. Travel safe. Land safe.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Legal</h3>
            <div className="space-y-2">
              <Link href="/privacy-terms" className="block text-sm text-gray-400 hover:text-white transition">
                Privacy Policy & Terms
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Connect</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-gray-400 hover:text-white transition">
                About Us
              </Link>
              <Link href="/chat" className="block text-sm text-gray-400 hover:text-white transition">
                ai Copilot
              </Link>
              <Link href="/signin" className="block text-sm text-gray-400 hover:text-white transition">
                Sign In
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          Powered by ADS-B Exchange • © 2026 LandedSafe. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
