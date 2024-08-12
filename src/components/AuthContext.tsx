import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { User } from "../types/User";
import { findByEmail } from "../repositories/UserRepository";

type AuthContextType = {
  user: User | null;
  setUser: (user: User) => void;
  isLoggedIn: () => boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const defaultAuthContext: AuthContextType = {
  user: null,
  setUser: (user: User) => {},
  isLoggedIn: () => false,
  login: async () => false,
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [componentIsReady, setComponentIsReady] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "null"));
    setComponentIsReady(true);
  }, []);

  const login = async (email: string, password: string) => {
    const optionalUser = await findByEmail(email);
    if (optionalUser && password === optionalUser.password) {
      localStorage.setItem("user", JSON.stringify(optionalUser));
      setUser(optionalUser);
      return true;
    }
    return false;
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        login,
        logout
      }}
    >
      {componentIsReady ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
