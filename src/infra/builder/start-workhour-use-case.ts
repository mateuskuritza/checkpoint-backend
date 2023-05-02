import { StartWorkhour } from '../../app/use-cases/start-workhour';
import { WorkhourInMemoryDatabase } from '../database/inMemory/workhour-in-memory-database';

export function startWorkHourUseCase(): StartWorkhour {
    const database = new WorkhourInMemoryDatabase();
    return new StartWorkhour(database);
}
