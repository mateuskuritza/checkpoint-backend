import { EndWorkhour } from '../../app/use-cases/end-workhour';
import { WorkhourPrismaDatabase } from '../database/prisma/workhour-prisma-database';

export function endWorkHourUseCase(): EndWorkhour {
    const database = new WorkhourPrismaDatabase();
    return new EndWorkhour(database);
}
