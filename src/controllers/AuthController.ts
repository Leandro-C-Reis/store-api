import { Request, response, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserService from '../services/Users';

export default class AuthController {

    public static async login(request: Request, response: Response)
    {
        const { email, password } = request.body;

        const id = await UserService.verifyCredentials(email, password);

        if (!id)
        {
            return response.status(200).json({ message: 'Email ou senha inválido!'});
        }

        const token = jwt.sign({ id }, 'SECRET', {
            expiresIn: 3600
        });

        return response.status(200).json({ token, expires_id: 3600 });
    }

    public static async refresh(request: Request, response: Response)
    {
        const { token } = request.body;

        if (!token)
        {
            return response.send({ message: 'Token não recebido!' });
        }

        let id;

        jwt.verify(token, 'SECRET', (err: any, decoded: any) => {
            if (err)
            {
                return response.send({ message: err.message })
            }

            return id = decoded.id;
        });

        const newToken = jwt.sign({ id }, 'SECRET', {
            expiresIn: 3600
        });

        return response.send({ token: newToken })
    }

    public static async me(request: Request, response: Response)
    {
        const { token } = request.body;

        if (!token)
        {
            return response.send({ message: 'Token não recebido!' });
        }

        let id: number = 0;

        jwt.verify(token, 'SECRET', (err: any, decoded: any) => {
            if (err)
            {
                return response.send({ message: err.message })
            }

            return id = decoded.id;
        });

        const user = await UserService.getOne(id);

        return response.send(user);
    }
}