import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Spinner from '../components/common/Loader/Spinner';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;