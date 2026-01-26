import React, { useState } from 'react';
import { createShortUrl } from '../services/apiService';
import Spinner from '../components/Spinner';

const HomePage = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrlData, setShortUrlData] = useState(null);
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCopied(false);
    setError('');
    setIsLoading(true);

    try {
      const data = await createShortUrl.shortenUrl({ longUrl });
      setShortUrlData(data.shortUrl);

    } catch (err) {
      setError(err.message || 'An error occurred.');

    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!shortUrl) return;

    try {
      await navigator.clipboard.writeText(shortUrl);
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
      <h2>URL Shortener</h2>
      <p>Enter a long URL to make it short and easy to share!</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="longUrl-input">Your Long URL:</label>

          {/* Using type="url" provides better semantics and potential browser validation. */}
          <input id="longUrl-input" type="url" placeholder="https://example.com/very/long/url/to/shorten"
            value={longUrl} onChange={(e) => setLongUrl(e.target.value)}
            // The 'onChange' event fires every time the user types a character. We use it to call our 'setLongUrl' function, updating the state with the new value from the input .
            disabled={isLoading} required />
        </div>
        <button type="submit" disabled={isLoading}> {isLoading ? <Spinner size="small" /> : 'Shorten'} </button>
      </form>

      {/*  "&&" operator in jsx, If the condition is true, render the following JSX; Otherwise, render nothing. */}
      {/* this JSX will only be rendered if the 'error' state variable is not null. */}
      {error && (
        <div className="error-container" style={{ color: 'red', marginTop: '1rem' }}>
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}

      {/* This JSX will only be rendered if 'shortUrlData' is not null. */}
      {shortUrlData && (
        <div className="result-container" style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '5px' }}>
          <h3>Your Short URL is ready!</h3>
          <p> <strong>Short Link:</strong>
            {/* 'target="_blank"' opens the link in a new tab. 'rel="noopener noreferrer"' is a security best practice for new tabs. */}
            <a href={shortUrlData.shortUrl} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '0.5rem', fontWeight: 'bold', color: '#007bff' }}> {shortUrlData.shortUrl} </a>
            <button type="button" className="btn btn-copy" onClick={handleCopy}> {isCopied ? 'Copied!' : 'Copy'} </button>
          </p>

          <p style={{ fontSize: '0.8rem', color: '#555' }}> Original URL: {shortUrlData.longUrl.substring(0, 70)}...
          </p>

        </div>
      )}
    </div>
  );
};


export default HomePage;
