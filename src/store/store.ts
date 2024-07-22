import { User } from "../types/User";
import AuthService from "../services/AuthService";
import {makeAutoObservable} from 'mobx';

export default class Store {
    user = {} as User;
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
        this.loadFromLocalStorage();
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
        localStorage.setItem("isAuth", JSON.stringify(bool));
    }

    setUser(user: User) {
        this.user = user;
        localStorage.setItem("user", JSON.stringify(user));
    }

    loadFromLocalStorage() {
        const storedUser = localStorage.getItem("user");
        const storedIsAuth = localStorage.getItem("isAuth");

        if (storedUser && storedIsAuth) {
            this.user = JSON.parse(storedUser);
            this.isAuth = JSON.parse(storedIsAuth);
        } else {
            this.user = {} as User;
            this.isAuth = false;
        }
    }

    login(email:string, password: string) {
        const result = AuthService.login(email, password);
        if (result.error) {
            this.setAuth(false);
            return { error: result.error };
        }

        this.setUser(result.user);
        this.setAuth(true);
        return { user: result.user };
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("isAuth");
        this.setAuth(false);
        this.setUser({} as User);
    }
}