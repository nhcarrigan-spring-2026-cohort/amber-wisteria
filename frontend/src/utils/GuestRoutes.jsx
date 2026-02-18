import { Outlet, Navigate } from 'react-router';

export default function GuestRoutes() {
  const accessToken = localStorage.getItem('access');

  return accessToken ? <Navigate to="/dashboard" /> : <Outlet />;
}
