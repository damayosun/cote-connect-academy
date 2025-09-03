import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'student' | 'tutor' | 'admin';
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  redirectTo = '/login'
}) => {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !userProfile) {
    return <Navigate to={redirectTo} replace />;
  }

  if (requiredRole && userProfile.role !== requiredRole) {
    // Redirect based on actual role
    const roleRedirects = {
      student: '/find-tutors',
      tutor: '/tutor/dashboard',
      admin: '/admin'
    };
    return <Navigate to={roleRedirects[userProfile.role] || '/'} replace />;
  }

  return <>{children}</>;
};