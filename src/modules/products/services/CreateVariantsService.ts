import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { ROLES } from '@shared/contants/roles';

import IVariantsRepository from '../repositories/IVariantsRepository';
import IVariantCategoriesRepository from '../repositories/IVariantCategoriesRepository';

import VariantCategory from '../infra/typeorm/entities/VariantCategory';

interface IRequest {
  name: string;
  identifier_code: string;
  variant_category_id: string;
  role: ROLES;
}

@injectable()
class CreateVariantsService {
  constructor(
    @inject('VariantsRepository')
    private variantsRepository: IVariantsRepository,

    @inject('VariantCategoriesRepository')
    private variantCategoriesRepository: IVariantCategoriesRepository,
  ) {}

  public async execute({
    name,
    identifier_code,
    variant_category_id,
    role,
  }: IRequest): Promise<VariantCategory> {
    if (role !== ROLES.ADMIN) {
      throw new AppError('User is not allowed to create a product.', 403);
    }

    const variantCodeExists = await this.variantsRepository.findByIdentifierCode(
      identifier_code,
    );

    if (variantCodeExists) {
      throw new AppError('Variant identifier code already exists.', 409);
    }

    const variantCategoryExists = await this.variantCategoriesRepository.findById(
      variant_category_id,
    );

    if (!variantCategoryExists) {
      throw new AppError('Variant category does not exist.', 404);
    }

    const variant = await this.variantsRepository.create({
      name,
      identifier_code,
      variant_category_id,
    });

    return variant;
  }
}

export default CreateVariantsService;
