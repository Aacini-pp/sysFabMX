import React from 'react';
import { useLocation } from "react-router";
import { Navigate, Outlet } from "react-router-dom";
import {isCoordinadora }  from '../app/funciones';



const ProtectedRoutesCoordinador = () => {
  const location = useLocation();
  //tiene que ser coordinadora o rol superior
  return (isCoordinadora()) ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default ProtectedRoutesCoordinador;
