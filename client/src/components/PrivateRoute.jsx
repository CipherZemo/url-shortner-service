import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return <div>Loading...</div>;// You could render a loading spinner here for better UX
  }

  if (isAuthenticated) {
    return children;
  }
  
  return <Navigate to="/login" replace />;
};

  // The 'replace' prop is crucial , It replacesthe current entry in the history stack instead of pushing a new one.This means the user can't click the browser's "back" button to get back to the page they were redirected from (the protected route).

export default PrivateRoute;