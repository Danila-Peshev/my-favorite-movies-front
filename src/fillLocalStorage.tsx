import { User } from "./types/User";

const USERS: User[] = [
  {
    id: 1,
    email: "ivan@mail.ru",
    password: "ivan",
    favoriteGenresId: [37, 18],
    favoriteMoviesId: [
      932086, 68718, 281957, 533535, 573435, 519182, 1022789, 1209290, 1048241,
      748783, 786892, 293660, 974262, 653346, 1152624, 1010600, 729165, 1174618,
      383498, 646683, 280180,
    ],
    watchedMoviesId: [68718, 573435, 1152624]
  },
  {
    id: 2,
    email: "artem@mail.ru",
    password: "artem",
    favoriteGenresId: [],
    favoriteMoviesId: [],
    watchedMoviesId: []
  },
  {
    id: 3,
    email: "maks@mail.ru",
    password: "maks",
    favoriteGenresId: [18],
    favoriteMoviesId: [],
    watchedMoviesId: []
  },
];

export function fillLocalStorage() {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(USERS));
  }
}
