import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import { create } from '../validators/users.validations';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

// usersRouter.use(ensureAuthenticated);

usersRouter.post('/', create, usersController.create);

export default usersRouter;
