import { Tag } from './../types/types.d';
import IService from './IService';
import ProductsRepository from '../database/repositories/ProductsRepository';
import ProductInventoryRepository from '../database/repositories/ProductInventoryRepository';
import Types from '../types/types';
import ProductsTagsRepository from '../database/repositories/ProductsTagsRepository';

export default class Products extends IService {
    public static async getAll() {
        const Products = new ProductsRepository();

        let products = await Products.getAll();

        products = products.map(this.filterProduct);

        return products;
    }

    public static async getOne(id: number, filter: any = "true") {
        const Products = new ProductsRepository();

        const product = await Products.getOne(id);

        if (filter == "true") {
            return this.filterProduct(product);
        }

        return product;
    }

    public static async create(params: any) {
        const products = new ProductsRepository();

        const created = await products.create(params);
        const product = await products.getOne(this.getId(created));

        return product;
    }

    public static async update(params: any, id: number) {
        const products = new ProductsRepository();

        await products.update(params, id);
        const product = await products.getOne(id);

        return product;
    }

    public static async delete(id: number) {
        const products = new ProductsRepository();

        return await products.delete(id);
    }

    public static async createInventory(id: number, amount: number = 0) {
        const Inventory = new ProductInventoryRepository();

        const inventory = await Inventory.create({
            amount,
            product: id
        });

        const inventoryId = this.getId(inventory);

        return Inventory.getOne(inventoryId);
    }

    public static async updateInventory(id: number, amount: number = 0) {
        const Inventory = new ProductInventoryRepository();

        return await Inventory.update({ amount }, id);
    }

    public static async createTags(product_id: number, tags: [string]) {
        const Tags = new ProductsTagsRepository();

        if (!tags) {
            return;
        }

        const create = [];
        for await (const tag of tags) {
            const status = await Tags.create({ product_id, tag });
            const id = this.getId(status);

            create.push(await Tags.getOne(id));
        }

        return create;
    }

    public static async updateTags(product_id: number, tags: [Types.Tag]) {
        const Tags = new ProductsTagsRepository();

        for await (const tag of tags) {
            const Tag: any = await Tags.getOne(tag.id || 0);

            // Conditional to update tag 
            if (!Tag || Tag.product_id != product_id) {
                continue;
            }

            await Tags.update({ tag: tag.tag }, tag.id || 0);
        }
    }

    public static filterProduct(product: Types.Product) {
        product.tags = product.tags.map((tag: Types.Tag | any) => {
            delete tag.id;
            delete tag.product_id;
            return tag.tag;
        })
        delete product.inventory.id;

        return product;
    }
}
