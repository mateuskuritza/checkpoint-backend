export class WorkhourAlreadyStarted extends Error {
    constructor() {
        super('Workhour already started for this employee.');
    }
}
