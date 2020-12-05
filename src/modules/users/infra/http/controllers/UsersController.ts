import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import { sendSuccessful } from '@shared/formatters/responses';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<void> {
    const { name, email, password, role } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
      role,
    });

    delete user.password;

    sendSuccessful(response, user);
  }
}
