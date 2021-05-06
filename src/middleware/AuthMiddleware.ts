import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwt_secret } from '../config/variables';

interface Verify {
    user: {
        id: string;
        name: string;
        email: string;
        created_at: string;
        updated_at: string;
    }
    iat: number;
    exp: number;
}

export default class AuthMiddleware {

    public static async authenticate(request: Request, response: Response, next: NextFunction)
    {
        const { token } = request.headers;
        
        if (!token) {
            return response.json({ message: "Token de acesso não recebido!" });
        }

        try {
            const verify = jwt.verify(token.toString(), jwt_secret);
            const user = (verify as Verify).user;
            
            request.body.user = user;
            next();
        } 
        catch (err) {
            
            return response.json(err);
        }
    }
} 