import { findByEmail } from '../repositories/UserRepository'
import { User } from '../types/User';

export function login(email: string, password: string) {

    const user = findByEmail(email);
    if (!user) {
        console.log("нет пользователя с такой почтой")
    } else {
        const isPasswordEquals = password === user?.password;
        if (!isPasswordEquals) {
            console.log("неправильный пароль")
        } else {
            return user;
        }
    }
}