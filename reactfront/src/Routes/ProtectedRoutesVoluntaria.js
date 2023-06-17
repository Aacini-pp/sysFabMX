import React from 'react';
import { useLocation } from "react-router";
import { Navigate, Outlet } from "react-router-dom";
import {useAuth,getRolUruaria,isVoluntaria} from '../app/funciones';



const ProtectedRoutesVoluntaria = () => {
  const location = useLocation();
  //es voluntaria o rol superior
  return (isVoluntaria()) ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default ProtectedRoutesVoluntaria;
