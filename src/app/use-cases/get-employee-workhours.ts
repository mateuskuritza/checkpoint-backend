import { type IWorkhour } from '../entities/schemas/workhour.schema';
import { type WorkhourRepository } from '../repositories/workhour-repository';

interface GetWorkhoursRequest {
    employeeId: string;
}

interface GetWorkhoursResponse {
    today: IWorkhour;
    history: IWorkhour[];
}

export class GetEmployeeWorkhours {
    constructor(private readonly workhourRepository: WorkhourRepository) {}

    async execute(request: GetWorkhoursRequest): Promise<GetWorkhoursResponse> {
        const { employeeId } = request;

        const workhours = await this.workhourRepository.getAllByEmployeeId(employeeId);

        const today = workhours.filter((workhour) => {
            const today = new Date();
            const workhourDate = new Date(workhour.startDate);
            return today.getDate() === workhourDate.getDate();
        })[0];

        return {
            today,
            history: workhours,
        };
    }
}
