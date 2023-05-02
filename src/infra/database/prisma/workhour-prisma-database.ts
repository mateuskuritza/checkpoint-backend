import { Workhour } from '../../../app/entities/workhour';
import { type WorkhourRepository } from '../../../app/repositories/workhour-repository';
import { prismaClient } from './prisma-config';

export class WorkhourPrismaDatabase implements WorkhourRepository {
    async getByEmployeeIdAndEndDateNull(employeeId: string): Promise<Workhour | undefined> {
        const result = await prismaClient.workhour.findFirst({
            orderBy: {
                createdAt: 'desc',
            },
            where: {
                employeeId,
                endDate: null,
            },
        });

        if (result != null) return new Workhour(result, result.id);
    }

    async create(workhour: Workhour): Promise<void> {
        await prismaClient.workhour.create({
            data: {
                startDate: workhour.startDate,
                endDate: workhour.endDate,
                employeeId: workhour.employeeId,
                id: workhour.id,
            },
        });
    }

    async findById(id: string): Promise<Workhour | undefined> {
        const result = await prismaClient.workhour.findUnique({
            where: { id },
        });

        if (result != null) {
            return new Workhour(result, result.id);
        }
    }

    async update(workhour: Workhour): Promise<void> {
        await prismaClient.workhour.update({
            where: { id: workhour.id },
            data: {
                employeeId: workhour.employeeId,
                startDate: workhour.startDate,
                endDate: workhour.endDate,
                id: workhour.id,
            },
        });
    }

    async getAllByEmployeeId(employeeId: string): Promise<Workhour[]> {
        const workhours = await prismaClient.workhour.findMany({
            where: {
                employeeId,
            },
            orderBy: {
                startDate: 'desc',
            },
        });

        return workhours.map((workhour) => new Workhour(workhour, workhour.id));
    }
}
