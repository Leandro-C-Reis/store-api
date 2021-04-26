import { v4 as uuid } from 'uuid';
import Product from '../models/Products';

export default class Products {
    public static async getAll() {
        const products = await Product.find();

        return products;
    }

    public static async getOne(id: string) {
        const product = await Product.findOne({
            id
        });

        return product;
    }

    public static async create(params: any) {
        const id = uuid();

        const product = await Product.create({
            ...params,
            id,
            created_at: Date.now(),
            updated_at: Date.now()
        });

        return product;
    }

    public static async update(params: any, id: string) {
        const product = await Product.findOneAndUpdate({ id },{ 
            ...params,
            updated_at: Date.now()
         });

        return product;
    }

    public static async delete(id: string) {
        const product = await Product.findOneAndRemove({ id });

        return product;
    }
}
