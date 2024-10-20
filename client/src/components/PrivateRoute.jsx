import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const authToken = localStorage.getItem("auth_token");

  if (!authToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
