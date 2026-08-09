import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const STAFF_ROLES = ['admin', 'administrador', 'mesero', 'cocina', 'cajero', 'recepcion', 'host'];

export function ProtectedRoute({ children, roles }) {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="bg-black text-white min-vh-100 d-flex align-items-center justify-content-center">
        Cargando...
      </div>
    );
  }

  if (!isAuthenticated || !user?.role) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (roles?.length) {
    const isStaff = STAFF_ROLES.includes(user.role);
    const ok = roles.includes(user.role) || (roles.includes('staff') && isStaff);
    if (!ok) {
      return <Navigate to={user.role === 'cliente' ? '/cuenta' : '/dashboard'} replace />;
    }
  }

  return children;
}
