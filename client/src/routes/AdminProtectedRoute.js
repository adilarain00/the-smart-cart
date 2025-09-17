// Route guard for admin-only routes in React app
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  // Get user authentication and role from Redux store
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  if (loading === false) {
    if (!isAuthenticated) {
      return <Navigate to='/user/login' replace />;
    } else if (user.role !== 'Admin') {
      return <Navigate to='/' replace />;
    }
    return children;
  }
};

export default AdminProtectedRoute;
