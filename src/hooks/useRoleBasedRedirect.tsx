import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const useRoleBasedRedirect = () => {
  const { userProfile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading || !userProfile) return;

    // Role-based redirection logic
    switch (userProfile.role) {
      case 'student':
        navigate('/find-tutors');
        break;
      case 'tutor':
        navigate('/tutor/dashboard');
        break;
      case 'admin':
        navigate('/admin');
        break;
      default:
        navigate('/');
    }
  }, [userProfile, loading, navigate]);
};