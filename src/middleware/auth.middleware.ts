import { expressjwt } from 'express-jwt';
import { jwtSecret } from '../config/config';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from 'express-jwt';

export const authMiddleware = expressjwt({
    secret: jwtSecret,
    algorithms: ['HS256']
});

export const jwtErrorHandler = (err: any, _req: Request, res: Response, next: NextFunction) => {
    if (err instanceof UnauthorizedError) {
        return res.status(401).send({ message: 'Unauthorized: Invalid or missing token' });
    }
    next();
};