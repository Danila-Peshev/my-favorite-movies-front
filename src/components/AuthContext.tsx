import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { User } from "../types/User";
import useLogin from "../gql-hooks/useLogin";

type AuthContextType = {
  user: User | null;
  isLoggedIn: () => boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const defaultAuthContext: AuthContextType = {
  user: null,
  isLoggedIn: () => false,
  login: async () => false,
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [componentIsReady, setComponentIsReady] = useState(false);
  const {
    loginMutation,
    dataGetUser,
    isLoadingGetUser,
    errorGetUser,
    refetchGetUser,
  } = useLogin();

  useEffect(() => {
    if (!isLoadingGetUser && !errorGetUser && dataGetUser) {
      setUser({ id: dataGetUser.getUser.id, email: dataGetUser.getUser.email });
      setComponentIsReady(true);
    }
    setComponentIsReady(true);
  }, [dataGetUser, errorGetUser, isLoadingGetUser]);

  const login = async (email: string, password: string) => {
    try {
      const responseMutation = await loginMutation({
        variables: { email, password },
      });
      localStorage.setItem("token", responseMutation.data.login.token);
      await refetchGetUser();
      return true;
    } catch {
      return false;
    }
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {componentIsReady ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext<AuthContextType>(AuthContext);
