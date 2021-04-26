import { Request, Response } from 'express';
import Products from '../services/Products';
import Joi from 'joi';
import { validate as uuid } from 'uuid';
export default class ProductsController {

    public static async index(request: Request, response: Response) {
        const products = await Products.getAll();

        return response.json(products);
    }

    public static async show(request: Request, response: Response) {
        const id = request.params.id;

        const isValid = uuid(id);

        if (!id || !isValid) {
            return response.json({ error: "ID inválido!" });
        }

        const product = await Products.getOne(id);

        return response.json(product);
    }

    public static async create(request: Request, response: Response) {
        delete request.body.user;

        const schema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required().max(255),
            value: Joi.number().required(),
            inventory: Joi.number().integer().optional(),
            tags: Joi.array().items(
                Joi.string().max(100)
            ).optional()
        });

        const validate = schema.validate(request.body)

        if (validate.error) {
            return response.json(validate.error);
        }

        const product = await Products.create(request.body);

        return response.json(product);
    }

    public static async update(request: Request, response: Response) {
        delete request.body.user;

        const id = request.params.id;

        const isValid = uuid(id);

        if (!id || !isValid) {
            return response.json({ error: "ID inválido!" });
        }

        const schema = Joi.object({
            title: Joi.string(),
            description: Joi.string().max(255),
            value: Joi.number(),
            inventory: Joi.number().integer().optional(),
            tags: Joi.array().items({
                id: Joi.number().positive().required(),
                tag: Joi.string().max(100).required()
            }).optional()
        });

        const validate = schema.validate(request.body)

        if (validate.error) {
            return response.json(validate.error);
        }

        // Update product details
        const updated = await Products.update(request.body, id);

        return response.json(updated);
    }

    public static async delete(request: Request, response: Response) {
        const id = request.params.id;

        const isValid = uuid(id);

        if (!id || !isValid) {
            return response.json({ error: "ID inválido!" });
        }

        const deleted = await Products.delete(id);

        return response.json(deleted);
    }
}