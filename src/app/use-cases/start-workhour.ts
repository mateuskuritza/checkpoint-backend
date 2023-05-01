import { Workhour } from '../entities/workhour';
import { WorkhourAlreadyStarted } from '../errors/workhour-already-started';
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

        const cantStartWorkhour = await this.workhourRepository.existsByEmployeeIdAndEndDateIsNull(employeeId);
        if (cantStartWorkhour) throw new WorkhourAlreadyStarted();

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
