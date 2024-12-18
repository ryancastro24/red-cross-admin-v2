import { Navigate, Outlet } from "react-router-dom";
import { checkAuth } from "../utils/auth";
import Dashboard from "@/pages/DashboardPage"; // Import Dashboard component

const PrivateRoute = () => {
  const isAuthenticated = checkAuth();

  // If authenticated, render Dashboard and its children
  if (isAuthenticated) {
    return (
      <div>
        <Dashboard /> {/* Render Dashboard directly */}
        <Outlet /> {/* Render nested routes here */}
      </div>
    );
  }

  // If not authenticated, redirect to login page
  return <Navigate to="/" replace />;
};

export default PrivateRoute;
