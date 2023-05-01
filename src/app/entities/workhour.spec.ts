import { randomUUID } from 'crypto';
import { describe, expect, test } from 'vitest';
import { InvalidDataError } from '../errors/invalid-data-error';
import { Workhour } from './workhour';

describe('Workhours', () => {
    const startDate = new Date();

    test('should be able to create a new workhour', () => {
        const validWorkhourData = {
            employeeId: randomUUID(),
            startDate,
            endDate: new Date(startDate.getTime() + 1),
        };

        const workhour = new Workhour(validWorkhourData);

        expect(workhour).toBeDefined();
    });

    test('should not be able to create a new workhour with invalid employeeId', () => {
        const invalidWorkhourData = {
            employeeId: '',
            startDate,
            endDate: new Date(startDate.getTime() + 1),
        };

        expect(() => new Workhour(invalidWorkhourData)).toThrowError(InvalidDataError);
    });

    test('should not be able to create a new workhour with invalid startDate', () => {
        const invalidWorkhourData = {
            employeeId: randomUUID(),
            startDate: new Date(''),
            endDate: new Date(),
        };

        expect(() => new Workhour(invalidWorkhourData)).toThrowError(InvalidDataError);
    });

    test('should not be able to create a new workhour with invalid endDate', () => {
        const invalidWorkhourData = {
            employeeId: randomUUID(),
            startDate: new Date(),
            endDate: new Date(''),
        };

        expect(() => new Workhour(invalidWorkhourData)).toThrowError(InvalidDataError);
    });

    test('should not be able to create a new workhour with invalid endDate before startDate', () => {
        const invalidWorkhourData = {
            employeeId: randomUUID(),
            startDate,
            endDate: new Date(startDate.getTime() - 1),
        };

        expect(() => new Workhour(invalidWorkhourData)).toThrowError(InvalidDataError);
    });
});
