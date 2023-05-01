export class WorkHourToEndNotFoundError extends Error {
    constructor() {
        super('Workhour to end not found for this employee.');
    }
}
