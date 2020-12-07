import { Repository, getRepository } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IProductsPaginationDTO from '@modules/products/dtos/IProductsPaginationDTO';
import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id);

    return product;
  }

  public async findAll({
    limit,
    page,
  }: IPaginationDTO): Promise<IProductsPaginationDTO> {
    const skip = Math.abs(page - 1) * limit;

    const [products, total] = await this.ormRepository.findAndCount({
      take: limit,
      skip,
    });

    return { products, total };
  }

  public async findByIdentifierCode(
    code: string,
  ): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { identifier_code: code },
    });

    return product;
  }

  public async create({
    name,
    identifier_code,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      identifier_code,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(productData: Product): Promise<Product> {
    return this.ormRepository.save(productData);
  }

  public async remove(productData: Product): Promise<void> {
    await this.ormRepository.remove(productData);
  }
}

export default ProductsRepository;
