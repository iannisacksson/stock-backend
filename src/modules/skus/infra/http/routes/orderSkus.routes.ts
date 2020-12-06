import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import OrderSkusController from '../controllers/OrderSkusController';

// import productVariantsValidators from '../validators/productVariants.validators';

const orderSkusRouter = Router();
const orderSkusController = new OrderSkusController();

orderSkusRouter.use(ensureAuthenticated);

orderSkusRouter.post('/', orderSkusController.create);

export default orderSkusRouter;
