import React, { useState } from 'react';
import { createShortUrl } from '../services/apiService';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';


const HomePage = () => {
  const { token } = useAuth();
  const [longUrl, setLongUrl] = useState('');
  const [shortUrlData, setShortUrlData] = useState(null);
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const validateUrl = () => {
    const errors = {};
    // A simple regex to check if the URL starts with http:// or https://
    const urlPattern = new RegExp('^(https?:\\/\\/)' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

    if (!longUrl) {
      errors.longUrl = 'URL field cannot be empty.';
    } else if (!urlPattern.test(longUrl)) {
      errors.longUrl = 'Please enter a valid URL (e.g., https://example.com).';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCopied(false);
    setError('');
    const validationErrors = validateUrl();
    setFormErrors(validationErrors);
    // If the validationErrors object has any keys, it means there are errors.
    if (Object.keys(validationErrors).length > 0) {
      return; // Stop the submission
    }
    setIsLoading(true);

    try {
      const url = await createShortUrl({ longUrl }, token);
      setShortUrlData(url.data);

    } catch (err) {
      setError(err.message || 'An error occurred.');

    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!shortUrlData) return;

    try {
      await navigator.clipboard.writeText(shortUrlData.shortUrl);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);

    } catch (err) {
      console.error('Failed to copy URL: ', err);
    }

  };

  const handleReset = () => {
    setShortUrlData(null);
    setLongUrl('');
    setError('');
    setFormErrors({});
    setIsCopied(false);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-start pt-12 px-4">
      <div className="w-full max-w-2xl">

        {/* ─── Header ─── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-4">
            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.178l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
            <span className="text-sm text-blue-700 font-semibold">URL Shortener</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Shorten your link</h1>
          <p className="text-slate-500 mt-1.5">Paste a long URL below and get a clean short link instantly.</p>
        </div>

        {/* ─── Main Card ─── */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-lg shadow-slate-100 p-6 sm:p-8">

          {/* Input form */}
          <form onSubmit={handleSubmit}>
            <label htmlFor="longUrl-input" className="block text-sm font-semibold text-slate-700 mb-2">
              Long URL
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                {/* Using type="url" provides better semantics and potential browser validation. */}
                <input
                  id="longUrl-input"
                  type="url"
                  placeholder="https://example.com/some/very/long/url"
                  value={longUrl}
                  onChange={(e) => {
                    setLongUrl(e.target.value);
                    if (formErrors.longUrl) setFormErrors({});
                  }}
                  disabled={isLoading}
                  className={`w-full p-3.5 pr-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:bg-slate-50 transition-all text-slate-800 placeholder-slate-400 ${formErrors.longUrl ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'}`}
                  required
                />
                {/*The 'onChange' event fires every time the user types a character. We use it to call our 'setLongUrl' function, updating the state with the new value from the input .*/}

                {longUrl && !isLoading && (
                  <button
                    type="button"
                    onClick={() => { setLongUrl(''); setFormErrors({}); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-sm shadow-blue-200 hover:shadow-md"
              >
                {isLoading ? (
                  <><Spinner size="small" /> Shortening...</>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.178l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                    </svg>
                    Shorten
                  </>
                )}
              </button>
            </div>
            {formErrors.longUrl && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {formErrors.longUrl}
              </p>
            )}
          </form>

          {/*  "&&" operator in jsx, If the condition is true, render the following JSX; Otherwise, render nothing. */}
          {/* this JSX will only be rendered if the 'error' state variable is not null. */}
          {error && <Alert type="error" message={error} onClose={() => setError('')} />}

          {/* ─── Result Section ─── */}
          {shortUrlData && (
            <div className="mt-6 animate-fadeIn">
              {/* Divider */}
              <div className="border-t border-slate-100 mb-5" />

              {/* Success badge */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-green-700">Short link created successfully!</span>
              </div>

              {/* Short URL display + copy */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">Your short link</p>
                  <a
                    href={shortUrlData.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-mono font-semibold text-base hover:underline break-all"
                  >
                    {shortUrlData.shortUrl}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all flex-shrink-0 ${isCopied ? 'bg-green-100 text-green-700' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'}`}
                >
                  {isCopied ? (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.919a2.75 2.75 0 00-3.897 0l-6 6A2.75 2.75 0 105.027 13.916l6-6a2.75 2.75 0 003.897 0" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.334 20.081a2.75 2.75 0 003.897 0l6-6a2.75 2.75 0 00-3.897-3.897l-6 6a2.75 2.75 0 003.897 3.897" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>

              {/* Original URL preview */}
              <div className="mt-3 flex items-center gap-2 text-slate-400">
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.178l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
                <p className="text-xs truncate">
                  Original: <span className="text-slate-500">{shortUrlData.longUrl}</span>
                </p>
              </div>

              {/* Shorten another button */}
              <button
                type="button"
                onClick={handleReset}
                className="mt-5 w-full text-center text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                + Shorten another link
              </button>
            </div>
          )}
        </div>

        {/* ─── Footer hint ─── */}
        <p className="text-center text-xs text-slate-400 mt-6">
          {token ? 'Links are saved to your account and visible in your dashboard.' : 'Sign in to save and track your links from the dashboard.'}
        </p>
      </div>
    </div>
  );
};

export default HomePage;
