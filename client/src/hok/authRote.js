import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { checkIsAuth } from '../redux/features/auth/authSlice';
import Loader from '../components/loader/Loader';

export const AuthRoute = () => {
  const isAuth = useSelector(checkIsAuth);
  const { isLoading } = useSelector((state) => state.auth);
  if (isLoading) return <Loader />;
  return isAuth ? <Outlet /> : <Navigate to="login" replace />;
};
