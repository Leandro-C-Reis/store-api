import { Request, Response } from 'express';
import UserService from '../services/Users';

export default class UsersController {

    public async index(request: Request, response: Response)
    {
        const users = await UserService.getAll();

        return response.status(200).json(users);
    }

    public async show(request: Request, response: Response)
    {
        const { id } = request.params;

        const user = await UserService.getOne(parseInt(id));

        return response.status(200).json(user);
    }

    public async create(request: Request, response: Response)
    {
        const user = await UserService.create(request.body);
        
        return response.status(200).json(user);
    }

    public async update(request: Request, response: Response)
    {
        const { id } = request.params;

        const user = await UserService.update(request.body, parseInt(id));

        return response.status(200).json(user);
    }

    public async delete(request: Request, response: Response)
    {
        const { id } = request.params;

        const user = await UserService.delete(parseInt(id));

        return response.status(200).json(user);
    }
}