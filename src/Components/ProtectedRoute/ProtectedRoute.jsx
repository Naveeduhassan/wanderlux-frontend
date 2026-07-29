import './ProtectedRoute.css';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  
  let user = null;
  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (e) {
    user = null;
  }

  if (!token || !user) {
    toast.error('Authentication required. Please sign in.', { id: 'auth-required-toast' });
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    toast.error('Access denied. Administrator permissions required.', { id: 'admin-denied-toast' });
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
