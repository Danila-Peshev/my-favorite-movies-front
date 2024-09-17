import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { User } from "../types/User";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { LOGIN } from "../queries-mutations/mutations";
import { GET_USER } from "../queries-mutations/queries";

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
  const [loginMutation] = useMutation(LOGIN);
  const {data, loading, error} = useQuery(GET_USER)
  const [getUserQuery] = useLazyQuery(GET_USER)


  useEffect(() => {
    if (!loading && !error && data) {
      setUser({id: data.getUser.id, email: data.getUser.email});
      setComponentIsReady(true);
    } else if (error) {
      setComponentIsReady(true);
    }
  }, [data, error, loading]);

  const login = async (email: string, password: string) => {
    const responseMutation = await loginMutation({variables: {email, password}})
    localStorage.setItem("token", responseMutation.data.login.token)
    const responseQuery = await getUserQuery()
    if (!responseQuery.error && responseQuery.data) {
      setUser({id: responseQuery.data.getUser.id, email: responseQuery.data.getUser.email});
      return true;
    }
    return false
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
