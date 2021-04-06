import { Request, Response } from 'express';
import Joi from 'joi';
import AddressesService from '../services/Address';

export default class AddressController {

    public static async index(request: Request, response: Response)
    {
        const addresses = await AddressesService.getAll();

        return response.json(addresses);
    }
    
    public static async show(request: Request, response: Response)
    {
        const id = parseInt(request.params.id);

        if (!id)
        {
            return response.json({ error: "ID inválido!" });
        }

        const address = await AddressesService.getOne(id);

        return response.json(address);
    }

    public static async create(request: Request, response: Response)
    {
        delete request.body.user;

        const schema = Joi.object({
            zip_code: Joi.string().required().length(8),
            city: Joi.string().required(),
            street: Joi.string().required(),
            district: Joi.string().required(),  
            uf: Joi.string().required().length(2),
            user_id : Joi.number().required().integer()
        });

        const validate = schema.validate(request.body);

        if (validate.error)
        {
            return response.json(validate.error);
        }

        const created = await AddressesService.create(request.body);

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
            zip_code: Joi.string().length(8),
            city: Joi.string(),
            street: Joi.string(),
            district: Joi.string(),  
            uf: Joi.string().length(2),
            user_id : Joi.number().integer()
        });

        const validate = schema.validate(request.body);

        if (validate.error)
        {
            return response.json(validate.error);
        }

        const updated = await AddressesService.update(request.body, id);

        return response.json(updated);
    }

    public static async delete(request: Request, response: Response)
    {
        const id = parseInt(request.params.id);

        if (!id)
        {
            return response.json({ error: "ID inválido!" });
        }

        const deleted = await AddressesService.delete(id);

        return response.json(deleted);
    }
}