import { type Workhour } from '../../../app/entities/workhour';
import { type WorkhourRepository } from '../../../app/repositories/workhour-repository';

export class WorkhourInMemoryDatabase implements WorkhourRepository {
    private readonly workhours: Workhour[] = [];

    async getByEmployeeIdAndEndDateNull(employeeId: string): Promise<Workhour | undefined> {
        return this.workhours.find((workhour) => workhour.employeeId === employeeId && workhour.endDate === null);
    }

    async create(workhour: Workhour): Promise<void> {
        this.workhours.push(workhour);
    }

    async findById(id: string): Promise<Workhour | undefined> {
        return this.workhours.find((workhour) => workhour.id === id);
    }

    async update(workhour: Workhour): Promise<void> {
        const index = this.workhours.findIndex((dbWorkhour) => dbWorkhour.id === workhour.id);
        this.workhours[index] = workhour;
    }

    async getAllByEmployeeId(employeeId: string): Promise<Workhour[]> {
        return this.workhours.filter((workhour) => workhour.employeeId === employeeId);
    }
}
