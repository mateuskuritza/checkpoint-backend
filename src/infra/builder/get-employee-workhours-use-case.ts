import { GetEmployeeWorkhours } from '../../app/use-cases/get-employee-workhours';
import { WorkhourInMemoryDatabase } from '../database/inMemory/workhour-in-memory-database';

export function getEmployeeWorkhoursUseCase(): GetEmployeeWorkhours {
    const database = new WorkhourInMemoryDatabase();
    return new GetEmployeeWorkhours(database);
}
