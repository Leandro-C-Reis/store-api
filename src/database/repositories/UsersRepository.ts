import UserModel from '../models/Users';
import { getRepository, Repository } from 'typeorm';
import IRepository from './IRepository';

export default class UsersRepository extends IRepository {
    repo: Repository<any>;

    constructor() {
        super()
        {
            const repo = getRepository(UserModel);
            this.repo = repo;
        }
    }

    public async getOne(id: number) {
        return this.repo.findOne(id, { relations: ['addresses'] })
    }

    public async getByEmail(email: string) {
        return this.repo.findOne({
            where: { email },
            select: [
                'password',
                'id',
                'name',
                'email',
                'created_at',
                'updated_at'
            ]
        });
    }
}
