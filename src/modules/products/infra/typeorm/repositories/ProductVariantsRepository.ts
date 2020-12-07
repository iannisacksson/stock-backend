import { Repository, getRepository } from 'typeorm';

import IProductVariantsRepository from '@modules/products/repositories/IProductVariantsRepository';

import ICreateProductVariantDTO from '@modules/products/dtos/ICreateProductVariantDTO';
import IFindByProductIdAndVariantIdDTO from '@modules/products/dtos/IFindByProductIdAndVariantIdDTO';

import ProductVariant from '../entities/ProductVariant';

class ProductVariantsRepository implements IProductVariantsRepository {
  private ormRepository: Repository<ProductVariant>;

  constructor() {
    this.ormRepository = getRepository(ProductVariant);
  }

  public async findById(id: string): Promise<ProductVariant | undefined> {
    const productVariant = await this.ormRepository.findOne(id);

    return productVariant;
  }

  public async findByProductId(id: string): Promise<ProductVariant[]> {
    const productVariant = await this.ormRepository.find({
      where: { product_id: id },
      relations: ['variant'],
    });

    return productVariant;
  }

  public async findByProductIdAndVariantId({
    product_id,
    variant_id,
  }: IFindByProductIdAndVariantIdDTO): Promise<ProductVariant | undefined> {
    const productVariant = await this.ormRepository.findOne({
      where: { product_id, variant_id },
    });

    return productVariant;
  }

  public async create(
    productVariantsData: ICreateProductVariantDTO[],
  ): Promise<ProductVariant[]> {
    const productVariant = this.ormRepository.create(productVariantsData);

    await this.ormRepository.save(productVariant);

    return productVariant;
  }

  public async save(
    productVariantData: ProductVariant,
  ): Promise<ProductVariant> {
    return this.ormRepository.save(productVariantData);
  }
}

export default ProductVariantsRepository;
