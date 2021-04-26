import { password_hash, password_verify } from 'nodejs-password';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';

export default class Users {

    public static async getAll() {
       const usersRepo = getCustomRepository(UsersRepository);

       const users = await usersRepo.find();

       return users;
    }

    public static async getOne(id: number) {
        const usersRepo = getCustomRepository(UsersRepository);

        const user = await usersRepo.findOne({
            id
        });

        return user;
    }

    public static async create(data: any) {
        const usersRepo = getCustomRepository(UsersRepository);

        const password_hashed = await password_hash(data.password);
        data.password = password_hashed;

        const user = await usersRepo.save(data);

        return user;
    }

    public static async update(data: any, id: number) {
        const usersRepo = getCustomRepository(UsersRepository);

        if (data.password) {
            data.password = await password_hash(data.password);
        }

        const user = await usersRepo.update({
            id
        }, data);

        return user;
    }

    public static async delete(id: number) {
       const usersRepo = getCustomRepository(UsersRepository);
       
       const deleted = await usersRepo.delete({
            id
       });

       return deleted;
    }

    public static async verifyCredentials(email: string, password: string) {
        const usersRepo = getCustomRepository(UsersRepository);
        const user = await usersRepo.findOne({ email }, {
            select: ['email', 'password']
        });
        

        if (!user) {
            return false;
        }

        const status = await password_verify(password, user.password);

        if (!status) {
            return false;
        }

        return true;
    }

    public static async exists(email: string) {
        const usersRepo = getCustomRepository(UsersRepository);
        const user = await usersRepo.findOne({ email });

        return user;
    }
}