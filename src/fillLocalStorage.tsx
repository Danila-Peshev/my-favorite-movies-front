const Users = [
    {
        id: 1,
        email: "ivan@mail.ru",
        password: "ivan",
        categories: ["horrors", "action"]
    },
    {
        id: 2,
        email: "artem@mail.ru",
        password: "artem",
        categories: []
    },
    {
        id: 3,
        email: "maks@mail.ru",
        password: "maks",
        categories: ["comedy", "action"]
    },
]

export function fillLocalStorage() {
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(Users));
    }
}