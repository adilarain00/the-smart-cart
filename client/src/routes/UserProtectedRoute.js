// Route guard for user-only routes in React app
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const UserProtectedRoute = ({ children }) => {
  // Get user authentication/loading state from Redux store
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  if (loading === false) {
    if (!isAuthenticated) {
      return <Navigate to='/user/login' replace />;
    }
    return children;
  }
};

export default UserProtectedRoute;
