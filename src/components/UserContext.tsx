import { ReactNode, useContext } from "react";
import { createContext } from "react";
import { User } from "../types/User";
import { useAuth } from "./AuthContext";

type UserContextType = {
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

const defaultUserContext: UserContextType = {
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

const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user, setUser } = useAuth();

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
    <UserContext.Provider
      value={{
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
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
