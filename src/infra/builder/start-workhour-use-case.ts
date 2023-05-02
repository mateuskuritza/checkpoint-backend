import { StartWorkhour } from '../../app/use-cases/start-workhour';
import { WorkhourPrismaDatabase } from '../database/prisma/workhour-prisma-database';

export function startWorkHourUseCase(): StartWorkhour {
    const database = new WorkhourPrismaDatabase();
    return new StartWorkhour(database);
}
