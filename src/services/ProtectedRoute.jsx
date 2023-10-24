import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export const GuestProtectedRoute = () => {
  const { user } = useContext(AuthContext);
  let isAuth;
  if (user) {
    isAuth = user.role;
  } else {
    isAuth = undefined;
  }
  return isAuth === 'guest' ? <Outlet /> : <Navigate to={'/'} />
}

export const HostProtectedRoute = () => {
  const { user } = useContext(AuthContext);
  let isAuth;
  if (user) {
    isAuth = user.role;
  } else {
    isAuth = undefined;
  }
  return isAuth === 'host' ? <Outlet /> : <Navigate to={'/host/home'} />
};

export const GuestPrivateRoute = () => {
  const { user } = useContext(AuthContext);
  return !user || user?.role === 'guest' ? <Outlet /> : <Navigate to={'/host/home'} />
}
export const HostPrivateRoute = () => {
  const { user } = useContext(AuthContext);
  return !user || user?.role === 'host' ? <Outlet /> : <Navigate to={'/'} />
}

