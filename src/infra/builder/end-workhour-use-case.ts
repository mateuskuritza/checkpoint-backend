import { EndWorkhour } from '../../app/use-cases/end-workhour';
import { WorkhourInMemoryDatabase } from '../database/inMemory/workhour-in-memory-database';

export function endWorkHourUseCase(): EndWorkhour {
    const database = new WorkhourInMemoryDatabase();
    return new EndWorkhour(database);
}
