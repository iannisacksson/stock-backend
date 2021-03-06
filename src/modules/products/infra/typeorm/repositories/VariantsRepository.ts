import { Repository, getRepository, In } from 'typeorm';

import IVariantsRepository from '@modules/products/repositories/IVariantsRepository';

import ICreateVariantDTO from '@modules/products/dtos/ICreateVariantDTO';

import IVariantsPaginationDTO from '@modules/products/dtos/IVariantsPaginationDTO';
import IFindByAllVariantsDTO from '@modules/products/dtos/IFindByAllVariantsDTO';
import Variant from '../entities/Variant';

class VariantsRepository implements IVariantsRepository {
  private ormRepository: Repository<Variant>;

  constructor() {
    this.ormRepository = getRepository(Variant);
  }

  public async findById(id: string): Promise<Variant | undefined> {
    const variant = await this.ormRepository.findOne(id);

    return variant;
  }

  public async findByIds(ids: string[]): Promise<Variant[]> {
    const variants = await this.ormRepository.find({
      where: { id: In(ids) },
    });

    return variants;
  }

  public async findByIdentifierCode(
    identifier_code: string,
  ): Promise<Variant | undefined> {
    const variant = await this.ormRepository.findOne({
      where: { identifier_code },
    });

    return variant;
  }

  public async findAll({
    limit,
    page,
    variant_category_id,
  }: IFindByAllVariantsDTO): Promise<IVariantsPaginationDTO> {
    const skip = Math.abs(page - 1) * limit;

    const [variants, total] = await this.ormRepository.findAndCount({
      where: variant_category_id ? { variant_category_id } : {},
      take: limit,
      skip,
      relations: ['variant_category'],
    });

    return { variants, total };
  }

  public async create({
    name,
    identifier_code,
    variant_category_id,
  }: ICreateVariantDTO): Promise<Variant> {
    const product = this.ormRepository.create({
      name,
      identifier_code,
      variant_category_id,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(productData: Variant): Promise<Variant> {
    return this.ormRepository.save(productData);
  }
}

export default VariantsRepository;
