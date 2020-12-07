import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';
import { create } from '../validators/sessions.validations';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', create, sessionsController.create);

export default sessionsRouter;
