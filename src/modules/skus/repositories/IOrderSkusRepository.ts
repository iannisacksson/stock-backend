import OrderSkus from '../infra/typeorm/entities/OrderSku';
import ICreateOrderSkuDTO from '../dtos/ICreateOrderSkuDTO';
import IFindByProductIdAndPrioritiesDTO from '../dtos/IFindByProductIdAndPrioritiesDTO';

export default interface IOrderSkusRepository {
  findById(id: string): Promise<OrderSkus | undefined>;
  findByProductIdAndpriorities(
    data: IFindByProductIdAndPrioritiesDTO,
  ): Promise<OrderSkus[]>;
  create(data: ICreateOrderSkuDTO[]): Promise<OrderSkus[]>;
  save(data: OrderSkus): Promise<OrderSkus>;
}
