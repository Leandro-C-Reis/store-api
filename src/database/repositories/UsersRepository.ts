import UserModel from '../models/Users';
import { getRepository, Repository } from 'typeorm';
import IRepository from './IRepository';

export default class UsersRepository extends IRepository {
    repo: Repository<any>;

    constructor()
{
        super()
        {
            const repo = getRepository(UserModel);
            this.repo = repo;
        }
    }
}
