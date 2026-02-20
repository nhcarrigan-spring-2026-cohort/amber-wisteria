import { Outlet, Navigate } from 'react-router';

export default function PrivateRoutes() {
  const accessToken = localStorage.getItem('access');

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
}
