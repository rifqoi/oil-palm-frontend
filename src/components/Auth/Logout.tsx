import { Navigate } from "react-router-dom";

const Logout = () => {
  localStorage.removeItem("access_token");
  return <Navigate to="/login" />;
};

export default Logout;
