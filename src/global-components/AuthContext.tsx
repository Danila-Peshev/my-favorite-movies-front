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
  isLoggedIn: () => boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  getFavoriteGenresId: () => number[];
  getFavoriteMoviesId: () => number[];
  getWatchedMoviesId: () => number[];
  addFavoriteMovie: (movieId: number) => void;
  removeFavoriteMovie: (movieId: number) => void;
  addWatchedMovie: (movieId: number) => void;
  removeWatchedMovie: (movieId: number) => void;
  addFavoriteGenre: (genreId: number) => void;
  removeFavoriteGenre: (genreId: number) => void;
};

const defaultAuthContext: AuthContextType = {
  user: null,
  isLoggedIn: () => false,
  login: async () => false,
  logout: () => {},
  getFavoriteGenresId: () => [],
  getFavoriteMoviesId: () => [],
  getWatchedMoviesId: () => [],
  addFavoriteMovie: () => {},
  removeFavoriteMovie: () => {},
  addWatchedMovie: () => {},
  removeWatchedMovie: () => {},
  addFavoriteGenre: () => {},
  removeFavoriteGenre: () => {},
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

  const getFavoriteGenresId = () => {
    if (user) {
      return user.favoriteGenresId;
    } else {
      return [];
    }
  };

  const getFavoriteMoviesId = () => {
    if (user) {
      return user.favoriteMoviesId;
    } else {
      return [];
    }
  };

  const getWatchedMoviesId = () => {
    if (user) {
      return user.watchedMoviesId;
    } else {
      return [];
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const addFavoriteMovie = (movieId: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        favoriteMoviesId: [...user.favoriteMoviesId, movieId],
      };
      updateUser(updatedUser);
    }
  };

  const removeFavoriteMovie = (movieId: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        favoriteMoviesId: user.favoriteMoviesId.filter((id) => id !== movieId),
      };
      updateUser(updatedUser);
    }
  };

  const addWatchedMovie = (movieId: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        watchedMoviesId: [...user.watchedMoviesId, movieId],
      };
      updateUser(updatedUser);
    }
  };

  const removeWatchedMovie = (movieId: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        watchedMoviesId: user.watchedMoviesId.filter((id) => id !== movieId),
      };
      updateUser(updatedUser);
    }
  };

  const addFavoriteGenre = (genreId: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        favoriteGenresId: [...user.favoriteGenresId, genreId],
      };
      updateUser(updatedUser);
    }
  };

  const removeFavoriteGenre = (genreId: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        favoriteGenresId: user.favoriteGenresId.filter((id) => id !== genreId),
      };
      updateUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
        addFavoriteMovie,
        removeFavoriteMovie,
        addWatchedMovie,
        removeWatchedMovie,
        addFavoriteGenre,
        removeFavoriteGenre,
        getFavoriteGenresId,
        getFavoriteMoviesId,
        getWatchedMoviesId,
      }}
    >
      {componentIsReady ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
