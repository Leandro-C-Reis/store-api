import { Repository, getRepository } from 'typeorm';
import ProductsOrdersModel from '../models/ProductsOrders';
import IRepository from './IRepository';

export default class ProductsOrdersRepository extends IRepository{
    repo: Repository<any>

    constructor()
    {
        super()
        {
            const repo = getRepository(ProductsOrdersModel);

            this.repo = repo;
        }
    }
}