import AppError from '@shared/errors/AppError';

import { ROLES } from '@shared/contants/roles';
import FakeVariantCategoriesRepository from '../repositories/fakes/FakeVariantCategoriesRepository';

import CreateVariantCategoryService from './CreateVariantCategoryService';

let fakeVariantCategoriesRepository: FakeVariantCategoriesRepository;
let createVariant: CreateVariantCategoryService;

describe('CreateVariantCategory', () => {
  beforeEach(() => {
    fakeVariantCategoriesRepository = new FakeVariantCategoriesRepository();

    createVariant = new CreateVariantCategoryService(
      fakeVariantCategoriesRepository,
    );
  });

  it('should be able to create a new variant category', async () => {
    const variantCategory = await createVariant.execute({
      name: 'Tamanho',
      role: ROLES.ADMIN,
    });

    expect(variantCategory).toHaveProperty('id');
  });

  it('should be able for only the administrator to register a variant category', async () => {
    await expect(
      createVariant.execute({
        name: 'Tamanho',
        role: 'different admin role' as ROLES,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a variant category with the same name', async () => {
    fakeVariantCategoriesRepository.create('Tamanho');

    await expect(
      createVariant.execute({
        name: 'Tamanho',
        role: ROLES.ADMIN,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
