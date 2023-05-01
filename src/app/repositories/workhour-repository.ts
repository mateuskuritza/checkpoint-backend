import { type Workhour } from '../entities/workhour';

export abstract class WorkhourRepository {
    abstract create(workhour: Workhour): Promise<void>;
    abstract findById(id: string): Promise<Workhour | undefined>;
    abstract existsByEmployeeIdAndEndDateIsNull(employeeId: string): Promise<boolean>;
}
