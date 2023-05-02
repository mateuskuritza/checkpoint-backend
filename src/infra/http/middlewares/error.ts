import { type NextFunction, type Request, type Response } from 'express';

export function errorHandling(err: Error, req: Request, res: Response, next: NextFunction): void {
    console.error(err);
    res.status(500).send('Something broke!');
}
