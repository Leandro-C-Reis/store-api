import UsersRepository from '../database/repositories/UsersRepository';
import { password_hash } from 'nodejs-password';

export default class Users {

    public static async getAll()
    {
        const users = new UsersRepository();

        return await users.getAll();
    }

    public static async getOne(id: number)
    {
        const users = new UsersRepository();

        return await users.getOne(id);
    }

    public static async create(params: any)
    {
        const users = new UsersRepository();
        
        const password_hashed = await password_hash(params.password);
        
        params.password = password_hashed;

        return await users.create(params);
    }

    public static async update(params: any, id: number)
    {
        if (params.password)
        {
            params.password = await password_hash(params.password);
        }

        const users = new UsersRepository();

        return await users.update(params, id);
    }

    public static async delete(id: number)
    {
        const users = new UsersRepository();

        return await users.delete(id);
    }
}