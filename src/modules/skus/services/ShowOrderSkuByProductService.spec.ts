import { ROLES } from '@shared/contants/roles';
import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import { PRIORITIES } from '@shared/contants/priorities';
import FakeOrderSkusRepository from '../repositories/fakes/FakeOrderSkusRepository';

import ShowOrderSkuByProductService from './ShowOrderSkuByProductService';
import ICreateOrderSkuDTO from '../dtos/ICreateOrderSkuDTO';

let fakeOrderSkusRepository: FakeOrderSkusRepository;
let fakeProductsRepository: FakeProductsRepository;
let showOrderSkuByProduct: ShowOrderSkuByProductService;

describe('ShowOrderSkuByProduct', () => {
  beforeEach(() => {
    fakeOrderSkusRepository = new FakeOrderSkusRepository();
    fakeProductsRepository = new FakeProductsRepository();

    showOrderSkuByProduct = new ShowOrderSkuByProductService(
      fakeOrderSkusRepository,
      fakeProductsRepository,
    );
  });

  it('should be able to show order sku', async () => {
    const product = await fakeProductsRepository.create({
      name: 'Camisa',
      identifier_code: 'CA',
    });

    const priorities: ICreateOrderSkuDTO[] = [
      {
        product_id: product.id,
        variant_category_id: 'categoryColor.id',
        priority: PRIORITIES.ONE,
      },
      {
        product_id: product.id,
        variant_category_id: 'categorySize.id',
        priority: PRIORITIES.TWO,
      },
    ];

    const orderSku = await fakeOrderSkusRepository.create(priorities);

    const showOrderSku = await showOrderSkuByProduct.execute({
      product_id: product.id,
      role: ROLES.ADMIN,
    });

    expect(showOrderSku).toEqual(orderSku);
  });

  it('should be able for only the administrator to show order skus', async () => {
    await expect(
      showOrderSkuByProduct.execute({
        product_id: 'product_id',
        role: 'different admin role' as ROLES,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to show order sku if the product not exists', async () => {
    await expect(
      showOrderSkuByProduct.execute({
        product_id: 'product_id',
        role: ROLES.ADMIN,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
