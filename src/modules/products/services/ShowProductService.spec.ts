import { ROLES } from '@shared/contants/roles';
import AppError from '@shared/errors/AppError';

import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';

import ShowProductService from './ShowProductService';

let fakeProductsRepository: FakeProductsRepository;
let showProductService: ShowProductService;

describe('ShowProductService', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();

    showProductService = new ShowProductService(fakeProductsRepository);
  });

  it('should be able to show product', async () => {
    const product = await fakeProductsRepository.create({
      name: 'Camisa',
      identifier_code: 'CA',
    });

    const productExist = await showProductService.execute({
      product_id: product.id,
      role: ROLES.ADMIN,
    });

    expect(productExist).toEqual(product);
  });

  it('should be able for only the administrator to show product', async () => {
    await expect(
      showProductService.execute({
        product_id: 'productId',
        role: 'different admin role' as ROLES,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to show the product if it exists', async () => {
    await expect(
      showProductService.execute({
        product_id: 'productId',
        role: ROLES.ADMIN,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
