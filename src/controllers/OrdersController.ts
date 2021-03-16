import { Request, Response } from 'express';
import Joi from 'joi';
import OrdersService from '../services/Orders';
import AddressService from '../services/Address';

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
            address_id: Joi.number().integer().positive().required(),
            products: Joi.array().items({
                id: Joi.number().integer().positive().required(),
                amount: Joi.number().integer().required()
            }).required().min(1)
        });

        const validate = schema.validate(request.body);

        if (validate.error)
        {
            return response.json(validate.error);
        }
        
        const existProducts = await OrdersService.existProducts(request.body.products);

        if (!existProducts)
        {
            return response.json({ Error: 'Erro ao buscar produto.' })
        }

        const validateQuantity = await OrdersService.validateQuantity(request.body.products);

        if (validateQuantity.length > 0)
        {
            return response.json({ 
                Error: 'Estoque indisponível!',
                products: validateQuantity
            });
        }

        const validateAddress = await AddressService.validate(request.body.address_id);
        
        if (!validateAddress)
        {
            return response.json({ Error: "Endereço não encontrado!" });
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
            address_id: Joi.number().integer().positive(),
            products: Joi.array().items({
                id: Joi.number().integer().positive().required(),
                amount: Joi.number().integer().required()
            })
        });

        const validate = schema.validate(request.body);

        if (validate.error)
        {
            return response.json(validate.error);
        }

        const existProducts = await OrdersService.existProducts(request.body.products);

        if (!existProducts)
        {
            return response.json({ ERROR: 'Erro ao buscar produto.' })
        }

        const validateQuantity = await OrdersService.validateQuantity(request.body.products);

        if (validateQuantity.length > 0)
        {
            return response.json({ 
                Error: 'Estoque indisponível!',
                products: validateQuantity
            });
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

    public static async cancel(request: Request, response: Response)
    {
        const id = parseInt(request.params.id);

        if (!id)
        {
            return response.json({ error: "ID inválido!" });
        }

        await OrdersService.cancelOrder(id);

        return response.json({ message: 'Pedido cancelado!' });
    }

    public static async actives(request: Request, response: Response)
    {
        const orders = await OrdersService.getAllActives();

        return response.json(orders);
    }
}