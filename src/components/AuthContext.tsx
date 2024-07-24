import { createContext, useContext, ReactNode, useState, useEffect} from "react";
import { User } from "../types/User"
import { findByEmail } from "../repositories/UserRepository";

type AuthContextType = {
    user: User | null;
    isLoggedIn: () => boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const defaultAuthContext: AuthContextType = {
    user: null,
    isLoggedIn: () => false,
    login: async () => false,
    logout: () => {}
}

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [componentIsReady, setComponentIsReady] = useState(false);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user") || "null"));
        setComponentIsReady(true);
    }, [])

    const login = async (email: string, password: string) => {
        const optinalUser = await findByEmail(email);
        if (optinalUser && password === optinalUser?.password) {
            localStorage.setItem("user", JSON.stringify(optinalUser))
            setUser(optinalUser);
            return true;
        }
        return false;
    } 

    const isLoggedIn = () => {
        return !!user;
    }

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={ {user, isLoggedIn, login, logout} }>
            {componentIsReady ? children : null}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext<AuthContextType>(AuthContext);