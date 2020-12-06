import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { ROLES } from '@shared/contants/roles';

import IProductVariantsRepository from '../repositories/IProductVariantsRepository';
import IProductsRepository from '../repositories/IProductsRepository';
import IVariantsRepository from '../repositories/IVariantsRepository';

import ProductVariant from '../infra/typeorm/entities/ProductVariant';

interface IRequest {
  product_id: string;
  variant_id: string;
  role: ROLES;
}

@injectable()
class CreateProductVariantsService {
  constructor(
    @inject('ProductVariantsRepository')
    private productVariantsRepository: IProductVariantsRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('VariantsRepository')
    private variantsRepository: IVariantsRepository,
  ) {}

  public async execute({
    product_id,
    variant_id,
    role,
  }: IRequest): Promise<ProductVariant> {
    if (role !== ROLES.ADMIN) {
      throw new AppError('User is not allowed to create a product.', 403);
    }

    const product = await this.productsRepository.findById(product_id);

    if (!product) {
      throw new AppError('Product not found.', 409);
    }

    const variant = await this.variantsRepository.findById(variant_id);

    if (!variant) {
      throw new AppError('Variant not found.', 409);
    }

    const productVariantExist = await this.productVariantsRepository.findByProductIdAndVariantId(
      {
        product_id,
        variant_id,
      },
    );

    if (productVariantExist) {
      throw new AppError('Product variant already exists.', 409);
    }

    const productVariant = await this.productVariantsRepository.create({
      product_id,
      variant_id,
    });

    return productVariant;
  }
}

export default CreateProductVariantsService;
