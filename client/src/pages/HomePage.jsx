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

  return (
    <div className="home-container">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-2">URL Shortener</h2>
        <p className="text-lg text-slate-600">Enter a long URL to make it short and easy to share!</p>

        <div className="mt-8 bg-white p-8 rounded-lg shadow-lg">

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div>
              <label htmlFor="longUrl-input">Your Long URL: </label>

              {/* Using type="url" provides better semantics and potential browser validation. */}
              <input id="longUrl-input" type="url" placeholder="https://example.com/very/long/url/to/shorten"
                value={longUrl} onChange={(e) => {
                  setLongUrl(e.target.value);
                  if (formErrors.longUrl) {
                    setFormErrors({});
                  }
                }}
                // The 'onChange' event fires every time the user types a character. We use it to call our 'setLongUrl' function, updating the state with the new value from the input .
                disabled={isLoading} className={`"flex-grow p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50" ${formErrors.longUrl ? 'border-red-500' : 'border-gray-300'}`} required />

              {formErrors.longUrl && (<p className="text-red-500 text-sm text-left mt-1">{formErrors.longUrl}</p>
              )}
            </div>

            <button type="submit" disabled={isLoading} className="bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 disabled:bg-blue-400 w-full sm:w-auto"> {isLoading ? <Spinner size="small" /> : 'Shorten'} </button>
          </form>


          {/*  "&&" operator in jsx, If the condition is true, render the following JSX; Otherwise, render nothing. */}
          {/* this JSX will only be rendered if the 'error' state variable is not null. */}
          {error && (
            <div className="error-container" style={{ color: 'red', marginTop: '1rem' }}>
              <p className="mt-4 text-red-500"><strong>Error:</strong> {error}</p>
            </div>
          )}


          {/* This JSX will only be rendered if 'shortUrlData' is not null. */}
          {shortUrlData && (
            // <div className="result-container" style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '5px' }}>
            <div className="mt-6 pt-6 border-t text-left">
              <div className="flex justify-between items-center bg-slate-100 p-3 rounded-md">
                <h3>Your Short URL is ready!</h3>
                <p> <strong>Short Link:</strong>
                  {/* 'target="_blank"' opens the link in a new tab. 'rel="noopener noreferrer"' is a security best practice for new tabs. */}
                  <a href={shortUrlData.shortUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-blue-600 break-all" /*style={{ marginLeft: '0.5rem', fontWeight: 'bold', color: '#007bff' }}*/> {shortUrlData.shortUrl} </a>
                  <button type="button" onClick={handleCopy} className="bg-slate-200 hover:bg-slate-300 px-3 py-1 rounded-md text-sm font-semibold ml-4"> {isCopied ? 'Copied!' : 'Copy'} </button>
                </p>
              </div>

              <p className="text-centre" style={{ fontSize: '0.8rem', color: '#555' }}> Original URL: {shortUrlData.longUrl.substring(0, 70)}
              </p>
            </div>
          )}


        </div>


      </div>
    </div>
  );
};


export default HomePage;
