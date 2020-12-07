import OrderSkus from '../infra/typeorm/entities/OrderSku';
import ICreateOrderSkuDTO from '../dtos/ICreateOrderSkuDTO';

export default interface IOrderSkusRepository {
  findById(id: string): Promise<OrderSkus | undefined>;
  findByProductId(id: string): Promise<OrderSkus[]>;
  create(data: ICreateOrderSkuDTO[]): Promise<OrderSkus[]>;
  save(data: OrderSkus): Promise<OrderSkus>;
}
