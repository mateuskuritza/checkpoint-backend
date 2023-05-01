import { type Workhour } from '../../../app/entities/workhour';
import { type WorkhourRepository } from '../../../app/repositories/workhour-repository';

export class WorkhourInMemoryDatabase implements WorkhourRepository {
    private readonly workhours: Workhour[] = [];

    async existsByEmployeeIdAndEndDateIsNull(employeeId: string): Promise<boolean> {
        const workhour = this.workhours.find(
            (workhour) => workhour.employeeId === employeeId && workhour.endDate === null,
        );

        if (workhour !== undefined) return true;

        return false;
    }

    async create(workhour: Workhour): Promise<void> {
        this.workhours.push(workhour);
    }

    async findById(id: string): Promise<Workhour | undefined> {
        return this.workhours.find((workhour) => workhour.id === id);
    }
}
