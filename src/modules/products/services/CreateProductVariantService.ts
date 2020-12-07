import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { ROLES } from '@shared/contants/roles';

import IOrderSkusRepository from '@modules/skus/repositories/IOrderSkusRepository';
import ISkusRepository from '@modules/skus/repositories/ISkusRepository';
import Sku from '@modules/skus/infra/typeorm/entities/Sku';
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

    const variantCategoryIds = variantsExist.map(
      variant => variant.variant_category_id,
    );

    const orderSkuFind = orderSkus.find(orderSku =>
      variantCategoryIds.includes(orderSku.variant_category_id),
    );

    if (!orderSkuFind) {
      throw new AppError(
        'The requested product variation is not part of the order of priority.',
        409,
      );
    }

    const productVariantsExist = await this.productVariantsRepository.findByProductId(
      product_id,
    );

    const productVariantExist = productVariantsExist.find(productVariant =>
      variants.includes(productVariant.variant_id),
    );

    if (productVariantExist) {
      throw new AppError('Product variant already exists.', 409);
    }

    const VariantAlreadyAdded = productVariantsExist.find(productVariant =>
      variantCategoryIds.includes(productVariant.variant.variant_category_id),
    );

    if (VariantAlreadyAdded) {
      throw new AppError(
        'Variant of the same category has already been added.',
        409,
      );
    }

    const productVatiantsData = variants.map(variant => {
      return {
        product_id,
        variant_id: variant,
      };
    });

    const productVariants = await this.productVariantsRepository.create(
      productVatiantsData,
    );

    productVariants.map(productVariant => {
      const variantFind = variantsExist.find(
        variant => productVariant.variant_id === variant.id,
      );

      if (!variantFind) return null;

      productVariant.variant = variantFind;

      return productVariant;
    });

    productVariantsExist.push(...productVariants);

    const identifierCodeArray = orderSkus.map(orderSku => {
      return productVariantsExist.find(
        productVariant =>
          productVariant.variant.variant_category_id ===
          orderSku.variant_category_id,
      )?.variant.identifier_code;
    });

    const identifierCode = identifierCodeArray
      .filter(code => code !== undefined)
      .join('-');

    const codeSku = `${product.identifier_code}-${identifierCode}`;

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
