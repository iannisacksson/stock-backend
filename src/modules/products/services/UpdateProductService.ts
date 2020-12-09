import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { ROLES } from '@shared/contants/roles';

import ISkusRepository from '@modules/skus/repositories/ISkusRepository';
import IProductsRepository from '../repositories/IProductsRepository';

import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  product_id: string;
  name: string;
  identifier_code: string;
  role: ROLES;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('SkusRepository')
    private skusRepository: ISkusRepository,
  ) {}

  public async execute({
    product_id,
    name,
    identifier_code,
    role,
  }: IRequest): Promise<Product> {
    if (role !== ROLES.ADMIN) {
      throw new AppError('User is not allowed to create a product.', 403);
    }

    const product = await this.productsRepository.findById(product_id);

    if (!product) {
      throw new AppError('Product not found.', 404);
    }

    const identifierCodeExists = await this.productsRepository.findByIdentifierCode(
      identifier_code,
    );

    if (identifierCodeExists) {
      throw new AppError(
        'The identifier code is already associated with a product.',
        403,
      );
    }

    product.name = name;
    if (product.identifier_code !== identifier_code) {
      product.identifier_code = identifier_code;
    }

    await this.productsRepository.save(product);

    const skus = await this.skusRepository.findByProductId(product_id);

    const updatedSkus = skus.map(sku => {
      const index = sku.code.indexOf('-');

      const identifierCodeProduct = sku.code.substring(index);

      sku.code = `${product.identifier_code}${identifierCodeProduct}`;

      return sku;
    });

    await this.skusRepository.saveSeveral(updatedSkus);

    return product;
  }
}

export default UpdateProductService;
