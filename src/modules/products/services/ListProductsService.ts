import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { ROLES } from '@shared/contants/roles';

import IProductsRepository from '../repositories/IProductsRepository';

import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  page: number;
  limit: number;
  role: ROLES;
}

interface IResponse {
  total: number;
  page: number;
  products: Product[];
}

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ limit, page, role }: IRequest): Promise<IResponse> {
    if (role !== ROLES.ADMIN) {
      throw new AppError('User is not allowed to create a product.', 403);
    }

    const { products, total } = await this.productsRepository.findAll({
      limit,
      page,
    });

    return { total, page, products };
  }
}

export default ListProductsService;
