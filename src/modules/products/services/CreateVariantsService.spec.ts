import AppError from '@shared/errors/AppError';

import { ROLES } from '@shared/contants/roles';
import FakeVariantsRepository from '../repositories/fakes/FakeVariantsRepository';
import FakeVariantCategoriesRepository from '../repositories/fakes/FakeVariantCategoriesRepository';

import CreateVariantsServices from './CreateVariantsService';

let fakeVariantsRepository: FakeVariantsRepository;
let fakeVariantCategoriesRepository: FakeVariantCategoriesRepository;
let createVariant: CreateVariantsServices;

describe('CreateVariant', () => {
  beforeEach(() => {
    fakeVariantsRepository = new FakeVariantsRepository();
    fakeVariantCategoriesRepository = new FakeVariantCategoriesRepository();

    createVariant = new CreateVariantsServices(
      fakeVariantsRepository,
      fakeVariantCategoriesRepository,
    );
  });

  it('should be able to create a new variant', async () => {
    const variantCategory = await fakeVariantCategoriesRepository.create(
      'Tamanho',
    );

    const variant = await createVariant.execute({
      name: 'Grande',
      identifier_code: 'G',
      variant_category_id: variantCategory.id,
      role: ROLES.ADMIN,
    });

    expect(variant).toHaveProperty('id');
  });

  it('should be able for only the administrator to register a variant', async () => {
    await expect(
      createVariant.execute({
        name: 'Tamanho',
        identifier_code: 'identifier_code',
        variant_category_id: 'variant_category_id',
        role: 'different admin role' as ROLES,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a variant with the same identifier code', async () => {
    const variantCategory = await fakeVariantCategoriesRepository.create(
      'Tamanho',
    );

    await fakeVariantsRepository.create({
      name: 'Médio Adulto',
      identifier_code: 'M',
      variant_category_id: variantCategory.id,
    });

    await expect(
      createVariant.execute({
        name: 'Médio Infantil',
        identifier_code: 'M',
        variant_category_id: variantCategory.id,
        role: ROLES.ADMIN,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a variant if the variant category does not exist', async () => {
    await expect(
      createVariant.execute({
        name: 'Médio Infantil',
        identifier_code: 'M',
        variant_category_id: 'variant category does not exist',
        role: ROLES.ADMIN,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
