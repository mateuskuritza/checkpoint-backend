export class WorkhourAlreadyStartedError extends Error {
    constructor() {
        super('Workhour already started for this employee.');
    }
}
