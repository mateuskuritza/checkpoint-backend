import { describe, expect, test } from 'vitest';
import { WorkhourInMemoryDatabase } from '../../infra/database/inMemory/workhour-in-memory-database';
import { makeWorkhour } from '../../tests/factories/workhour-factory';
import { WorkHourToEndNotFoundError } from '../errors/workhour-to-end-not-found-error';
import { EndWorkhour } from './end-workhour';

describe('End workhour', () => {
    const workhourInMemoryDatabase = new WorkhourInMemoryDatabase();
    const endWorkhourUseCase = new EndWorkhour(workhourInMemoryDatabase);

    test('should be able to end workhour', async () => {
        const workhour = makeWorkhour({
            endDate: null,
        });

        await workhourInMemoryDatabase.create(workhour);

        await endWorkhourUseCase.execute({ employeeId: workhour.employeeId });

        const finishedWorkhour = await workhourInMemoryDatabase.findById(workhour.id);

        if (finishedWorkhour != null) {
            expect(finishedWorkhour.id).toEqual(workhour.id);
            expect(finishedWorkhour.endDate).not.toEqual(null);
        }
    });

    test('should not be able to end if not exists a valid workhour started', async () => {
        const workhour = makeWorkhour(); // not save this in database

        await expect(endWorkhourUseCase.execute({ employeeId: workhour.employeeId })).rejects.toThrowError(
            WorkHourToEndNotFoundError,
        );
    });

    test('should not be able to end if exists a workhour but already finished', async () => {
        const workhour = makeWorkhour();
        await workhourInMemoryDatabase.create(workhour);

        await expect(endWorkhourUseCase.execute({ employeeId: workhour.employeeId })).rejects.toThrowError(
            WorkHourToEndNotFoundError,
        );
    });
});
