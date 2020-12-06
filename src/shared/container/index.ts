import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import IVariantCategoriesRepository from '@modules/products/repositories/IVariantCategoriesRepository';
import VariantCategoriesRepository from '@modules/products/infra/typeorm/repositories/VariantCategoriesRepository';

import IVariantsRepository from '@modules/products/repositories/IVariantsRepository';
import VariantsRepository from '@modules/products/infra/typeorm/repositories/VariantsRepository';

import IProductVariantsRepository from '@modules/products/repositories/IProductVariantsRepository';
import ProductVariantsRepository from '@modules/products/infra/typeorm/repositories/ProductVariantsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IVariantCategoriesRepository>(
  'VariantCategoriesRepository',
  VariantCategoriesRepository,
);

container.registerSingleton<IVariantsRepository>(
  'VariantsRepository',
  VariantsRepository,
);

container.registerSingleton<IProductVariantsRepository>(
  'ProductVariantsRepository',
  ProductVariantsRepository,
);
