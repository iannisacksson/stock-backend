import { ROLES } from '@shared/contants/roles';
import AppError from '@shared/errors/AppError';
import FakeSkusRepository from '../repositories/fakes/FakeSkusRepository';

import ListSkusService from './ListSkusService';
import Sku from '../infra/typeorm/entities/Sku';

let fakeSkusRepository: FakeSkusRepository;
let listSkus: ListSkusService;

describe('ListSkus', () => {
  beforeEach(() => {
    fakeSkusRepository = new FakeSkusRepository();

    listSkus = new ListSkusService(fakeSkusRepository);
  });

  it('should be able to list skus', async () => {
    const sku1 = await fakeSkusRepository.create({
      code: 'CA-MA-BO-AL',
      price: 10,
      product_id: 'product_id',
      quantity: 10,
    });

    const sku2 = await fakeSkusRepository.create({
      code: 'CA-MA-BO-LA',
      price: 15,
      product_id: 'product_id',
      quantity: 100,
    });

    const sku3 = await fakeSkusRepository.create({
      code: 'CAA-MA-BOO-LA',
      price: 30,
      product_id: 'product_id_other',
      quantity: 369,
    });

    const skusResult1: Sku[] = [sku1, sku2];
    const skusResult2: Sku[] = [sku3];

    const skus1 = await listSkus.execute({
      limit: 2,
      page: 1,
      role: ROLES.ADMIN,
    });

    expect(skus1).toEqual({ total: 3, page: 1, skus: skusResult1 });

    const skus2 = await listSkus.execute({
      limit: 2,
      page: 2,
      role: ROLES.ADMIN,
    });

    expect(skus2).toEqual({ total: 3, page: 2, skus: skusResult2 });
  });

  it('should be able for only the administrator to list skus', async () => {
    await expect(
      listSkus.execute({
        limit: 1,
        page: 1,
        role: 'different admin role' as ROLES,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
