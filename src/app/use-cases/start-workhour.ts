import { Workhour } from '../entities/workhour';
import { WorkhourAlreadyStartedError } from '../errors/workhour-already-started-error';
import { type WorkhourRepository } from '../repositories/workhour-repository';

interface StartWorkhourRequest {
    employeeId: string;
}

interface StartWorkhourResponse {
    workhour: Workhour;
}

export class StartWorkhour {
    constructor(private readonly workhourRepository: WorkhourRepository) {}

    async execute(request: StartWorkhourRequest): Promise<StartWorkhourResponse> {
        const { employeeId } = request;

        const canEndWorkhour = await this.workhourRepository.getByEmployeeIdAndEndDateNull(employeeId);
        if (canEndWorkhour != null) throw new WorkhourAlreadyStartedError();

        const workhour = new Workhour({
            employeeId,
            startDate: new Date(),
            endDate: null,
        });

        await this.workhourRepository.create(workhour);

        return {
            workhour,
        };
    }
}
