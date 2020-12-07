import AppError from '@shared/errors/AppError';

import { ROLES } from '@shared/contants/roles';
import FakeOrderSkusRepository from '@modules/skus/repositories/fakes/FakeOrderSkusRepository';
import FakeSkusRepository from '@modules/skus/repositories/fakes/FakeSkusRepository';
import FakeProductVariantsRepository from '@modules/products/repositories/fakes/FakeProductVariantsRepository';
import FakeVariantCategoriesRepository from '@modules/products/repositories/fakes/FakeVariantCategoriesRepository';
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import FakeVariantsRepository from '@modules/products/repositories/fakes/FakeVariantsRepository';

import ICreateOrderSkuDTO from '@modules/skus/dtos/ICreateOrderSkuDTO';
import { PRIORITIES } from '@shared/contants/priorities';
import CreateProductVariantsService from './CreateProductVariantService';
import Product from '../infra/typeorm/entities/Product';
import VariantCategory from '../infra/typeorm/entities/VariantCategory';
import Variant from '../infra/typeorm/entities/Variant';

let fakeProductVariantsRepository: FakeProductVariantsRepository;
let fakeVariantCategoriesRepository: FakeVariantCategoriesRepository;
let fakeProductsRepository: FakeProductsRepository;
let fakeVariantsRepository: FakeVariantsRepository;
let fakeOrderSkusRepository: FakeOrderSkusRepository;
let fakeSkusRepository: FakeSkusRepository;

let createProductVariant: CreateProductVariantsService;

let product: Product;
let categorySize: VariantCategory;
let categoryColor: VariantCategory;
let variantSize: Variant;
let variantColor: Variant;

describe('CreateProductVariant', () => {
  beforeEach(async () => {
    fakeProductVariantsRepository = new FakeProductVariantsRepository();
    fakeVariantCategoriesRepository = new FakeVariantCategoriesRepository();
    fakeProductsRepository = new FakeProductsRepository();
    fakeVariantsRepository = new FakeVariantsRepository();
    fakeOrderSkusRepository = new FakeOrderSkusRepository();
    fakeSkusRepository = new FakeSkusRepository();

    createProductVariant = new CreateProductVariantsService(
      fakeProductVariantsRepository,
      fakeProductsRepository,
      fakeVariantsRepository,
      fakeOrderSkusRepository,
      fakeSkusRepository,
    );

    product = await fakeProductsRepository.create({
      name: 'Camisa',
      identifier_code: 'CA',
    });

    categorySize = await fakeVariantCategoriesRepository.create('Tamanho');
    categoryColor = await fakeVariantCategoriesRepository.create('Cor');

    variantSize = await fakeVariantsRepository.create({
      name: 'Pequena Adulto',
      identifier_code: 'PA',
      variant_category_id: categorySize.id,
    });

    variantColor = await fakeVariantsRepository.create({
      name: 'Preto',
      identifier_code: 'PR',
      variant_category_id: categoryColor.id,
    });
  });

  it('should be able to create a new product variant', async () => {
    const priorities: ICreateOrderSkuDTO[] = [
      {
        product_id: product.id,
        variant_category_id: categoryColor.id,
        priority: PRIORITIES.ONE,
      },
      {
        product_id: product.id,
        variant_category_id: categorySize.id,
        priority: PRIORITIES.TWO,
      },
    ];

    await fakeOrderSkusRepository.create(priorities);

    const variants = [variantColor.id, variantSize.id];

    const productVariant = await createProductVariant.execute({
      product_id: product.id,
      variants,
      price: 10,
      quantity: 10,
      role: ROLES.ADMIN,
    });

    expect(productVariant).toHaveProperty('code');
  });

  it('should be able for only the administrator to register a product variant', async () => {
    await expect(
      createProductVariant.execute({
        product_id: 'product_id',
        variants: [],
        price: 0,
        quantity: 0,
        role: 'different admin role' as ROLES,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create the product variation if the product does not exist', async () => {
    await expect(
      createProductVariant.execute({
        product_id: 'product_id',
        variants: [],
        price: 0,
        quantity: 0,
        role: ROLES.ADMIN,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create the product variation if the variants does not exist', async () => {
    await expect(
      createProductVariant.execute({
        product_id: product.id,
        variants: [],
        price: 0,
        quantity: 0,
        role: ROLES.ADMIN,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create the product variation if there is no order of priorities', async () => {
    await expect(
      createProductVariant.execute({
        product_id: product.id,
        variants: [variantColor.id, variantSize.id],
        price: 0,
        quantity: 0,
        role: ROLES.ADMIN,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create the product variation if variations are missing', async () => {
    const priorities: ICreateOrderSkuDTO[] = [
      {
        product_id: product.id,
        variant_category_id: categoryColor.id,
        priority: PRIORITIES.ONE,
      },
      {
        product_id: product.id,
        variant_category_id: categorySize.id,
        priority: PRIORITIES.TWO,
      },
    ];

    await fakeOrderSkusRepository.create(priorities);
    await expect(
      createProductVariant.execute({
        product_id: product.id,
        variants: [variantColor.id],
        price: 0,
        quantity: 0,
        role: ROLES.ADMIN,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create the product variation if the SKU already exists', async () => {
    const priorities: ICreateOrderSkuDTO[] = [
      {
        product_id: product.id,
        variant_category_id: categoryColor.id,
        priority: PRIORITIES.ONE,
      },
      {
        product_id: product.id,
        variant_category_id: categorySize.id,
        priority: PRIORITIES.TWO,
      },
    ];

    await fakeOrderSkusRepository.create(priorities);

    await createProductVariant.execute({
      product_id: product.id,
      variants: [variantColor.id, variantSize.id],
      price: 0,
      quantity: 0,
      role: ROLES.ADMIN,
    });

    await expect(
      createProductVariant.execute({
        product_id: product.id,
        variants: [variantColor.id, variantSize.id],
        price: 0,
        quantity: 0,
        role: ROLES.ADMIN,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create the product variation if one of the products is not on the priority list', async () => {
    const priorities: ICreateOrderSkuDTO[] = [
      {
        product_id: product.id,
        variant_category_id: categoryColor.id,
        priority: PRIORITIES.ONE,
      },
      {
        product_id: product.id,
        variant_category_id: categorySize.id,
        priority: PRIORITIES.TWO,
      },
    ];

    const variantType = await fakeVariantsRepository.create({
      name: 'Mangas compridas',
      identifier_code: 'PA',
      variant_category_id: 'categorySize.id',
    });

    await fakeOrderSkusRepository.create(priorities);

    await expect(
      createProductVariant.execute({
        product_id: product.id,
        variants: [variantColor.id, variantType.id],
        price: 0,
        quantity: 0,
        role: ROLES.ADMIN,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
