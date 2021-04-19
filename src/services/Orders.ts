import OrdersRepository from '../database/repositories/OrdersRepository';
import ProductsRepository from '../database/repositories/ProductsRepository';
import ProductsOrdersRepository from '../database/repositories/ProductsOrdersRepository';
import InventoryRepository from '../database/repositories/ProductInventoryRepository';
import IService from './IService';
import * as Types from '../types/types';

export default class Orders extends IService{

    public static async getAll()
    {
        const orders = new OrdersRepository();

        return await orders.getAll();
    }

    public static async getOne(id: number)
    {
        const orders = new OrdersRepository();

        const order: Types.Order = await orders.getOne(id);
        return order;
    }

    public static async create(params: Types.order) 
    {
        // instance objects
        const orders         = new OrdersRepository();
        const productsOrders = new ProductsOrdersRepository();
        const inventory      = new InventoryRepository();
        const productRepo    = new ProductsRepository();

        // extract object
        const products: [Types.product] | [] = params.products || [];
        delete params.products;
        
        params.created_at = this.timestamps();
        
        // create order and get id;
        const created = await orders.create(params);
        const order_id = this.getId(created);
    
        // create relationship and update inventory
        for await (let product of products)
        {
            await productsOrders.create({
                order_id,
                product_id: product.id,
                amount: product.amount,
            });
            
            console.log('aqui')
            const PRODUCT: Types.Product = await productRepo.getOne(product.id);

            await inventory.update({
                amount: PRODUCT.inventory.amount - product.amount
            }, product.id);
        }
        
        return orders.getOne(order_id);
    }

    public static async update(params: any, id: number)
    {
        const orders = new OrdersRepository();

        params.updated_at = this.timestamps();

        await orders.update(params, id);
        const order = await orders.getOne(id);

        return order;
    }

    public static async delete(id: number)
    {
        const orders = new OrdersRepository();

        return await orders.delete(id);
    }

    public static async existProducts(products: [Types.product])
    {
        const Repo = new ProductsRepository();

        for await (const product of products)
        {
            const find = await Repo.getOne(product.id);
            
            if (!find)
            {
                return false;
            }
        }

        return true;
    }

    public static async validateQuantity(products: [Types.product])
    {
        const Repo = new ProductsRepository();

        const errors = [];

        for await (const req of products)
        {
            const product: Types.Product = await Repo.getOne(req.id);

            if (req.amount > product.inventory.amount)
            {
                errors.push(req);
            }
        }

        return errors;
    }

    public static async cancelOrder(id: number)
    {
        const orders         = new OrdersRepository();
        const inventory      = new InventoryRepository();
        
        const order: Types.Order = await orders.getOne(id);
        
        for await(const productOrder of order.products)
        {
            const productInventory: Types.Inventory = await inventory.getByProductId(productOrder.product.id);
            await inventory.update({ amount: productOrder.amount + productInventory.amount }, productOrder.product.id);
        }

        await orders.update({ is_active: false, updated_at: this.timestamps() }, id);
    }

    public static async getAllActives()
    {
        const orders = new OrdersRepository();
        
        return await orders.getAllActives();
    }

    public static async getByUser(id: number)
    {
        const orders = new OrdersRepository();

        return await orders.getByUser(id);
    }
}