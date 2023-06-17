import React from 'react';
import { useLocation } from "react-router";
import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from '../app/funciones';


const ProtectedRoutes = () => {
  const location = useLocation();
  const isAuth = useAuth();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
