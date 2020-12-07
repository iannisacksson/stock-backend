import { Repository, getRepository } from 'typeorm';

import IOrderSkusRepository from '@modules/skus/repositories/IOrderSkusRepository';

import ICreateOrderSkuDTO from '@modules/skus/dtos/ICreateOrderSkuDTO';

import OrderSku from '../entities/OrderSku';

class OrderSkusRepository implements IOrderSkusRepository {
  private ormRepository: Repository<OrderSku>;

  constructor() {
    this.ormRepository = getRepository(OrderSku);
  }

  public async findById(id: string): Promise<OrderSku | undefined> {
    const orderSkus = await this.ormRepository.findOne(id);

    return orderSkus;
  }

  public async findByProductId(id: string): Promise<OrderSku[]> {
    const orderSkus = await this.ormRepository.find({
      where: { product_id: id },
      order: { priority: 'ASC' },
    });

    return orderSkus;
  }

  public async create(
    orderSkusData: ICreateOrderSkuDTO[],
  ): Promise<OrderSku[]> {
    const orderSkus = this.ormRepository.create(orderSkusData);

    await this.ormRepository.save(orderSkus);

    return orderSkus;
  }

  public async save(orderSkuData: OrderSku): Promise<OrderSku> {
    return this.ormRepository.save(orderSkuData);
  }
}

export default OrderSkusRepository;
