import ProductsModel from '../models/Products';
import { getRepository, Repository } from 'typeorm';
import IRepository from './IRepository';

export default class ProductsRepository extends IRepository {
    repo: Repository<any>

    constructor()
    {
        super()
        {
            const repo = getRepository(ProductsModel);
            this.repo = repo;
        }
    }

    async getAll()
    {
        return this.repo.find({ relations: ['inventory', 'tags'] });
    }
    
    async getOne(id: number)
    {
        return this.repo.findOne(id, { relations: ['inventory', 'tags'] });
    }
}
