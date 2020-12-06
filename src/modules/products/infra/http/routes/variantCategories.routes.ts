import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import VariantCategoriesController from '../controllers/VariantCategoriesController';

const variantCategoriesRouter = Router();
const variantCategoriesController = new VariantCategoriesController();

variantCategoriesRouter.use(ensureAuthenticated);

variantCategoriesRouter.post('/', variantCategoriesController.create);
variantCategoriesRouter.get('/', variantCategoriesController.list);

export default variantCategoriesRouter;
