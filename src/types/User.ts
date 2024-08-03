export type User = {
  id: number;
  email: string;
  password: string;
  favoriteGenresId: number[];
  favoriteMoviesId: number[];
  watchedMoviesId: number[];
};
