import { type NextFunction, type Request, type Response } from 'express';
import { JWTHelper } from '../../../helpers/jwt';

export function auth(req: Request, res: Response, next: NextFunction): void {
    const [, hash] = req.headers.authorization?.split(' ') ?? ['', ''];

    const { valid, payload } = JWTHelper.verify(hash);

    if (valid) {
        res.locals.employeeId = payload.employeeId;
        next();
        return;
    }

    res.status(401).json({
        message: 'Invalid token',
    });
}
