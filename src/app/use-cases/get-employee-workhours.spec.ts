import { describe, expect, test } from 'vitest';
import { WorkhourInMemoryDatabase } from '../../infra/database/inMemory/workhour-in-memory-database';
import { makeEmployee } from '../../tests/factories/employee-factory';
import { makeWorkhour } from '../../tests/factories/workhour-factory';
import { GetWorkhours } from './get-employee-workhours';

describe('Get workhours', () => {
    const workhourInMemoryDatabase = new WorkhourInMemoryDatabase();
    const getWorkhoursUseCase = new GetWorkhours(workhourInMemoryDatabase);

    test('should be able to get empty workhours list if employee has no one', async () => {
        const { id } = makeEmployee();

        const { workhours } = await getWorkhoursUseCase.execute({ employeeId: id });

        expect(workhours.length).toEqual(0);
    });

    test('should be able to get workhours', async () => {
        const { id } = makeEmployee();
        const firstWorkhour = makeWorkhour({ employeeId: id });
        const secondWorkhour = makeWorkhour({ employeeId: id });

        await workhourInMemoryDatabase.create(firstWorkhour);
        await workhourInMemoryDatabase.create(secondWorkhour);

        const { workhours } = await getWorkhoursUseCase.execute({ employeeId: id });

        expect(workhours).toStrictEqual([firstWorkhour, secondWorkhour]);
    });
});
