import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import SkusController from '../controllers/SkusController';

const skusRouter = Router();
const skusController = new SkusController();

skusRouter.use(ensureAuthenticated);

skusRouter.get('/', skusController.list);

export default skusRouter;
