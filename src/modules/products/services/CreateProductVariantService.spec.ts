import AppError from '@shared/errors/AppError';

import { ROLES } from '@shared/contants/roles';
import FakeProductVariantsRepository from '@modules/products/repositories/fakes/FakeProductVariantsRepository';
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import FakeVariantsRepository from '@modules/products/repositories/fakes/FakeVariantsRepository';

import CreateProductVariantsService from './CreateProductVariantService';

let fakeProductVariantsRepository: FakeProductVariantsRepository;
let fakeProductsRepository: FakeProductsRepository;
let fakeVariantsRepository: FakeVariantsRepository;

let createProductVariant: CreateProductVariantsService;

describe('CreateProductVariant', () => {
  beforeEach(() => {
    fakeProductVariantsRepository = new FakeProductVariantsRepository();
    fakeProductsRepository = new FakeProductsRepository();
    fakeVariantsRepository = new FakeVariantsRepository();

    createProductVariant = new CreateProductVariantsService(
      fakeProductVariantsRepository,
      fakeProductsRepository,
      fakeVariantsRepository,
    );
  });

  it('should be able to create a new product variant', async () => {
    const product = await fakeProductsRepository.create({
      name: 'Camisa',
      identifier_code: 'CA',
    });

    const variant = await fakeVariantsRepository.create({
      name: 'Pequena Adulto',
      identifier_code: 'PA',
      variant_category_id: 'variant_category_id:',
    });

    const productVariant = await createProductVariant.execute({
      product_id: product.id,
      variant_id: variant.id,
      role: ROLES.ADMIN,
    });

    expect(productVariant).toHaveProperty('id');
  });

  it('should be able for only the administrator to register a product variant', async () => {
    await expect(
      createProductVariant.execute({
        product_id: 'product_id',
        variant_id: 'variant_id',
        role: 'different admin role' as ROLES,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a product with the same product variant', async () => {
    fakeProductVariantsRepository.create({
      product_id: 'product_id',
      variant_id: 'variant_id',
    });

    await expect(
      createProductVariant.execute({
        product_id: 'product_id',
        variant_id: 'variant_id',
        role: ROLES.ADMIN,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a product if the variant_id is not found', async () => {
    const product = await fakeProductsRepository.create({
      name: 'Camisa',
      identifier_code: 'CA',
    });

    await expect(
      createProductVariant.execute({
        product_id: product.id,
        variant_id: 'variant_id',
        role: ROLES.ADMIN,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a product if the product_id is not found', async () => {
    const variant = await fakeVariantsRepository.create({
      name: 'Pequena Adulto',
      identifier_code: 'PA',
      variant_category_id: 'variant_category_id:',
    });

    await expect(
      createProductVariant.execute({
        product_id: 'product.id',
        variant_id: variant.id,
        role: ROLES.ADMIN,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
