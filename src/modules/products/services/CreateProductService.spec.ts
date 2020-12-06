import AppError from '@shared/errors/AppError';

import { ROLES } from '@shared/contants/roles';
import ProductsRepository from '../repositories/fakes/ProductsRepository';

import CreateProductService from './CreateProductService';

let fakeProductsRepostirory: ProductsRepository;
let createProduct: CreateProductService;

describe('CreateProduct', () => {
  beforeEach(() => {
    fakeProductsRepostirory = new ProductsRepository();

    createProduct = new CreateProductService(fakeProductsRepostirory);
  });

  it('should be able to create a new product', async () => {
    const product = await createProduct.execute({
      name: 'Camisa',
      identifier_code: 'CA',
      role: ROLES.ADMIN,
    });

    expect(product).toHaveProperty('id');
  });

  it('should be able for only the administrator to register a product', async () => {
    await expect(
      createProduct.execute({
        name: 'Camisa',
        identifier_code: 'CA',
        role: 'different admin role' as ROLES,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a product with the same identifier code', async () => {
    fakeProductsRepostirory.create({
      name: 'Camisa',
      identifier_code: 'CA',
    });

    await expect(
      createProduct.execute({
        name: 'Camisa Amarela',
        identifier_code: 'CA',
        role: ROLES.ADMIN,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
