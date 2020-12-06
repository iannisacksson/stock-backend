import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductVariantsController from '../controllers/ProductVariantsController';

import productVariantsValidators from '../validators/productVariants.validators';

const productVariantsRouter = Router();
const productVariantsController = new ProductVariantsController();

productVariantsRouter.use(ensureAuthenticated);

productVariantsRouter.post(
  '/',
  productVariantsValidators,
  productVariantsController.create,
);

export default productVariantsRouter;
