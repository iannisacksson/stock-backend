import { uuid } from 'uuidv4';

import ISkusRepository from '@modules/skus/repositories/ISkusRepository';

import ICreateSkuDTO from '@modules/skus/dtos/ICreateSkuDTO';
import ISkusPaginationDTO from '@modules/skus/dtos/ISkusPaginationDTO';
import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import Sku from '../../infra/typeorm/entities/Sku';

class FakeSkusRepository implements ISkusRepository {
  private skus: Sku[] = [];

  public async findById(id: string): Promise<Sku | undefined> {
    const findSku = this.skus.find(sku => sku.id === id);

    return findSku;
  }

  public async findAll({
    limit,
    page,
  }: IPaginationDTO): Promise<ISkusPaginationDTO> {
    const total = this.skus.length;

    const skus = this.skus.slice((page - 1) * limit, page * limit);

    return { skus, total };
  }

  public async findByCode(code: string): Promise<Sku | undefined> {
    const findSku = this.skus.find(sku => sku.code === code);

    return findSku;
  }

  public async findByProductId(id: string): Promise<Sku[]> {
    const findSkus = this.skus.filter(sku => sku.product_id === id);

    return findSkus;
  }

  public async create(skuData: ICreateSkuDTO): Promise<Sku> {
    const sku = new Sku();

    Object.assign(sku, { id: uuid() }, skuData);

    this.skus.push(sku);

    return sku;
  }

  public async saveSeveral(skuData: Sku[]): Promise<Sku[]> {
    skuData.map(skuData => {
      const skuDataIndex = this.skus.findIndex(sku => sku.id === skuData.id);

      this.skus[skuDataIndex] = skuData;

      return null;
    });

    return this.skus;
  }
}

export default FakeSkusRepository;
