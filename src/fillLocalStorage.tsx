const USERS = [
  {
    id: 1,
    email: "ivan@mail.ru",
    password: "ivan",
    categories: [37, 18],
    favoriteMovies: [
      932086, 68718, 281957, 533535, 573435, 519182, 1022789, 1209290, 1048241,
      748783, 786892, 293660, 974262, 653346, 1152624, 1010600, 729165, 1174618,
      383498, 646683, 280180,
    ],
  },
  {
    id: 2,
    email: "artem@mail.ru",
    password: "artem",
    categories: [],
    favoriteMovies: [],
  },
  {
    id: 3,
    email: "maks@mail.ru",
    password: "maks",
    categories: [18],
    favoriteMovies: [],
  },
];

export function fillLocalStorage() {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(USERS));
  }
}
