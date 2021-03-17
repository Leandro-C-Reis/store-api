import { Request, Response } from 'express';
import Products from '../services/Products';
import Joi from 'joi';
export default class ProductsController {

    public static async index(request: Request, response: Response)
    {
        const products = await Products.getAll();

        return response.json(products);
    }

    public static async show(request: Request, response: Response)
    {
        const id = parseInt(request.params.id);

        if (!id)
        {
            return response.json({ error: "ID inválido!" });
        }

        const product = await Products.getOne(id);

        return response.json(product);
    }

    public static async create(request: Request, response: Response)
    {
        delete request.body.user;

        const schema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required().max(255),
            value: Joi.number().required(),
            inventory: Joi.number().integer().optional()
        });

        const validate = schema.validate(request.body)
        
        if (validate.error)
        {
            return response.json(validate.error);
        }

        const product = await Products.create(request.body);

        const id = product.raw.insertId;

        const inventory = await Products.createInventory(id, request.body.inventory);

        return response.json({product, inventory});
    }

    public static async update(request: Request, response: Response)
    {
        delete request.body.user;

        const id = parseInt(request.params.id);

        if (!id)
        {
            return response.json({ error: "ID inválido!" });
        }

        const schema = Joi.object({
            title: Joi.string(),
            description: Joi.string().max(255),
            value: Joi.number(),
            inventory: Joi.number().integer().optional()
        });

        const validate = schema.validate(request.body)
        
        if (validate.error)
        {
            return response.json(validate.error);
        }
        
        if (request.body.inventory)
        {
            await Products.updateInventory(id, request.body.inventory);
            
            delete request.body.inventory;
        }

        const updated = await Products.update(request.body, id);

        return response.json(updated);
    }

    public static async delete(request: Request, response: Response)
    {
        const id = parseInt(request.params.id);

        if (!id)
        {
            return response.json({ error: "ID inválido!" });
        }

        const deleted = await Products.delete(id);

        return response.json(deleted);
    }
}