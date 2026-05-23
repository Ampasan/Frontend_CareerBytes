import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AuthRoute = ({ children }) => {
  const { isAuthenticated, loading, requiresOAuthProfile } = useAuth();

  if (loading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to={requiresOAuthProfile ? "/oauth-profile" : "/"} replace />;
  }

  return children;
};

export default AuthRoute;
