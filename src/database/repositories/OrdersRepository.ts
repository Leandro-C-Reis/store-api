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
}