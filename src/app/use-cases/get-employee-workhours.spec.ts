import { describe, expect, test } from 'vitest';
import { WorkhourInMemoryDatabase } from '../../infra/database/inMemory/workhour-in-memory-database';
import { makeEmployee } from '../../tests/factories/employee-factory';
import { makeWorkhour } from '../../tests/factories/workhour-factory';
import { GetEmployeeWorkhours } from './get-employee-workhours';

describe('Get employee workhours', () => {
    const workhourInMemoryDatabase = new WorkhourInMemoryDatabase();
    const getWorkhoursUseCase = new GetEmployeeWorkhours(workhourInMemoryDatabase);

    test('should be able to get empty workhours list if employee has no one', async () => {
        const { id } = makeEmployee();

        const { history, today } = await getWorkhoursUseCase.execute({ employeeId: id });

        expect(history.length).toEqual(0);
        expect(today).toEqual(undefined);
    });

    test('should be able to get workhours', async () => {
        const { id } = makeEmployee();
        const firstWorkhour = makeWorkhour({ employeeId: id });
        const secondWorkhour = makeWorkhour({ employeeId: id });

        await workhourInMemoryDatabase.create(firstWorkhour);
        await workhourInMemoryDatabase.create(secondWorkhour);

        const { history } = await getWorkhoursUseCase.execute({ employeeId: id });

        expect(history).toStrictEqual([firstWorkhour, secondWorkhour]);
    });
});
