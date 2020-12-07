import { Repository, getRepository } from 'typeorm';

import ISkusRepository from '@modules/skus/repositories/ISkusRepository';

import ICreateSkuDTO from '@modules/skus/dtos/ICreateSkuDTO';

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

  public async save(skuData: Sku): Promise<Sku> {
    return this.ormRepository.save(skuData);
  }
}

export default SkusRepository;
