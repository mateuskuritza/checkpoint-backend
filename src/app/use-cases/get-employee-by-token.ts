import { type Employee } from '../entities/employee';
import { NotFoundError } from '../errors/not-found-error';
import { type EmployeeRepository } from '../repositories/employee-repository';

interface GetEmployeeByTokenRequest {
    token: string;
}

interface GetEmployeeByTokenResponse {
    employee: Employee;
}

export class GetEmployeeByToken {
    constructor(private readonly employeeRepository: EmployeeRepository) {}

    async execute(request: GetEmployeeByTokenRequest): Promise<GetEmployeeByTokenResponse> {
        const { token } = request;

        const employee = await this.employeeRepository.findByToken(token);

        if (employee === undefined) {
            throw new NotFoundError('Employee');
        }

        return {
            employee,
        };
    }
}
