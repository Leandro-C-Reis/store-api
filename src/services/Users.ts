import UsersRepository from '../database/repositories/UsersRepository';

export default class Users {

    static async getAll()
    {
        const users = new UsersRepository();

        return await users.getAll();
    }

    static async getOne(id: number)
    {
        const users = new UsersRepository();

        return await users.getOne(id);
    }

    static async create(params: any)
    {
        const users = new UsersRepository();

        return await users.create(params);
    }

    static async update(params: any, id: number)
    {
        const users = new UsersRepository();

        return await users.update(params, id);
    }

    static async delete(id: number)
    {
        const users = new UsersRepository();

        return await users.delete(id);
    }
}