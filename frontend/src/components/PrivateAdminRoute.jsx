import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

import React from "react";

const PrivateAdminRoute = () => {
  const { studentInfo } = useSelector((state) => state.auth);

  return studentInfo && studentInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateAdminRoute;
