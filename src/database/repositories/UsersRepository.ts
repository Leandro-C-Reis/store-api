import UserModel from '../models/Users';
import { getRepository } from 'typeorm';

export default class UsersRepository {
    repo;

    constructor()
    {
        const repo = getRepository(UserModel);
        this.repo = repo;
    }   

    public async getAll()
    {
        return this.repo.find();
    }

    public async getOne(id: number)
    {
        return this.repo.findOne(id);
    }

    public async create(params: any)
    {
        return this.repo.save(params);
    }

    public async update(params: any, id: number)
    {
        return this.repo.update(id, params);
    }

    public async delete(id: number)
    {
        return this.repo.delete(id);
    }
}
