import Sku from '../infra/typeorm/entities/Sku';
import ICreateSkuDTO from '../dtos/ICreateSkuDTO';

export default interface ISkusRepository {
  findById(id: string): Promise<Sku | undefined>;
  findByCode(code: string): Promise<Sku | undefined>;
  create(data: ICreateSkuDTO): Promise<Sku>;
  save(data: Sku): Promise<Sku>;
}
