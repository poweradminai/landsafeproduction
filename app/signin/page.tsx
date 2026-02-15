'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SignInPage() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Implement sign-in logic
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

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
            <Link href="/signin" className="text-white font-semibold">Sign In</Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Sign In</h1>
            <p className="text-gray-400">Enter your phone number to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="glass-card rounded-xl p-8 space-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555 123 4567"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              {loading ? 'Sending...' : 'Continue'}
            </button>

            <p className="text-center text-sm text-gray-400">
              Don&apos;t have an account?{' '}
              <Link href="/" className="text-blue-400 hover:text-blue-300 font-medium">
                Start tracking
              </Link>
            </p>
          </form>
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
