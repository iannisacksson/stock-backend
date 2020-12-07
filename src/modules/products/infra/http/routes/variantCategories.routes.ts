import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import VariantCategoriesController from '../controllers/VariantCategoriesController';

import { create } from '../validators/variantCategories.validations';

const variantCategoriesRouter = Router();
const variantCategoriesController = new VariantCategoriesController();

variantCategoriesRouter.use(ensureAuthenticated);

variantCategoriesRouter.post('/', create, variantCategoriesController.create);
variantCategoriesRouter.get('/', variantCategoriesController.list);

export default variantCategoriesRouter;
