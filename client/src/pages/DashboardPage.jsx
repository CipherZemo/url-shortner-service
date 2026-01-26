import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserLinks } from '../services/linkService';

const DashboardPage = () => {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLinks = async () => {
      if (token) {
        try {
          const response = await getUserLinks(token);
          setLinks(response.data);

        } catch (err) {
          console.error("Failed to fetch links:", err);
          const errorMessage = err.error || 'Could not load your links.';
          setError(errorMessage);

        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchLinks();
  }, [token]);// The dependency array tells React to re-run this effect only if 'token' changes.This is correct because we only need to refetch if the user (and thus the token) changes.

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">

      <h2>My Dashboard</h2>
      <p>Welcome to your personal dashboard! Here you will be able to see all the links you have created.</p>


      <div className="links-list-container" style={{ marginTop: '2rem' }}>
        {
          isLoading ? (<p>Loading your links...</p>) :
            error ? (<p className="error-message" style={{ color: 'red' }}>Error: {error}</p>) :
              links.length > 0 ? (
                <table className="links-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #333' }}>
                      <th style={{ padding: '8px', textAlign: 'left' }}>Original URL</th>
                      <th style={{ padding: '8px', textAlign: 'left' }}>Short URL</th>
                      <th style={{ padding: '8px', textAlign: 'left' }}>Clicks</th>
                    </tr>
                  </thead>

                  <tbody>
                    {links.map((link) => (
                      <tr key={link._id} style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '8px', wordBreak: 'break-all' }}>
                          <a href={link.longUrl} title={link.longUrl} target="_blank" rel="noopener noreferrer">
                            {link.longUrl.substring(0, 50)}...
                          </a>
                        </td>
                        <td style={{ padding: '8px' }}>
                          <a href={link.shortUrl} target="_blank" rel="noopener noreferrer">
                            {link.shortUrl}
                          </a>
                        </td>
                        <td style={{ padding: '8px', textAlign: 'center' }}>
                          {link.clicks}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) :
                (<p>You haven't created any short links yet. Go to the homepage to create your first one!</p>)
          /*  If loading is done, no errors, but no links, show this message */

        }
      </div>

      <button onClick={handleLogout} className="btn btn-logout" style={{ marginTop: '2rem' }}>
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;