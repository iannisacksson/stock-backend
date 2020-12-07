import { uuid } from 'uuidv4';

import IOrderSkusRepository from '@modules/skus/repositories/IOrderSkusRepository';

import ICreateOrderSkuDTO from '@modules/skus/dtos/ICreateOrderSkuDTO';
import OrderSku from '../../infra/typeorm/entities/OrderSku';

class FakeOrderSkusRepository implements IOrderSkusRepository {
  private orderSkus: OrderSku[] = [];

  public async findById(id: string): Promise<OrderSku | undefined> {
    const findOrderSku = this.orderSkus.find(orderSku => orderSku.id === id);

    return findOrderSku;
  }

  public async findByProductId(id: string): Promise<OrderSku[]> {
    const findOrderSkus = this.orderSkus.filter(
      orderSku => orderSku.product_id === id,
    );

    return findOrderSkus;
  }

  public async create(orderSkuData: ICreateOrderSkuDTO[]): Promise<OrderSku[]> {
    const orderSku = new OrderSku();

    const orderSkuNew = orderSkuData.map(orderSkuData => {
      const orderSkuObject = Object.assign(
        orderSku,
        { id: uuid() },
        orderSkuData,
      );

      this.orderSkus.push(orderSkuObject);

      return orderSkuObject;
    });

    return orderSkuNew;
  }

  public async save(productData: OrderSku): Promise<OrderSku> {
    const findIndex = this.orderSkus.findIndex(
      findOrderSku => findOrderSku.id === productData.id,
    );

    this.orderSkus[findIndex] = productData;

    return productData;
  }
}

export default FakeOrderSkusRepository;
