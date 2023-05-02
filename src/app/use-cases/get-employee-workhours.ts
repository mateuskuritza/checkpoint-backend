import { type IWorkhour } from '../entities/schemas/workhour.schema';
import { type WorkhourRepository } from '../repositories/workhour-repository';

interface GetWorkhoursRequest {
    employeeId: string;
}

interface GetWorkhoursResponse {
    today?: IWorkhour;
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
            return today.getDate() === workhourDate.getDate() && workhour.endDate === null;
        });

        // TODO: create presentation layer to return the response
        return {
            today:
                today.length > 0
                    ? {
                          id: today[0].id,
                          startDate: today[0].startDate,
                          endDate: today[0].endDate,
                          employeeId,
                      }
                    : undefined,
            history: workhours
                .filter((workhour) => workhour.endDate)
                .map((workhour) => ({
                    id: workhour.id,
                    startDate: workhour.startDate,
                    endDate: workhour.endDate,
                    employeeId,
                })),
        };
    }
}
