import { PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";


type ProtectedRouteProps = PropsWithChildren;

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login', { state: { from: location.pathname }, replace: true });
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return <>{children}</>;
}
export default ProtectedRoute;