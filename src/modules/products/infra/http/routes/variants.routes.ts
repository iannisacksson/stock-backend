import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import VariantsController from '../controllers/VariantsController';
import variantsValidators from '../validators/variants.validations';

const variantsRouter = Router();
const variantsController = new VariantsController();

variantsRouter.use(ensureAuthenticated);

variantsRouter.post('/', variantsValidators, variantsController.create);
variantsRouter.get('/', variantsController.list);

export default variantsRouter;
