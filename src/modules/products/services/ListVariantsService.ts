import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { ROLES } from '@shared/contants/roles';

import IVariantsRepository from '../repositories/IVariantsRepository';

import Variant from '../infra/typeorm/entities/Variant';

interface IRequest {
  page: number;
  limit: number;
  role: ROLES;
  variant_category_id: string;
}

interface IResponse {
  total: number;
  page: number;
  variants: Variant[];
}

@injectable()
class ListVariantsService {
  constructor(
    @inject('VariantsRepository')
    private variantsRepository: IVariantsRepository,
  ) {}

  public async execute({
    limit,
    page,
    role,
    variant_category_id,
  }: IRequest): Promise<IResponse> {
    if (role !== ROLES.ADMIN) {
      throw new AppError('User is not allowed to create a product.', 403);
    }

    const { variants, total } = await this.variantsRepository.findAll({
      limit,
      page,
      variant_category_id,
    });

    return { variants, total, page };
  }
}

export default ListVariantsService;
