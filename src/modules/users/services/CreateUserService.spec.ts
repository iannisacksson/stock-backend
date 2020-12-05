import AppError from '@shared/errors/AppError';

import { ROLES } from '@shared/contants/roles';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepostirory from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepostirory: FakeUsersRepostirory;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepostirory = new FakeUsersRepostirory();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeHashProvider, fakeUsersRepostirory);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role: ROLES.ADMIN,
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      role: ROLES.ADMIN,
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        role: ROLES.ADMIN,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a user with a different role', async () => {
    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        role: 'ROLES.ADMIN' as ROLES,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
