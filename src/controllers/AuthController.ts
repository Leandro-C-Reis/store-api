import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserService from '../services/Users';
import * as VAR from '../config/variables';

export default class AuthController {

    public static async login(request: Request, response: Response)
    {
        const { email, password } = request.body;

        const id = await UserService.verifyCredentials(email, password);

        if (!id)
        {
            return response.status(200).json({ message: 'Email ou senha inválido!'});
        }

        const token = jwt.sign({ id }, VAR.jwt_secret, {
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

        let id = 0;
        let error: any;

        jwt.verify(token, VAR.jwt_secret, (err: any, decoded: any) => {
            if (err)
            {
                return error = err;
            }

            return id = decoded.id;
        });

        if (!id)
        {
            return response.send({ message: error.message })
        }

        const newToken = jwt.sign({ id }, VAR.jwt_secret, {
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
        let error: any;

        jwt.verify(token, VAR.jwt_secret, (err: any, decoded: any) => {
            if (err)
            {
                return error = err;
            }

            return id = decoded.id;
        });

        if (!id)
        {
            return response.send({ message: error.message })
        }

        const user = await UserService.getOne(id);

        return response.send(user);
    }
}