import { Repository, getRepository, In } from 'typeorm';

import IOrderSkusRepository from '@modules/skus/repositories/IOrderSkusRepository';

import ICreateOrderSkuDTO from '@modules/skus/dtos/ICreateOrderSkuDTO';
import IFindByProductIdAndPrioritiesDTO from '@modules/skus/dtos/IFindByProductIdAndPrioritiesDTO';

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

  public async findByProductIdAndpriorities({
    priorities,
    product_id,
  }: IFindByProductIdAndPrioritiesDTO): Promise<OrderSku[]> {
    const orderSkus = await this.ormRepository.find({
      where: { product_id, priority: In(priorities) },
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
