import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { ROLES } from '@shared/contants/roles';

import Sku from '@modules/skus/infra/typeorm/entities/Sku';

import IOrderSkusRepository from '@modules/skus/repositories/IOrderSkusRepository';
import ISkusRepository from '@modules/skus/repositories/ISkusRepository';
import IProductVariantsRepository from '../repositories/IProductVariantsRepository';
import IProductsRepository from '../repositories/IProductsRepository';
import IVariantsRepository from '../repositories/IVariantsRepository';

interface IRequest {
  product_id: string;
  variants: string[];
  quantity: number;
  price: number;
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

    @inject('OrderSkusRepository')
    private orderSkusRepository: IOrderSkusRepository,

    @inject('SkusRepository')
    private skusRepository: ISkusRepository,
  ) {}

  public async execute({
    product_id,
    variants,
    role,
    price,
    quantity,
  }: IRequest): Promise<Sku> {
    if (role !== ROLES.ADMIN) {
      throw new AppError('User is not allowed to create a product.', 403);
    }

    const product = await this.productsRepository.findById(product_id);

    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    const variantsExist = await this.variantsRepository.findByIds(variants);

    if (variantsExist.length < 1) {
      throw new AppError('Variant not found.', 404);
    }

    const orderSkus = await this.orderSkusRepository.findByProductId(
      product_id,
    );

    if (orderSkus.length < 1) {
      throw new AppError(
        'The order of priority for this product has not yet been defined.',
        409,
      );
    }

    if (orderSkus.length !== variants.length) {
      throw new AppError('Variations are missing to assemble the SKU.', 409);
    }

    const identifierCodeArray = orderSkus.map(orderSku => {
      return variantsExist.find(
        variant => variant.variant_category_id === orderSku.variant_category_id,
      )?.identifier_code;
    });

    const identifierCode = identifierCodeArray
      .filter(code => code !== undefined)
      .join('-');

    const codeSku = `${product.identifier_code}-${identifierCode}`;

    const skuExist = await this.skusRepository.findByCode(codeSku);

    if (skuExist) {
      throw new AppError('Product variation already added.', 409);
    }

    const variantCategoryIds = variantsExist.map(
      variant => variant.variant_category_id,
    );

    const orderSkuFind = orderSkus.map(orderSku =>
      variantCategoryIds.includes(orderSku.variant_category_id),
    );

    if (orderSkuFind.includes(false)) {
      throw new AppError(
        'The requested product variation is not part of the order of priority.',
        409,
      );
    }

    const productVatiantsData = variants.map(variant => {
      return {
        product_id,
        variant_id: variant,
      };
    });

    await this.productVariantsRepository.create(productVatiantsData);

    const sku = await this.skusRepository.create({
      code: codeSku,
      price,
      product_id,
      quantity,
    });

    return sku;
  }
}

export default CreateProductVariantsService;
