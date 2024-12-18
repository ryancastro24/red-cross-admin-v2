import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../utils/auth";

type PrivateRouteProps = {
  children: ReactNode; // Explicitly define children prop
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = checkAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default PrivateRoute;
