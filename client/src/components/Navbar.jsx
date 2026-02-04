import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-xl font-extrabold text-slate-900">
          Short<span className="text-blue-600">.</span>ly
        </Link>

        {/* Nav links */}
        <ul className="flex gap-2 items-center">
          {/* Shorten link — always visible */}
          <li>
            <Link
              to="/shorten"
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Shorten
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard" className="text-sm font-semibold text-slate-600 hover:text-blue-600 px-3 py-2 rounded-lg transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold text-slate-500 hover:text-red-500 px-3 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-blue-600 px-3 py-2 rounded-lg transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm font-semibold text-slate-600 hover:text-blue-600 px-3 py-2 rounded-lg transition-colors">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;