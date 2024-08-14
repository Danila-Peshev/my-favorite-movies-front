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
  user: User;
  isLoggedIn: () => boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: {} as User,
  isLoggedIn: () => false,
  login: async () => false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({} as User);
  const [componentIsReady, setComponentIsReady] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
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

  const isLoggedIn = () => Object.keys(user).length > 0;

  const logout = () => {
    localStorage.removeItem("user");
    setUser({} as User);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {componentIsReady ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
