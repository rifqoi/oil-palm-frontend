import React from "react";
import { Navigate } from "react-router-dom";
import useToken from "../../hooks/useToken";

const Logout = () => {
  localStorage.removeItem("access_token");
  return <Navigate to="/login" />;
};

export default Logout;
