import AppError from '@shared/errors/AppError';

import { ROLES } from '@shared/contants/roles';

import FakeSkusRepository from '@modules/skus/repositories/fakes/FakeSkusRepository';
import ProductsRepository from '../repositories/fakes/FakeProductsRepository';

import UpdateProductService from './UpdateProductService';

let fakeProductsRepostirory: ProductsRepository;
let fakeSkusRepository: FakeSkusRepository;
let updateProduct: UpdateProductService;

describe('UpdateProduct', () => {
  beforeEach(() => {
    fakeProductsRepostirory = new ProductsRepository();
    fakeSkusRepository = new FakeSkusRepository();

    updateProduct = new UpdateProductService(
      fakeProductsRepostirory,
      fakeSkusRepository,
    );
  });

  it('should be able to create a update', async () => {
    const product = await fakeProductsRepostirory.create({
      name: 'Camisa Amarela',
      identifier_code: 'CAA',
    });

    await fakeSkusRepository.create({
      code: 'CAA',
      product_id: product.id,
      price: 1,
      quantity: 10,
    });

    const updatedProduct = await updateProduct.execute({
      name: 'Camisa',
      identifier_code: 'CA',
      product_id: product.id,
      role: ROLES.ADMIN,
    });

    expect(updatedProduct.name).toBe('Camisa');
    expect(updatedProduct.identifier_code).toBe('CA');
  });

  it('should be able for only the administrator to update a product', async () => {
    await expect(
      updateProduct.execute({
        name: 'Camisa',
        identifier_code: 'CA',
        product_id: 'product_id',
        role: 'different admin role' as ROLES,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update a product if product exists', async () => {
    await expect(
      updateProduct.execute({
        name: 'Camisa',
        identifier_code: 'CA',
        product_id: 'product_id',
        role: ROLES.ADMIN,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a product with the same identifier code', async () => {
    await fakeProductsRepostirory.create({
      name: 'Camisa Amarela',
      identifier_code: 'CA',
    });

    const product = await fakeProductsRepostirory.create({
      name: 'Camisa',
      identifier_code: 'CAA',
    });

    await expect(
      updateProduct.execute({
        name: 'Camisa Amarela',
        identifier_code: 'CA',
        product_id: product.id,
        role: ROLES.ADMIN,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
