import IService from './IService';
import ProductsRepository from '../database/repositories/ProductsRepository';
import ProductInventoryRepository from '../database/repositories/ProductInventoryRepository';

export default class Products extends IService {
    public static async getAll()
    {
        const products = new ProductsRepository();

        return await products.getAll();
    }

    public static async getOne(id: number)
    {
        const products = new ProductsRepository();

        return await products.getOne(id);
    }

    public static async create(params: any)
    {
        const products = new ProductsRepository();

        params.created_at = this.timestamps();

        return await products.create(params);
    }

    public static async update(params: any, id: number)
    {
        const products = new ProductsRepository();

        params.updated_at = this.timestamps();

        return await products.update(params, id);
    }

    public static async delete(id: number)
    {
        const products = new ProductsRepository();

        return await products.delete(id);
    }

    public static async createInventory(id: number, amount: number = 0)
    {
        const Inventory = new ProductInventoryRepository();

        const inventory = await Inventory.create({
            amount,
            product: id
        });

        return inventory;
    }

    public static async updateInventory(id: number, amount: number = 0)
    {
        const Inventory = new ProductInventoryRepository();

        return await Inventory.update({ amount }, id);
    }
}
