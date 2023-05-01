export class NotFoundError extends Error {
    constructor(entityNotFound: string) {
        super(`${entityNotFound} not found.`);
    }
}
