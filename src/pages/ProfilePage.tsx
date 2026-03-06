import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const plan = false;

  if (!user && !isLoading) {
    return <Navigate to='/auth/sign-in' replace />;
  }
  if (!plan) {
    return <Navigate to='/onboarding' replace />;
  }
  return <div>ProfilePage</div>;
}
