import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Spinner from '../components/common/Loader/Spinner';

const AdminRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;
  return user?.role === 'admin' ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;