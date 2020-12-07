import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductsController from '../controllers/ProductsController';
import { create, showAndDelete } from '../validators/products.validations';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.use(ensureAuthenticated);

productsRouter.post('/', create, productsController.create);
productsRouter.get('/', productsController.list);
productsRouter.get('/:product_id', showAndDelete, productsController.show);
productsRouter.delete('/:product_id', showAndDelete, productsController.delete);

export default productsRouter;
