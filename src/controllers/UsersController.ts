import { Request, Response } from 'express';
import UserService from '../services/Users';
import Joi from 'joi';
export default class UsersController {

    public static async index(request: Request, response: Response)
    {
        const users = await UserService.getAll();

        return response.status(200).json(users);
    }

    public static async show(request: Request, response: Response)
    {
        const id = parseInt(request.params.id);

        if (!id)
        {
            return response.status(200).json({
                status: 'ERROR',
                error: 'ID inválido'
            });
        }

        const user = await UserService.getOne(id);

        return response.status(200).json(user);
    }

    public static async create(request: Request, response: Response)
    {
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

        const validate = schema.validate(request.body);

        if (validate.error)
        {
            return response.status(200).json({
                status: 'ERROR',
                error: validate.error
            });
        }

        const user = await UserService.create(request.body);
        
        return response.status(200).json({ user, status: 'SUCCESS' });
    }

    public static async update(request: Request, response: Response)
    {
        const id = parseInt(request.params.id);

        if (!id)
        {
            return response.status(200).json({
                status: 'ERROR',
                error: 'ID inválido'
            });
        }

        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

        const validate = schema.validate(request.body);

        if (validate.error)
        {
            return response.status(200).json({
                status: 'ERROR',
                error: validate.error
            });
        }

        const user = await UserService.update(request.body, id);

        return response.status(200).json(user);
    }

    public static async delete(request: Request, response: Response)
    {
        const id = parseInt(request.params.id);

        if (!id)
        {
            return response.status(200).json({
                status: 'ERROR',
                error: 'ID inválido'
            });
        }

        const user = await UserService.delete(id);

        return response.status(200).json(user);
    }
}