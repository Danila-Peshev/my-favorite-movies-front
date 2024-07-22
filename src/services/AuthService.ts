import { findByEmail } from '../repositories/UserRepository'

export default class AuthService {
    static login(email: string, password: string) {
        if (!email || !password) {
            return { error: "Ни одно поле не должно быть пустым" };
        }

        const user = findByEmail(email);
        if (!user) {
            return { error: "Пользователя с таким email не существует" };
        }

        const isPasswordEquals = password === user.password;
        if (!isPasswordEquals) {
            return { error: "Неправильный пароль" };
        }

        return { user };
    }
}