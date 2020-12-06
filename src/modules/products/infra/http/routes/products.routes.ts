import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductsController from '../controllers/ProductsController';

const usersRouter = Router();
const productsController = new ProductsController();

usersRouter.use(ensureAuthenticated);

usersRouter.post('/', productsController.create);

export default usersRouter;
