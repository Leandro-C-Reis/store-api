import UsersRepository from '../database/repositories/UsersRepository';
import { password_hash, password_verify } from 'nodejs-password';
import IService from './IService';

export default class Users extends IService {

    public static async getAll() {
        const users = new UsersRepository();

        return await users.getAll();
    }

    public static async getOne(id: number) {
        const users = new UsersRepository();

        return await users.getOne(id);
    }

    public static async create(params: any) {
        const users = new UsersRepository();

        const password_hashed = await password_hash(params.password);

        params.password = password_hashed;

        const created = await users.create(params);
        const user = await users.getOne(this.getId(created));

        return user;
    }

    public static async update(params: any, id: number) {
        if (params.password) {
            params.password = await password_hash(params.password);
        }

        const users = new UsersRepository();
        await users.update(params, id);
        const user = await users.getOne(id);

        return user;
    }

    public static async delete(id: number) {
        const users = new UsersRepository();

        return await users.delete(id);
    }

    public static async verifyCredentials(email: string, password: string) {
        const users = new UsersRepository();
        const user = await users.getByEmail(email);

        if (!user?.id) {
            return false;
        }

        const status = await password_verify(password, user.password);

        if (!status) {
            return false;
        }

        delete user.password;

        return user;
    }

    public static async exists(email: string) {
        const Users = new UsersRepository();
        const user = await Users.getByEmail(email);

        if (!user?.id) {
            return false;
        }

        return true;
    }
}