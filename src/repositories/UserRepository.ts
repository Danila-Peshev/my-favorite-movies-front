import { User } from "../types/User";

export function findByEmail(email: string) {
  const user = JSON.parse(localStorage.getItem("users") || "{}").find(
    (obj: { email: string }) => {
      return obj.email === email;
    }
  );
  return user;
}

export function saveUser(user: User): void {
  localStorage.setItem("user", JSON.stringify(user));
  let users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

  const updatedUsers = users.map(existingUser =>
    existingUser.id === user.id ? user : existingUser
  );

  localStorage.setItem("users", JSON.stringify(updatedUsers));
}

export function updateFavoriteMovies(user: User, movieId: number): void {
  user.favoriteMoviesId.push(movieId);
  saveUser(user);
}

export function removeFavoriteMovie(user: User, movieId: number): void {
  user.favoriteMoviesId = user.favoriteMoviesId.filter((id) => id !== movieId);
  saveUser(user);
}

export function updateFavoriteGenres(user: User, genreId: number): void {
  user.favoriteGenresId.push(genreId);
  saveUser(user);
}

export function removeFavoriteGenre(user: User, genreId: number): void {
  user.favoriteGenresId = user.favoriteGenresId.filter((id) => id !== genreId);
  saveUser(user);
}

export function updateWatchedMovies(user: User, movieId: number): void {
  user.watchedMoviesId.push(movieId);
  saveUser(user);
}

export function removeWatchedMovie(user: User, movieId: number): void {
  user.watchedMoviesId = user.watchedMoviesId.filter((id) => id !== movieId);
  saveUser(user);
}
