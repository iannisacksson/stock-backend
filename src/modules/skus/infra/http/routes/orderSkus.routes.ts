import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import OrderSkusController from '../controllers/OrderSkusController';

import { create, show } from '../validators/orderSkus.validations';

const orderSkusRouter = Router();
const orderSkusController = new OrderSkusController();

orderSkusRouter.use(ensureAuthenticated);

orderSkusRouter.post('/', create, orderSkusController.create);
orderSkusRouter.get('/:product_id', show, orderSkusController.show);

export default orderSkusRouter;
