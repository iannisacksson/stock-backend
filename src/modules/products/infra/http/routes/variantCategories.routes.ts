import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import VariantCategoriesController from '../controllers/VariantsController';

const variantCategoriesRouter = Router();
const variantCategoriesController = new VariantCategoriesController();

variantCategoriesRouter.use(ensureAuthenticated);

variantCategoriesRouter.post('/', variantCategoriesController.create);

export default variantCategoriesRouter;
