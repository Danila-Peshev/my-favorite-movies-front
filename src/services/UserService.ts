import { removeFavoriteGenre, removeFavoriteMovie, removeWatchedMovie, updateFavoriteGenres, updateFavoriteMovies, updateWatchedMovies } from "../repositories/UserRepository";
import { User } from "../types/User";

export function addFavoriteMovie(user: User, movieId: number): void {
  updateFavoriteMovies(user, movieId);
}

export function deleteFavoriteMovie(user: User, movieId: number): void {
  removeFavoriteMovie(user, movieId)
}

export function addFavoriteGenre(user: User, genreId: number): void {
  updateFavoriteGenres(user, genreId);
}

export function deleteFavoriteGenre(user: User, genreId: number): void {
  removeFavoriteGenre(user, genreId)
}

export function addWatchedMovie(user: User, movieId: number): void {
  updateWatchedMovies(user, movieId);
}

export function deleteWatchedMovie(user: User, movieId: number): void {
  removeWatchedMovie(user, movieId)
}