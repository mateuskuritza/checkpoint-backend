import { describe, expect, test } from 'vitest';
import { WorkhourInMemoryDatabase } from '../../infra/database/inMemory/workhour-in-memory-database';
import { makeEmployee } from '../../tests/factories/employee-factory';
import { makeWorkhour } from '../../tests/factories/workhour-factory';
import { WorkhourAlreadyStarted } from '../errors/workhour-already-started';
import { StartWorkhour } from './start-workhour';

describe('Start workhour', () => {
    const workhourInMemoryDatabase = new WorkhourInMemoryDatabase();
    const startWorkhourUseCase = new StartWorkhour(workhourInMemoryDatabase);

    test('should be able to start workhour', async () => {
        const employee = makeEmployee();

        const { workhour } = await startWorkhourUseCase.execute({ employeeId: employee.id });

        await expect(workhourInMemoryDatabase.findById(workhour.id)).resolves.toBe(workhour);
    });

    test('should not be able to start if already exists a workhour for this employee', async () => {
        const workhour = makeWorkhour({
            endDate: null,
        });

        await workhourInMemoryDatabase.create(workhour);

        await expect(startWorkhourUseCase.execute({ employeeId: workhour.employeeId })).rejects.toThrowError(
            WorkhourAlreadyStarted,
        );
    });
});
