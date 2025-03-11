import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/Store';
import Loading from './components/Loading/Loading';

interface ProtectedRouteProps {
  roleRequired?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roleRequired }) => {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;