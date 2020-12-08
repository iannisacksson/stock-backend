import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { ROLES } from '@shared/contants/roles';

import ISkusRepository from '../repositories/ISkusRepository';

import Sku from '../infra/typeorm/entities/Sku';

interface IRequest {
  page: number;
  limit: number;
  role: ROLES;
}

interface IResponse {
  total: number;
  page: number;
  skus: Sku[];
}

@injectable()
class ListSkusService {
  constructor(
    @inject('SkusRepository')
    private skusRepository: ISkusRepository,
  ) {}

  public async execute({ limit, page, role }: IRequest): Promise<IResponse> {
    if (role !== ROLES.ADMIN) {
      throw new AppError('User is not allowed to create a product.', 403);
    }

    const { skus, total } = await this.skusRepository.findAll({
      limit,
      page,
    });

    return { total, page, skus };
  }
}

export default ListSkusService;
