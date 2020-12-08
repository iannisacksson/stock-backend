import AppError from '@shared/errors/AppError';

import { ROLES } from '@shared/contants/roles';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';

import DeleteProductService from './DeleteProductService';

let fakeProductsRepository: FakeProductsRepository;
let deleteProduct: DeleteProductService;

describe('DeleteProduct', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();

    deleteProduct = new DeleteProductService(fakeProductsRepository);
  });

  it('should be able to delete products', async () => {
    const removeProduct = jest.spyOn(fakeProductsRepository, 'remove');

    const product = await fakeProductsRepository.create({
      name: 'Camisa',
      identifier_code: 'CA',
    });

    await deleteProduct.execute({
      product_id: product.id,
      role: ROLES.ADMIN,
    });

    expect(removeProduct).toHaveBeenCalledWith(product);
  });

  it('should be able for only the administrator to delete product', async () => {
    expect(
      deleteProduct.execute({
        product_id: 'product.id',
        role: ROLES.USER,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete the product if it does not exist', async () => {
    expect(
      deleteProduct.execute({
        product_id: 'non-existing-product',
        role: ROLES.ADMIN,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
