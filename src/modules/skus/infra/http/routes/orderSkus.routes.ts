import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import OrderSkusController from '../controllers/OrderSkusController';

import { create } from '../validators/orderSkus.validations';

const orderSkusRouter = Router();
const orderSkusController = new OrderSkusController();

orderSkusRouter.use(ensureAuthenticated);

orderSkusRouter.post('/', create, orderSkusController.create);

export default orderSkusRouter;
