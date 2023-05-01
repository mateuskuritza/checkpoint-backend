import { describe, expect, test } from 'vitest';
import { EmployeeInMemoryDatabase } from '../../infra/database/inMemory/employee-in-memory-database';
import { makeEmployee } from '../../tests/factories/employee-factory';
import { NotFoundError } from '../errors/not-found-error';
import { GetEmployeeByToken } from './get-employee-by-token';

describe('Get Employee By Token', () => {
    const employeeInMemoryDatabase = new EmployeeInMemoryDatabase();
    const getEmployeeByTokenUseCase = new GetEmployeeByToken(employeeInMemoryDatabase);

    test('should be able to find a employee', async () => {
        const token = '#1234567';
        await employeeInMemoryDatabase.create(makeEmployee({ token }));

        const employee = await getEmployeeByTokenUseCase.execute({ token });

        expect(employee).toBeDefined();
    });

    test('when not be able to find a employee throws NotFoundError', async () => {
        const token = '#fake567';

        await expect(async () => await getEmployeeByTokenUseCase.execute({ token })).rejects.toThrowError(
            NotFoundError,
        );
    });
});
