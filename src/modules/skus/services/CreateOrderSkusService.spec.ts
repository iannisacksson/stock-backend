import { ROLES } from '@shared/contants/roles';
import AppError from '@shared/errors/AppError';

import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import FakeVariantCategoriesRepository from '@modules/products/repositories/fakes/FakeVariantCategoriesRepository';
import { PRIORITIES } from '@shared/contants/priorities';
import FakeOrderSkusRepository from '../repositories/fakes/FakeOrderSkusRepository';

import CreateOrderSkusService from './CreateOrderSkusService';

let fakeOrderSkusRepository: FakeOrderSkusRepository;
let fakeProductsRepository: FakeProductsRepository;
let fakeVariantCategoriesRepository: FakeVariantCategoriesRepository;
let createOrderSku: CreateOrderSkusService;

describe('CreateOrderSku', () => {
  beforeEach(() => {
    fakeOrderSkusRepository = new FakeOrderSkusRepository();
    fakeProductsRepository = new FakeProductsRepository();
    fakeVariantCategoriesRepository = new FakeVariantCategoriesRepository();

    createOrderSku = new CreateOrderSkusService(
      fakeOrderSkusRepository,
      fakeProductsRepository,
      fakeVariantCategoriesRepository,
    );
  });

  it('should be able to create order', async () => {
    const product = await fakeProductsRepository.create({
      name: 'Sapato',
      identifier_code: 'SA',
    });

    const variantCategory = await fakeVariantCategoriesRepository.create(
      'Tamanho',
    );

    await fakeOrderSkusRepository.create([
      {
        priority: PRIORITIES.ONE,
        product_id: product.id,
        variant_category_id: 'variantCategory.id',
      },
    ]);

    const orderSkus = await createOrderSku.execute({
      categories: [
        {
          priority: PRIORITIES.TWO,
          variant_category_id: variantCategory.id,
        },
      ],
      product_id: product.id,
      role: ROLES.ADMIN,
    });

    const showOrderSku = await fakeOrderSkusRepository.findByProductId(
      product.id,
    );

    const orderSkuFind = orderSkus.filter(order =>
      showOrderSku.includes(order),
    );

    expect(orderSkus).toEqual(orderSkuFind);
  });

  it('should be able for only the administrator to create order skus', async () => {
    await expect(
      createOrderSku.execute({
        categories: [
          {
            priority: PRIORITIES.ONE,
            variant_category_id: 'variant_category_id',
          },
        ],
        product_id: 'product_id',
        role: 'different admin role' as ROLES,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create order skus if the product not exists', async () => {
    await expect(
      createOrderSku.execute({
        categories: [
          {
            priority: PRIORITIES.ONE,
            variant_category_id: 'variant_category_id',
          },
        ],
        product_id: 'product_id',
        role: ROLES.ADMIN,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create order skus if the variants categories are duplicated', async () => {
    const product = await fakeProductsRepository.create({
      name: 'Sapato',
      identifier_code: 'SA',
    });

    await expect(
      createOrderSku.execute({
        categories: [
          {
            priority: PRIORITIES.ONE,
            variant_category_id: 'variant_category_id',
          },
          {
            priority: PRIORITIES.TWO,
            variant_category_id: 'variant_category_id',
          },
        ],
        product_id: product.id,
        role: ROLES.ADMIN,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create order skus if the priority are duplicated', async () => {
    const product = await fakeProductsRepository.create({
      name: 'Sapato',
      identifier_code: 'SA',
    });

    await expect(
      createOrderSku.execute({
        categories: [
          {
            priority: PRIORITIES.ONE,
            variant_category_id: 'variant_category_id',
          },
          {
            priority: PRIORITIES.ONE,
            variant_category_id: 'variant_category_other_id',
          },
        ],
        product_id: product.id,
        role: ROLES.ADMIN,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create order skus if the variant categories not exists', async () => {
    const product = await fakeProductsRepository.create({
      name: 'Sapato',
      identifier_code: 'SA',
    });

    await expect(
      createOrderSku.execute({
        categories: [
          {
            priority: PRIORITIES.ONE,
            variant_category_id: 'variant_category_id',
          },
          {
            priority: PRIORITIES.TWO,
            variant_category_id: 'variant_category_other_id',
          },
        ],
        product_id: product.id,
        role: ROLES.ADMIN,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create order skus if the priority is already met', async () => {
    const product = await fakeProductsRepository.create({
      name: 'Sapato',
      identifier_code: 'SA',
    });

    const variantCategory = await fakeVariantCategoriesRepository.create(
      'Tamanho',
    );

    await fakeOrderSkusRepository.create([
      {
        priority: PRIORITIES.ONE,
        product_id: product.id,
        variant_category_id: 'variant_category_id',
      },
    ]);

    await expect(
      createOrderSku.execute({
        categories: [
          {
            priority: PRIORITIES.ONE,
            variant_category_id: variantCategory.id,
          },
        ],
        product_id: product.id,
        role: ROLES.ADMIN,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create order skus if the category variant is already associated with the product', async () => {
    const product = await fakeProductsRepository.create({
      name: 'Sapato',
      identifier_code: 'SA',
    });

    const variantCategory = await fakeVariantCategoriesRepository.create(
      'Tamanho',
    );

    await fakeOrderSkusRepository.create([
      {
        priority: PRIORITIES.ONE,
        product_id: product.id,
        variant_category_id: variantCategory.id,
      },
    ]);

    await expect(
      createOrderSku.execute({
        categories: [
          {
            priority: PRIORITIES.TWO,
            variant_category_id: variantCategory.id,
          },
        ],
        product_id: product.id,
        role: ROLES.ADMIN,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
