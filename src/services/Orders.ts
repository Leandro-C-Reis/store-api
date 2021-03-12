import OrdersRepository from '../database/repositories/OrdersRepository';
import ProductsOrdersRepository from '../database/repositories/ProductsOrdersRepository';
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
        const products: Array<any> = params.products;
        
        delete params.products;
        
        params.created_at = this.timestamps();

        const order = await orders.create(params);

        const order_id = order.raw.insertId;
        const productsOrders = new ProductsOrdersRepository();

        for await (let product of products)
        {
            await productsOrders.create({
                order_id,
                product_id: product.id,
                amount: product.amount,
            });
        }

        return order;
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