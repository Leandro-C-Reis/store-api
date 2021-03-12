import OrdersRepository from '../database/repositories/OrdersRepository';
import IService from './IService';

export default class Orders extends IService{

    public static async getAll()
    {
        const orders = new OrdersRepository();

        return await orders.getAll();
    }

    public static async getOne(id: number)
    {
        const orders = new OrdersRepository();

        return await orders.getOne(id);
    }

    public static async create(params: any) 
    {
        const orders = new OrdersRepository();
        
        params.created_at = this.timestamps();
        
        return await orders.create(params);
    }

    public static async update(params: any, id: number)
    {
        const orders = new OrdersRepository();

        params.updated_at = this.timestamps();

        return await orders.update(params, id);
    }

    public static async delete(id: number)
    {
        const orders = new OrdersRepository();

        return await orders.delete(id);
    }
}