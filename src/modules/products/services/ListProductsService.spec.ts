import { ROLES } from '@shared/contants/roles';
import ProductsRepository from '../repositories/fakes/FakeProductsRepository';

import ListProductsService from './ListProductsService';
import Product from '../infra/typeorm/entities/Product';

let fakeProductsRepostirory: ProductsRepository;
let listProducts: ListProductsService;

describe('CreateProduct', () => {
  beforeEach(() => {
    fakeProductsRepostirory = new ProductsRepository();

    listProducts = new ListProductsService(fakeProductsRepostirory);
  });

  it('should be able to list products', async () => {
    const product1 = await fakeProductsRepostirory.create({
      name: 'Camisa Infantil',
      identifier_code: 'CI',
    });

    const product2 = await fakeProductsRepostirory.create({
      name: 'Camisa Aldulta',
      identifier_code: 'CA',
    });

    const product3 = await fakeProductsRepostirory.create({
      name: 'Sandália',
      identifier_code: 'SA',
    });

    const productsResult1: Product[] = [product1, product2];
    const productsResult2: Product[] = [product3];

    const products1 = await listProducts.execute({
      limit: 2,
      page: 1,
      role: ROLES.ADMIN,
    });

    expect(products1).toEqual({ total: 3, page: 1, products: productsResult1 });

    const products2 = await listProducts.execute({
      limit: 2,
      page: 2,
      role: ROLES.ADMIN,
    });

    expect(products2).toEqual({ total: 3, page: 2, products: productsResult2 });
  });
});
