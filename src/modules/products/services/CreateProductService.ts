import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { ROLES } from '@shared/contants/roles';

import IProductsRepository from '../repositories/IProductsRepository';

import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  name: string;
  identifier_code: string;
  role: ROLES;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    name,
    identifier_code,
    role,
  }: IRequest): Promise<Product> {
    if (role !== ROLES.ADMIN) {
      throw new AppError('User is not allowed to create a product.', 403);
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

    const product = await this.productsRepository.create({
      name,
      identifier_code,
    });

    return product;
  }
}

export default CreateProductService;
