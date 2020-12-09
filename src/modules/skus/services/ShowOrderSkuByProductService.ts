import { injectable, inject } from 'tsyringe';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import IOrderSkusRepository from '@modules/skus/repositories/IOrderSkusRepository';

import AppError from '@shared/errors/AppError';
import { ROLES } from '@shared/contants/roles';

import OrderSku from '../infra/typeorm/entities/OrderSku';

interface IRequest {
  product_id: string;
  role: ROLES;
}

@injectable()
class ShowOrderSkuByProductService {
  constructor(
    @inject('OrderSkusRepository')
    private orderSkusRepository: IOrderSkusRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ product_id, role }: IRequest): Promise<OrderSku[]> {
    if (role !== ROLES.ADMIN) {
      throw new AppError('User is not allowed to create a product.', 403);
    }

    const product = await this.productsRepository.findById(product_id);

    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    const orderSkusByProduct = await this.orderSkusRepository.findByProductId(
      product_id,
    );

    return orderSkusByProduct;
  }
}

export default ShowOrderSkuByProductService;
