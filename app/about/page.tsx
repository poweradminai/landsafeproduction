'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // TODO: Integrate Formspree
    // For now, just simulate submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
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
            <Link href="/about" className="text-white font-semibold">About Us</Link>
            <Link href="/signin" className="text-gray-300 hover:text-white transition">Sign In</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Your AI Co-Pilot from Takeoff to Tiedown
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            LandedSafe tracks your flight, notifies your people, and helps you on the ground. No app. No hardware. No cost.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Start Tracking
          </Link>
          <p className="mt-4 text-sm text-gray-400">
            Have an account already? Simply{' '}
            <Link href="/signin" className="text-blue-400 hover:text-blue-300">
              Sign in
            </Link>
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Three Steps. That&apos;s It.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 text-5xl">✈️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Enter Tail Number</h3>
              <p className="text-gray-400">
                Tell us your N-number and phone number. We start watching for your aircraft on ADS-B.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-5xl">🛫</div>
              <h3 className="text-xl font-semibold text-white mb-2">Fly Your Flight</h3>
              <p className="text-gray-400">
                We detect takeoff automatically and notify your contacts. They get a tracking link.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-5xl">🏁</div>
              <h3 className="text-xl font-semibold text-white mb-2">Land Safely</h3>
              <p className="text-gray-400">
                Your people get notified instantly. Then our AI texts you with FBO info and ground help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Everything You Need After Touchdown
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Automatic Tracking */}
            <div className="glass-card rounded-xl p-6">
              <div className="text-3xl mb-4">📡</div>
              <h3 className="text-xl font-semibold text-white mb-2">Automatic Tracking</h3>
              <p className="text-gray-400">
                We monitor your aircraft using ADS-B. No hardware, no app to install, no headaches to remember.
              </p>
            </div>

            {/* SMS Notifications */}
            <div className="glass-card rounded-xl p-6">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-white mb-2">SMS Notifications</h3>
              <p className="text-gray-400">
                Emergency contacts receive an SMS when you take off and land. No app they need you and find safely.
              </p>
            </div>

            {/* AI Post-Landing Assistant */}
            <div className="glass-card rounded-xl p-6">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Post-Landing Assistant</h3>
              <p className="text-gray-400">
                Text our AI for fuel prices, FBO services, or ground transport comparisons.
              </p>
            </div>

            {/* FBO Intel */}
            <div className="glass-card rounded-xl p-6">
              <div className="text-3xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold text-white mb-2">FBO Intel</h3>
              <p className="text-gray-400">
                Get quick info: crew cars, fuel prices, and operating hours of the closest FBOs instantly.
              </p>
            </div>

            {/* Ride Comparison */}
            <div className="glass-card rounded-xl p-6">
              <div className="text-3xl mb-4">🚗</div>
              <h3 className="text-xl font-semibold text-white mb-2">Ride Comparison</h3>
              <p className="text-gray-400">
                Compare Uber and Lyft prices to/from your FBO. No one likes looking blind.
              </p>
            </div>

            {/* Weather Briefings */}
            <div className="glass-card rounded-xl p-6">
              <div className="text-3xl mb-4">☁️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Weather Briefings</h3>
              <p className="text-gray-400">
                Quickly check METARs or conditions at any airport from your phone at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Free Forever Section */}
      <section className="py-16 px-6 bg-gray-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Free. Forever. Seriously.</h2>
          <p className="text-lg text-gray-300 mb-4">
            No credit card. No premium tier. No &quot;free trial&quot; that expires. LandedSafe is free because we believe every GA pilot should have access to automatic safety notifications.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Common Questions</h2>
          <div className="space-y-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-2">Do I need ADS-B to use this?</h3>
              <p className="text-gray-400">
                Yes, the aircraft needs to broadcast ADS-B for our system to track it.
              </p>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-2">Is this an app I need to download?</h3>
              <p className="text-gray-400">
                No. LandedSafe is a web-based service. Everything happens via SMS.
              </p>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-2">How accurate is the tracking?</h3>
              <p className="text-gray-400">
                We use ADS-B data which is real-time, though coverage can be spotty at low altitudes.
              </p>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-2">Will you sell my data?</h3>
              <p className="text-gray-400">
                No. We do not sell or share your personal data with third parties for marketing purposes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-6 bg-gray-800/50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Get In Touch</h2>
          <p className="text-center text-gray-400 mb-8">
            Questions, feedback, or just want to say hi?
          </p>

          {submitted ? (
            <div className="glass-card rounded-xl p-8 text-center">
              <div className="text-5xl mb-4">✅</div>
              <p className="text-xl text-white">Thanks! We&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card rounded-xl p-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a topic</option>
                  <option value="general">General Question</option>
                  <option value="technical">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help?"
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}

          <p className="text-center text-gray-400 mt-6 text-sm">
            Or email us directly at{' '}
            <a href="mailto:support@landedsafe.com" className="text-blue-400 hover:text-blue-300">
              support@landedsafe.com
            </a>
          </p>
        </div>
      </section>

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
