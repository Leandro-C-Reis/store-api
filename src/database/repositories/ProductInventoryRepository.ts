import ProductInventoryModel from '../models/ProductInventory';
import { getRepository, Repository } from 'typeorm';
import IRepository from './IRepository';

export default class ProductsRepository extends IRepository {
    repo: Repository<any>

    constructor()
    {
        super()
        {
            const repo = getRepository(ProductInventoryModel);
            this.repo = repo;
        }
    }

    async update(params: any, id: number)
    {
        const inventory = await this.getByProductId(id);
        
        return await this.repo.update(inventory.id, params);
    }

    async getByProductId(id: number)
    {
        return await this.repo.findOne({ where: { product: id } });
    }
}
