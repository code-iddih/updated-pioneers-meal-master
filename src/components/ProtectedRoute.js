import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  // Accesssing the current user context
  const { user } = useContext(AuthContext);

  // checking is user is not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }
  // if user is well authenticated it will render other components now
  return children;
};

export default ProtectedRoute;
