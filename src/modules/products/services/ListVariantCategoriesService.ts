import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { ROLES } from '@shared/contants/roles';

import IVariantCategoriesRepository from '../repositories/IVariantCategoriesRepository';

import VariantCategory from '../infra/typeorm/entities/VariantCategory';

interface IRequest {
  page: number;
  limit: number;
  role: ROLES;
}

interface IResponse {
  total: number;
  page: number;
  variantCategories: VariantCategory[];
}

@injectable()
class ListVariantCategoriesService {
  constructor(
    @inject('VariantCategoriesRepository')
    private variantCategoriesRepository: IVariantCategoriesRepository,
  ) {}

  public async execute({ limit, page, role }: IRequest): Promise<IResponse> {
    if (role !== ROLES.ADMIN) {
      throw new AppError('User is not allowed to create a product.', 403);
    }

    const {
      variantCategories,
      total,
    } = await this.variantCategoriesRepository.findAll({
      limit,
      page,
    });

    return { variantCategories, total, page };
  }
}

export default ListVariantCategoriesService;
