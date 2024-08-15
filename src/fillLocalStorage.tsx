import { User } from "./types/User";

const USERS: User[] = [
  {
    id: 1,
    email: "ivan@mail.ru",
    password: "ivan",
  },
  {
    id: 2,
    email: "maks@mail.ru",
    password: "maks",
  },
];

const USER_MOVIES: { user_id: number; movie_id: number }[] = [
  {
    user_id: 1,
    movie_id: 932086,
  },
  {
    user_id: 1,
    movie_id: 68718,
  },
  {
    user_id: 1,
    movie_id: 281957,
  },
  {
    user_id: 1,
    movie_id: 533535,
  },
  {
    user_id: 1,
    movie_id: 573435,
  },
  {
    user_id: 1,
    movie_id: 519182,
  },
  {
    user_id: 1,
    movie_id: 1022789,
  },
  {
    user_id: 1,
    movie_id: 1209290,
  },
  {
    user_id: 1,
    movie_id: 1048241,
  },
  {
    user_id: 1,
    movie_id: 748783,
  },
  {
    user_id: 1,
    movie_id: 786892,
  },
];

const USER_GENRES: { user_id: number; genre_id: number }[] = [
  {
    user_id: 1,
    genre_id: 10751,
  },
  {
    user_id: 1,
    genre_id: 37,
  },
];

const USER_WATCHED_MOVIES: { user_id: number; watched_movie_id: number }[] = [
  {
    user_id: 1,
    watched_movie_id: 533535,
  },
  {
    user_id: 1,
    watched_movie_id: 573435,
  },
  {
    user_id: 1,
    watched_movie_id: 519182,
  },
  {
    user_id: 1,
    watched_movie_id: 1022789,
  },
];

export function fillLocalStorage() {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(USERS));
    localStorage.setItem("userMovies", JSON.stringify(USER_MOVIES));
    localStorage.setItem("userGenres", JSON.stringify(USER_GENRES));
    localStorage.setItem(
      "userWatchedMovies",
      JSON.stringify(USER_WATCHED_MOVIES)
    );
  }
}
