import { Repository, getRepository, In } from 'typeorm';

import IVariantCategoriesRepository from '@modules/products/repositories/IVariantCategoriesRepository';

import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import IVariantCategoriesPaginationDTO from '@modules/products/dtos/IVariantCategoriesPaginationDTO';
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

  public async findByIds(ids: string[]): Promise<VariantCategory[]> {
    const variantCategories = await this.ormRepository.find({
      where: { id: In(ids) },
    });

    return variantCategories;
  }

  public async findByName(name: string): Promise<VariantCategory | undefined> {
    const variantCategory = await this.ormRepository.findOne({
      where: { name },
    });

    return variantCategory;
  }

  public async findAll({
    limit,
    page,
  }: IPaginationDTO): Promise<IVariantCategoriesPaginationDTO> {
    const skip = Math.abs(page - 1) * limit;

    const [variantCategories, total] = await this.ormRepository.findAndCount({
      take: limit,
      skip,
    });

    return { variantCategories, total };
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
