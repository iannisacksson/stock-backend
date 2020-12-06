import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { ROLES } from '@shared/contants/roles';

import IVariantCategoriesRepository from '../repositories/IVariantCategoriesRepository';

import VariantCategory from '../infra/typeorm/entities/VariantCategory';

interface IRequest {
  name: string;
  role: ROLES;
}

@injectable()
class CreateVariantCategoryService {
  constructor(
    @inject('VariantCategoriesRepository')
    private variantCategoriesRepository: IVariantCategoriesRepository,
  ) {}

  public async execute({ name, role }: IRequest): Promise<VariantCategory> {
    if (role !== ROLES.ADMIN) {
      throw new AppError('User is not allowed to create a product.', 403);
    }

    const variantCategoryNameExists = await this.variantCategoriesRepository.findByName(
      name,
    );

    if (variantCategoryNameExists) {
      throw new AppError('Variant category name already exists.', 409);
    }

    const variantCategory = await this.variantCategoriesRepository.create(name);

    return variantCategory;
  }
}

export default CreateVariantCategoryService;
