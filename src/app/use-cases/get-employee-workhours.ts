import { type Workhour } from '../entities/workhour';
import { type WorkhourRepository } from '../repositories/workhour-repository';

interface GetWorkhoursRequest {
    employeeId: string;
}

interface GetWorkhoursResponse {
    workhours: Workhour[];
}

export class GetWorkhours {
    constructor(private readonly workhourRepository: WorkhourRepository) {}

    async execute(request: GetWorkhoursRequest): Promise<GetWorkhoursResponse> {
        const { employeeId } = request;

        const workhours = await this.workhourRepository.getAllByEmployeeId(employeeId);

        return {
            workhours,
        };
    }
}
