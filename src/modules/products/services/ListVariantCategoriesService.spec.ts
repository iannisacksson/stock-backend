import { ROLES } from '@shared/contants/roles';
import AppError from '@shared/errors/AppError';

import FakeVariantCategoriesRepository from '../repositories/fakes/FakeVariantCategoriesRepository';

import ListVariantCategoriesService from './ListVariantCategoriesService';
import VariantCategory from '../infra/typeorm/entities/VariantCategory';

let fakeVariantCategoriesRepository: FakeVariantCategoriesRepository;
let ListVariantCategories: ListVariantCategoriesService;

describe('ListVariantCategories', () => {
  beforeEach(() => {
    fakeVariantCategoriesRepository = new FakeVariantCategoriesRepository();

    ListVariantCategories = new ListVariantCategoriesService(
      fakeVariantCategoriesRepository,
    );
  });

  it('should be able to list variant categories', async () => {
    const SizeCategory = await fakeVariantCategoriesRepository.create(
      'Tamanho',
    );

    const brandCategory = await fakeVariantCategoriesRepository.create('Marca');

    const modelsCategory = await fakeVariantCategoriesRepository.create(
      'Modelo',
    );

    const categoriesResult1: VariantCategory[] = [SizeCategory, brandCategory];
    const categoriesResult2: VariantCategory[] = [modelsCategory];

    const categories1 = await ListVariantCategories.execute({
      limit: 2,
      page: 1,
      role: ROLES.ADMIN,
    });

    expect(categories1).toEqual({
      total: 3,
      page: 1,
      variantCategories: categoriesResult1,
    });

    const categories2 = await ListVariantCategories.execute({
      limit: 2,
      page: 2,
      role: ROLES.ADMIN,
    });

    expect(categories2).toEqual({
      total: 3,
      page: 2,
      variantCategories: categoriesResult2,
    });
  });

  it('should be able for only the administrator to list variant categories', async () => {
    await expect(
      ListVariantCategories.execute({
        limit: 1,
        page: 1,
        role: 'different admin role' as ROLES,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
