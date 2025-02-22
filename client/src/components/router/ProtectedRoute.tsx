import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const isLogged = !!localStorage.getItem('AUTH_TOKEN');

  return !isLogged ? <Navigate to='/login' /> : <>{children}</>;
}

export default ProtectedRoute;
