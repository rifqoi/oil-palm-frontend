import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useToken from "../../hooks/useToken";

const RequireAuth = () => {
  const [token, setToken] = useToken();
  const location = useLocation();

  if (token === null) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default RequireAuth;
