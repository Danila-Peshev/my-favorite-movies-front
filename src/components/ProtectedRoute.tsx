import { PropsWithChildren, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "..";
import { observer } from "mobx-react-lite";


type ProtectedRouteProps = PropsWithChildren;

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { store } = useContext(Context);

  useEffect(() => {
    if (!store.isAuth) {
      navigate('/login', { replace: true, state: { from: location } });
    }
  }, [navigate, store.isAuth, location]);

  return <>{children}</>;
}

export default observer(ProtectedRoute);