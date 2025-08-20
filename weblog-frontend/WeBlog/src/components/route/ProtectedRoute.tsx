import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute = ({ redirectPath = "/auth/login" }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>; 
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ fromPath: location }} replace />;
  }

  return <Outlet />; 
};

export default ProtectedRoute;
