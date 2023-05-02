import { Router } from 'express';
import { employeesRouter } from './controllers/employees/routes';
import { workhoursRouter } from './controllers/workhours/routes';
import { auth } from './middlewares/auth';
import { errorHandling } from './middlewares/error';

const router = Router();

router.use('/employees', employeesRouter);
router.use('/workhours', auth, workhoursRouter);

router.use(errorHandling);

export { router };
