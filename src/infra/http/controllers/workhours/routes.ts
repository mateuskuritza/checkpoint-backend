import { Router } from 'express';
import { WorkhourAlreadyStartedError } from '../../../../app/errors/workhour-already-started-error';
import { WorkHourToEndNotFoundError } from '../../../../app/errors/workhour-to-end-not-found-error';
import { endWorkHourUseCase } from '../../../builder/end-workhour-use-case';
import { getEmployeeWorkhoursUseCase } from '../../../builder/get-employee-workhours-use-case';
import { startWorkHourUseCase } from '../../../builder/start-workhour-use-case';

const router = Router();

router.get('/', async (_request, response) => {
    try {
        const useCaseResponse = await getEmployeeWorkhoursUseCase().execute({
            employeeId: response.locals.employeeId,
        });
        response.send(useCaseResponse).status(200);
    } catch (e) {
        if (e instanceof WorkHourToEndNotFoundError) {
            return response.status(404).json({
                message: e.message,
            });
        }
        throw e;
    }
});

router.post('/start', async (_request, response) => {
    try {
        const useCaseResponse = await startWorkHourUseCase().execute({
            employeeId: response.locals.employeeId,
        });
        response.send(useCaseResponse).status(200);
    } catch (e) {
        if (e instanceof WorkhourAlreadyStartedError) {
            return response.status(400).json({
                message: e.message,
            });
        }
        throw e;
    }
});

router.post('/end', async (_request, response) => {
    try {
        const useCaseResponse = await endWorkHourUseCase().execute({
            employeeId: response.locals.employeeId,
        });
        response.send(useCaseResponse).status(200);
    } catch (e) {
        if (e instanceof WorkHourToEndNotFoundError) {
            return response.status(400).json({
                message: e.message,
            });
        }
        throw e;
    }
});

export { router as workhoursRouter };
