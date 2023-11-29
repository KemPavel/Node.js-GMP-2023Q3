import { Injectable } from '@nestjs/common';
import {getUser, createUser, getUsers} from "./auth.data";

@Injectable()
export class AuthService {
    getUsers() {
        return getUsers();
    }

    getUser(email) {
        return getUser(email);
    }

    createUser(userData) {
        return createUser(userData);
    }
}
