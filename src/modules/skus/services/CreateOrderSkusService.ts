import { injectable, inject } from 'tsyringe';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import IOrderSkusRepository from '@modules/skus/repositories/IOrderSkusRepository';
import IVariantCategoriesRepository from '@modules/products/repositories/IVariantCategoriesRepository';

import AppError from '@shared/errors/AppError';
import { ROLES } from '@shared/contants/roles';
import { PRIORITIES } from '@shared/contants/priorities';

import ICreateOrderSku from '@modules/skus/dtos/ICreateOrderSkuDTO';
import OrderSku from '../infra/typeorm/entities/OrderSku';

interface IRequest {
  product_id: string;
  role: ROLES;
  categories: {
    variant_category_id: string;
    priority: PRIORITIES;
  }[];
}

@injectable()
class CreateOrderSkusService {
  constructor(
    @inject('OrderSkusRepository')
    private orderSkusRepository: IOrderSkusRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('VariantCategoriesRepository')
    private variantCategoriesRepository: IVariantCategoriesRepository,
  ) {}

  public async execute({
    product_id,
    role,
    categories,
  }: IRequest): Promise<OrderSku[]> {
    if (role !== ROLES.ADMIN) {
      throw new AppError('User is not allowed to create a product.', 403);
    }

    const product = await this.productsRepository.findById(product_id);

    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    const orderSkusData: ICreateOrderSku[] = [];
    const priorities: string[] = [];

    const categoryIds = categories.map((category, index, categoriesTemp) => {
      const duplicateCategories = categoriesTemp.filter(
        temp => category.variant_category_id === temp.variant_category_id,
      );

      if (duplicateCategories.length > 1) {
        throw new AppError('The same category was chosen twice.', 422);
      }

      orderSkusData.push({
        product_id,
        priority: category.priority,
        variant_category_id: category.variant_category_id,
      });

      priorities.push(category.priority);

      return category.variant_category_id;
    });

    const categoriesExist = await this.variantCategoriesRepository.findByIds(
      categoryIds,
    );

    if (categoriesExist.length !== categoryIds.length) {
      throw new AppError('One of the category variants was not found.', 404);
    }

    const orderSkusByProduct = await this.orderSkusRepository.findByProductIdAndpriorities(
      {
        product_id,
        priorities,
      },
    );

    if (orderSkusByProduct.length > 0) {
      throw new AppError(
        'One of the priorities has already been fulfilled.',
        409,
      );
    }

    const orderSkus = await this.orderSkusRepository.create(orderSkusData);

    return orderSkus;
  }
}

export default CreateOrderSkusService;
