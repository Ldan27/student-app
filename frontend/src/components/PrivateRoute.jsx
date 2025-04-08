import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { studentInfo } = useSelector((state) => state.auth);

  return studentInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
