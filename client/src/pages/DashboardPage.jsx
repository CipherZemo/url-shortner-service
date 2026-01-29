import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserLinks } from '../services/linkService';
import Spinner from '../components/Spinner';

const DashboardPage = () => {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [copiedLinkId, setCopiedLinkId] = useState(null);
  const { token, logout } = useAuth();
  const navigate = useNavigate();


  // Function to fetch links (can be called from useEffect or manually)
  const fetchLinks = async (showLoadingSpinner = true) => {
    if (!token) return;

    if (showLoadingSpinner) {
      setIsLoading(true);
    } else {
      setIsRefreshing(true);
    }

    try {
      const response = await getUserLinks(token);
      setLinks(response.data);
      setError('');

    } catch (err) {
      console.error("Failed to fetch links:", err);
      const errorMessage = err.error || 'Could not load your links.';
      setError(errorMessage);

    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchLinks();
  }, [token]);// The dependency array tells React to re-run this effect only if 'token' changes.This is correct because we only need to refetch if the user (and thus the token) changes.

  // ADDED: Auto-refresh every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchLinks(false); // Refresh without showing loading spinner
    }, 30000); // 30 seconds

    // Cleanup: clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // ADDED: Manual refresh function
  const handleRefresh = () => {
    fetchLinks(false);
  };

  const handleCopy = async (text, linkId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLinkId(linkId);

      setTimeout(() => {
        setCopiedLinkId(null);
      }, 2000);

    } catch (err) {
      console.error('Failed to copy URL: ', err);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold">My Dashboard</h2>
            <p className="text-slate-600">Welcome to your personal dashboard! Here you can see all the links you have created.</p>
          </div>
          <div className="flex gap-2">
            {/* ADDED: Refresh button */}
            <button 
              onClick={handleRefresh} 
              disabled={isRefreshing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isRefreshing ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Refreshing...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </>
              )}
            </button>
            <button onClick={handleLogout} className="bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-md font-semibold">
              Logout
            </button>
          </div>
        </div>
      </div>


      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center"><Spinner /></div>
        ) : error ? (
          <p className="p-6 text-red-500">Error: {error}</p>
        ) : links.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="p-4 font-semibold">Original URL</th>
                    <th className="p-4 font-semibold">Short URL</th>
                    <th className="p-4 font-semibold text-center">Clicks</th>
                    <th className="p-4 font-semibold text-center">Created</th>
                    <th className="p-4 font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {links.map((link) => (
                    <tr key={link._id} className="border-b last:border-0 hover:bg-slate-50">
                      <td className="p-4 max-w-xs">
                        <a href={link.longUrl} title={link.longUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600 break-all">
                          {link.longUrl.length > 50 ? link.longUrl.substring(0, 50) + '...' : link.longUrl}
                        </a>
                      </td>
                      <td className="p-4">
                        <a href={link.shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-mono hover:underline">
                          {link.shortUrl}
                        </a>
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold text-sm">
                          {link.clicks}
                        </span>
                      </td>
                      <td className="p-4 text-center text-sm text-slate-600">
                        {new Date(link.date).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <button 
                          type="button" 
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded-md"
                          onClick={() => handleCopy(link.shortUrl, link._id)}
                        > 
                          {copiedLinkId === link._id ? 'Copied!' : 'Copy'} 
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* ADDED: Auto-refresh indicator */}
            <div className="p-3 bg-slate-50 border-t text-center text-xs text-slate-500">
              <p>📊 Showing {links.length} link{links.length !== 1 ? 's' : ''} • Auto-refreshes every 30 seconds</p>
            </div>
          </>
        ) : (
          <p className="p-6 text-center text-slate-500">
            You haven't created any short links yet. Go to the homepage to create your first one!
          </p>
        )}
      </div>

    </div>
  );
};

export default DashboardPage;