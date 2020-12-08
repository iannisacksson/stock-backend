import { Repository, getRepository } from 'typeorm';

import ISkusRepository from '@modules/skus/repositories/ISkusRepository';

import ICreateSkuDTO from '@modules/skus/dtos/ICreateSkuDTO';

import ISkusPaginationDTO from '@modules/skus/dtos/ISkusPaginationDTO';
import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import Sku from '../entities/Sku';

class SkusRepository implements ISkusRepository {
  private ormRepository: Repository<Sku>;

  constructor() {
    this.ormRepository = getRepository(Sku);
  }

  public async findById(id: string): Promise<Sku | undefined> {
    const sku = await this.ormRepository.findOne(id);

    return sku;
  }

  public async findByProductId(id: string): Promise<Sku[]> {
    const skus = await this.ormRepository.find({
      where: { product_id: id },
    });

    return skus;
  }

  public async findAll({
    limit,
    page,
  }: IPaginationDTO): Promise<ISkusPaginationDTO> {
    const skip = Math.abs(page - 1) * limit;

    const [skus, total] = await this.ormRepository.findAndCount({
      take: limit,
      skip,
      relations: ['product'],
    });

    return { skus, total };
  }

  public async findByCode(code: string): Promise<Sku | undefined> {
    const sku = await this.ormRepository.findOne({
      where: { code },
    });

    return sku;
  }

  public async create(SkuData: ICreateSkuDTO): Promise<Sku> {
    const sku = this.ormRepository.create(SkuData);

    await this.ormRepository.save(sku);

    return sku;
  }

  public async saveSeveral(skuData: Sku[]): Promise<Sku[]> {
    return this.ormRepository.save(skuData);
  }
}

export default SkusRepository;
