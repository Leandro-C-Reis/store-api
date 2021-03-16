import { Repository, getRepository } from 'typeorm';
import OrderModel from '../models/Orders';
import IRepository from './IRepository';

export default class OrdersRepository extends IRepository{
    repo: Repository<any>

    constructor()
    {
        super()
        {
            const repo = getRepository(OrderModel);

            this.repo = repo;
        }
    }

    async getAll()
    {
        return await this.repo.find({ relations: ['products', 'products.product'] });
    }

    async getOne(id: number)
    {
        return await this.repo.findOne(id, { relations: ['products', 'products.product'] });
    }

    async getAllActives()
    {
        return await this.repo.find({ where: { is_active: true } });
    }
}