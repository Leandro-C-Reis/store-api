import { Repository, getRepository } from 'typeorm';
import AddressModel from '../models/Addresses';
import IRepository from './IRepository';

export default class AddressRepository extends IRepository{
    repo: Repository<any>

    constructor()
    {
        super()
        {
            const repo = getRepository(AddressModel);

            this.repo = repo;
        }
    }
}