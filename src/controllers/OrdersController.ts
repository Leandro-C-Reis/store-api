import { Request, Response } from 'express';
import Joi from 'joi';
import OrdersService from '../services/Orders';

export default class OrdersController {

    public static async index(request: Request, response: Response)
    {
        const orders = await OrdersService.getAll();

        return response.json(orders);
    }
    
    public static async show(request: Request, response: Response)
    {
        const id = parseInt(request.params.id);

        if (!id)
        {
            return response.json({ error: "ID inválido!" });
        }

        const orders = await OrdersService.getOne(id);

        return response.json(orders);
    }

    public static async create(request: Request, response: Response)
    {
        delete request.body.user;

        const schema = Joi.object({
            total_value: Joi.number().positive().required(),
            user_id: Joi.number().integer().positive().required(),
            address_id: Joi.number().integer().positive().required()
        });

        const validate = schema.validate(request.body);

        if (validate.error)
        {
            return response.json(validate.error);
        }

        const created = await OrdersService.create(request.body);

        return response.json(created);
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
            total_value: Joi.number().positive(),
            user_id: Joi.number().integer().positive(),
            address_id: Joi.number().integer().positive()
        });

        const validate = schema.validate(request.body);

        if (validate.error)
        {
            return response.json(validate.error);
        }

        const updated = await OrdersService.update(request.body, id);

        return response.json(updated);
    }

    public static async delete(request: Request, response: Response)
    {
        const id = parseInt(request.params.id);

        if (!id)
        {
            return response.json({ error: "ID inválido!" });
        }

        const deleted = await OrdersService.delete(id);

        return response.json(deleted);
    }
}