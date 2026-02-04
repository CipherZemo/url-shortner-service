import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="-mt-8 md:-mt-16">

      {/* ─── HERO ─── */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">

        {/* Background grid pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-white to-slate-50" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">  
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#334155" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          {/* Gradient orbs */}
          <div className="absolute top-[10%] left-[15%] w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl" />
          <div className="absolute bottom-[10%] right-[10%] w-80 h-80 bg-violet-500 rounded-full opacity-10 blur-3xl" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 shadow-sm rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-slate-600 font-medium">Fast, secure & free</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 leading-tight max-w-4xl">
          Shorten URLs.
          <span className="block mt-1 bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600 bg-clip-text text-transparent">
            Share smarter.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="mt-6 text-lg sm:text-xl text-slate-500 max-w-2xl">
          Turn long, messy links into clean, shareable short URLs in seconds. Track clicks, manage your links, and grow your reach.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
          <Link
            to="/shorten"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-200 transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            Start Shortening
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-slate-700 font-semibold px-8 py-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all"
            >
              My Dashboard
            </Link>
          ) : (
            <Link
              to="/register"
              className="inline-flex items-center gap-2 text-slate-700 font-semibold px-8 py-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all"
            >
              Create Free Account
            </Link>
          )}
        </div>

        {/* Trusted-by bar */}
        <p className="mt-14 text-xs text-slate-400 uppercase tracking-widest font-semibold">
          Trusted by developers & marketers worldwide
        </p>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-blue-100 text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">How it works</span>
            <h2 className="text-4xl font-extrabold text-slate-900">Three steps to short links</h2>
            <p className="text-slate-500 mt-2 max-w-xl mx-auto">No sign-up required to start. Create an account to track and manage your links.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Paste your URL',
                desc: 'Drop in any long URL — blog posts, articles, product pages, anything.',
                icon: (
                  <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.178l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                )
              },
              {
                step: '02',
                title: 'Generate short link',
                desc: 'One click and we create a unique, clean short URL for you instantly.',
                icon: (
                  <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                  </svg>
                )
              },
              {
                step: '03',
                title: 'Share & track',
                desc: 'Copy your short link and share it. Log in to see real-time click analytics.',
                icon: (
                  <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 013.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 4.5c-2.392 0-4.744.175-7.043.513C3.373 5.746 2.25 7.139 2.25 8.741v6.018z" />
                  </svg>
                )
              }
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 h-full hover:shadow-lg hover:border-blue-300 transition-all">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm">
                      {item.icon}
                    </div>
                    <span className="text-sm font-bold text-slate-400 font-mono">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-violet-200 text-violet-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Features</span>
            <h2 className="text-4xl font-extrabold text-slate-900">Everything you need</h2>
            <p className="text-slate-500 mt-2 max-w-xl mx-auto">A full-featured URL shortener built for speed and simplicity.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Lightning Fast', desc: 'Sub-second redirects powered by optimised server infrastructure.', emoji: '⚡' },
              { title: 'Click Tracking', desc: 'Real-time analytics on every link you create — know your reach.', emoji: '📊' },
              { title: 'No Expiry', desc: 'Your short links stay active forever. No hidden limits.', emoji: '♾️' },
              { title: 'Secure & Private', desc: 'JWT-based authentication keeps your account and links safe.', emoji: '🔒' },
            ].map((f, i) => (
              <div key={i} className="bg-slate-100 border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:border-violet-300 transition-all">
                <div className="text-3xl mb-4">{f.emoji}</div>
                <h3 className="font-bold text-slate-800 mb-1">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-violet-600 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          {/* Decorative dots */}
          <div className="absolute top-6 left-6 w-16 h-16 rounded-full bg-white opacity-5" />
          <div className="absolute bottom-8 right-10 w-24 h-24 rounded-full bg-white opacity-5" />
          <div className="absolute top-12 right-16 w-10 h-10 rounded-full bg-white opacity-10" />

          <h2 className="relative text-3xl md:text-4xl font-extrabold text-white">
            Ready to get started?
          </h2>
          <p className="relative mt-3 text-blue-100 text-lg max-w-lg mx-auto">
            Join thousands of users. Create your account today and start shortening links for free.
          </p>
          <div className="relative mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              to="/shorten"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Shorten a Link Now
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            {!isAuthenticated && (
              <Link
                to="/register"
                className="text-white font-semibold px-8 py-3.5 rounded-xl border border-white/30 hover:bg-white/10 transition-all"
              >
                Create Free Account
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;