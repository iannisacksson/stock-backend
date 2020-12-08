import { ROLES } from '@shared/contants/roles';
import AppError from '@shared/errors/AppError';

import FakeVariantsRepository from '../repositories/fakes/FakeVariantsRepository';

import ListVariantsService from './ListVariantsService';
import Variant from '../infra/typeorm/entities/Variant';

let fakeVariantsRepository: FakeVariantsRepository;
let listVariants: ListVariantsService;

describe('ListVariants', () => {
  beforeEach(() => {
    fakeVariantsRepository = new FakeVariantsRepository();

    listVariants = new ListVariantsService(fakeVariantsRepository);
  });

  it('should be able to list variants', async () => {
    const variantA = await fakeVariantsRepository.create({
      name: 'Médio Adulto',
      identifier_code: 'MA',
      variant_category_id: 'Tamanho',
    });

    const variantB = await fakeVariantsRepository.create({
      name: 'Médio Infantil',
      identifier_code: 'MI',
      variant_category_id: 'Tamanho',
    });

    const variantC = await fakeVariantsRepository.create({
      name: 'Grande Adulto',
      identifier_code: 'MI',
      variant_category_id: 'Tamanho',
    });

    const variantD = await fakeVariantsRepository.create({
      name: 'Adidas',
      identifier_code: 'MI',
      variant_category_id: 'Marca',
    });

    const variantResult1: Variant[] = [variantA, variantB];
    const variantResult2: Variant[] = [variantC];
    const variantResult3: Variant[] = [variantD];

    const variants1 = await listVariants.execute({
      limit: 2,
      page: 1,
      role: ROLES.ADMIN,
      variant_category_id: undefined,
    });

    expect(variants1).toEqual({
      total: 4,
      page: 1,
      variants: variantResult1,
    });

    const variants2 = await listVariants.execute({
      limit: 2,
      page: 2,
      role: ROLES.ADMIN,
      variant_category_id: 'Tamanho',
    });

    expect(variants2).toEqual({
      total: 3,
      page: 2,
      variants: variantResult2,
    });

    const variants3 = await listVariants.execute({
      limit: 10,
      page: 1,
      role: ROLES.ADMIN,
      variant_category_id: 'Marca',
    });

    expect(variants3).toEqual({
      total: 1,
      page: 1,
      variants: variantResult3,
    });

    const variants4 = await listVariants.execute({
      limit: 10,
      page: 2,
      role: ROLES.ADMIN,
      variant_category_id: undefined,
    });

    expect(variants4).toEqual({
      total: 4,
      page: 2,
      variants: [],
    });
  });

  it('should be able for only the administrator to list variant categories', async () => {
    await expect(
      listVariants.execute({
        limit: 1,
        page: 1,
        role: 'different admin role' as ROLES,
        variant_category_id: 'variant_category_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
