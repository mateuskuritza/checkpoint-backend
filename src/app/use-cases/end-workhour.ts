import { type IWorkhour } from '../entities/schemas/workhour.schema';
import { WorkHourToEndNotFoundError } from '../errors/workhour-to-end-not-found-error';
import { type WorkhourRepository } from '../repositories/workhour-repository';

interface EndWorkhourRequest {
    employeeId: string;
}

interface EndWorkhourResponse {
    workhour: IWorkhour;
}

export class EndWorkhour {
    constructor(private readonly workhourRepository: WorkhourRepository) {}

    async execute(request: EndWorkhourRequest): Promise<EndWorkhourResponse> {
        const { employeeId } = request;

        const workhour = await this.workhourRepository.getByEmployeeIdAndEndDateNull(employeeId);
        if (workhour == null) throw new WorkHourToEndNotFoundError();

        workhour.endWorkhour();

        await this.workhourRepository.update(workhour);

        return {
            workhour,
        };
    }
}
