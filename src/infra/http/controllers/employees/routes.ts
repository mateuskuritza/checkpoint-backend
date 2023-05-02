import { Router } from 'express';
import { NotFoundError } from '../../../../app/errors/not-found-error';
import { JWTHelper } from '../../../../helpers/jwt';
import { getEmployeeByTokenUseCase } from '../../../builder/get-employee-by-token';

const router = Router();

router.post('/authenticate', async (request, response) => {
    try {
        const useCaseResponse = await getEmployeeByTokenUseCase().execute({
            token: request.body.token,
        });

        const jwt = JWTHelper.create({
            employeeId: useCaseResponse.employee.id,
        });

        response.send({ jwt, name: useCaseResponse.employee.name }).status(200);
    } catch (e) {
        if (e instanceof NotFoundError) {
            return response.status(404).json({
                message: e.message,
            });
        }
        throw e;
    }
});

router.post('/is_logged', (request, response) => {
    const { jwt } = request.body;
    const { valid } = JWTHelper.verify(jwt);
    if (valid) return response.sendStatus(200);
    return response.sendStatus(401);
});

export { router as employeesRouter };
