export class InvalidDataError extends Error {
    constructor(message?: string) {
        super('Invalid data. ' + String(message));
    }
}
