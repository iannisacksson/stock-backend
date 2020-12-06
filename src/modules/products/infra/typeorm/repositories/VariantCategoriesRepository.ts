import { Repository, getRepository } from 'typeorm';

import IVariantCategoriesRepository from '@modules/products/repositories/IVariantCategoriesRepository';

import VariantCategory from '../entities/VariantCategory';

class VariantCategoriesRepository implements IVariantCategoriesRepository {
  private ormRepository: Repository<VariantCategory>;

  constructor() {
    this.ormRepository = getRepository(VariantCategory);
  }

  public async findById(id: string): Promise<VariantCategory | undefined> {
    const variantCategory = await this.ormRepository.findOne(id);

    return variantCategory;
  }

  public async findByName(name: string): Promise<VariantCategory | undefined> {
    const variantCategory = await this.ormRepository.findOne({
      where: { name },
    });

    return variantCategory;
  }

  public async findByIdentifierCode(
    code: string,
  ): Promise<VariantCategory | undefined> {
    const variantCategory = await this.ormRepository.findOne({
      where: { identifier_code: code },
    });

    return variantCategory;
  }

  public async create(name: string): Promise<VariantCategory> {
    const product = this.ormRepository.create({
      name,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(productData: VariantCategory): Promise<VariantCategory> {
    return this.ormRepository.save(productData);
  }
}

export default VariantCategoriesRepository;
