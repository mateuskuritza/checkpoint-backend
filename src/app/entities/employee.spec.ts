import { describe, expect, test } from 'vitest';
import { InvalidDataError } from '../errors/invalid-data-error';
import { Employee } from './employee';

describe('Employee', () => {
    test('should be able to create a new employee', () => {
        const validEmployeeData = {
            name: 'John Doe',
            token: '#1234567',
        };

        const employee = new Employee(validEmployeeData);

        expect(employee).toBeDefined();
    });

    test('should not be able to create a new employee with invalid token', () => {
        const invalidEmployeeData = {
            name: 'John Doe',
            token: '#123456',
        };

        expect(() => new Employee(invalidEmployeeData)).toThrowError(InvalidDataError);
    });

    test('should not be able to create a new employee with invalid name', () => {
        const invalidEmployeeData = {
            name: 'Jo',
            token: '#1234567',
        };

        expect(() => new Employee(invalidEmployeeData)).toThrowError(InvalidDataError);
    });
});
