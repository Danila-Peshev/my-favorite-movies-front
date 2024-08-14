export const getFavoriteGenresByUserId = (userId: number): number[] => {
  const userGenres = JSON.parse(localStorage.getItem("userGenres") || "[]");
  return userGenres
  .filter((value: { user_id: number; }) => value.user_id === userId)
  .map((value: { genre_id: any; }) => value.genre_id);
  
};

export const getFavoriteMoviesByUserId = (userId: number): number[] => {
  const userMovies = JSON.parse(localStorage.getItem("userMovies") || "[]");
  return userMovies
  .filter((value: { user_id: number; }) => value.user_id === userId)
  .map((value: { movie_id: any; }) => value.movie_id);
};

export const getWatchedMoviesByUserId = (userId: number): number[] => {
  const userWatchedMovies = JSON.parse(
    localStorage.getItem("userWatchedMovies") || "[]"
  );
  return userWatchedMovies
  .filter((value: { user_id: number; }) => value.user_id === userId)
  .map((value: { watched_movie_id: any; }) => value.watched_movie_id);
};



export const addFavoriteGenreByUserId = (
  userId: number,
  genreId: number
): void => {
  const userGenres = JSON.parse(localStorage.getItem("userGenres") || "[]");
  userGenres.push({user_id: userId, genre_id: genreId});
  localStorage.setItem(
    "userGenres",
    JSON.stringify(userGenres)
  );
}

export const addFavoriteMovieByUserId = (
  userId: number,
  movieId: number
): void => {
  const userMovies = JSON.parse(localStorage.getItem("userMovies") || "[]");
  userMovies.push({user_id: userId, movie_id: movieId});
  localStorage.setItem(
    "userMovies",
    JSON.stringify(userMovies)
  );
}

export const addWatchedMovieByUserId = (
  userId: number,
  watchedMovieId: number
): void => {
  const userWatchedMovies = JSON.parse(localStorage.getItem("userWatchedMovies") || "[]");
  userWatchedMovies.push({user_id: userId, watched_movie_id: watchedMovieId});
  localStorage.setItem(
    "userWatchedMovies",
    JSON.stringify(userWatchedMovies)
  );
}



export const removeFavoriteGenreByUserId = (
  userId: number,
  genreId: number
): void => {
  const userGenres = JSON.parse(localStorage.getItem("userGenres") || "[]");

  const index = userGenres.findIndex(
    (item: { user_id: number; genre_id: number; }) => item.user_id === userId && item.genre_id === genreId
  );

  if (index !== -1) {
    userGenres.splice(index, 1);
    localStorage.setItem("userGenres", JSON.stringify(userGenres));
  }
};

export const removeFavoriteMovieByUserId = (
  userId: number,
  movieId: number
): void => {
  const userMovies = JSON.parse(localStorage.getItem("userMovies") || "[]");

  const index = userMovies.findIndex(
    (item: { user_id: number; movie_id: number; }) => item.user_id === userId && item.movie_id === movieId
  );

  if (index !== -1) {
    userMovies.splice(index, 1);
    localStorage.setItem("userMovies", JSON.stringify(userMovies));
  }
};

export const removeWatchedMovieByUserId = (
  userId: number,
  watchedMovieId: number
): void => {
  const userWatchedMovies = JSON.parse(
    localStorage.getItem("userWatchedMovies") || "[]"
  );

  const index = userWatchedMovies.findIndex(
    (item: { user_id: number; watched_movie_id: number; }) => item.user_id === userId && item.watched_movie_id === watchedMovieId
  );

  if (index !== -1) {
    userWatchedMovies.splice(index, 1);
    localStorage.setItem("userWatchedMovies", JSON.stringify(userWatchedMovies));
  }
};