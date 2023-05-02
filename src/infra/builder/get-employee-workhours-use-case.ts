import { GetEmployeeWorkhours } from '../../app/use-cases/get-employee-workhours';
import { WorkhourPrismaDatabase } from '../database/prisma/workhour-prisma-database';

export function getEmployeeWorkhoursUseCase(): GetEmployeeWorkhours {
    const database = new WorkhourPrismaDatabase();
    return new GetEmployeeWorkhours(database);
}
