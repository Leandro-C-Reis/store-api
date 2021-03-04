import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Users from '../services/Users';

export default class AuthMiddleware {

    public static async authenticate(request: Request, response: Response, next: NextFunction)
    {
        const token = typeof request.headers.token == 'string' ? 
            request.headers.token : '';

        if (!token)
        {
            return response.status(200).json({ message: 'O Token de acesso não foi recebido!'});
        }

        let id: number = 0;
        
        jwt.verify(token, 'SECRET', (err: any, decoded: any) => {
            if (err)
            {
                return response.status(200).json({ message: err.message });
            }

            return id = decoded.id;
        });
        
        const user = await Users.getOne(id);
        
        request.body.user = user;
        next();
    }
}