import { Request, Response } from 'express';
import Products from '../services/Products';
import Joi from 'joi';
export default class ProductsController {

    public static async index(request: Request, response: Response) {
        const products = await Products.getAll();

        return response.json(products);
    }

    public static async show(request: Request, response: Response) {
        const id = parseInt(request.params.id);
        const { filter } = request.query;

        if (!id) {
            return response.json({ error: "ID inválido!" });
        }

        const product = await Products.getOne(id, filter);

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
        const id = product.id;
        const inventory = await Products.createInventory(id, request.body.inventory);
        const tags = await Products.createTags(id, request.body.tags);

        return response.json({ product, inventory, tags });
    }

    public static async update(request: Request, response: Response) {
        delete request.body.user;

        const id = parseInt(request.params.id);

        if (!id) {
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

        // Update inventory if exist
        if (request.body.inventory) {
            await Products.updateInventory(id, request.body.inventory);

            delete request.body.inventory;
        }

        // Update tags if exists
        if (request.body.tags) {
            await Products.updateTags(id, request.body.tags);

            delete request.body.tags;
        }

        // Update product details
        const updated = await Products.update(request.body, id);

        return response.json(updated);
    }

    public static async delete(request: Request, response: Response) {
        const id = parseInt(request.params.id);

        if (!id) {
            return response.json({ error: "ID inválido!" });
        }

        const deleted = await Products.delete(id);

        return response.json(deleted);
    }

    public static async createTag(request: Request, response: Response) {
        delete request.body.user;

        const id = parseInt(request.params.id);

        if (!id) {
            return response.json({ error: "ID inválido!" });
        }

        const schema = Joi.object({
            tags: Joi.array().items(
                Joi.string().max(100).required()
            ).required()
        });

        const validate = schema.validate(request.body);

        if (validate.error) {
            return response.json(validate.error);
        }

        const create = await Products.createTags(id, request.body.tags);

        return response.json(create);
    }
}