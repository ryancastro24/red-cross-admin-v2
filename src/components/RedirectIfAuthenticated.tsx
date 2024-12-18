import { Navigate } from "react-router-dom";
import { checkAuth } from "../utils/auth";

const RedirectIfAuthenticated = () => {
  const isAuthenticated = checkAuth();

  // If authenticated, redirect to dashboard
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : null;
};

export default RedirectIfAuthenticated;
