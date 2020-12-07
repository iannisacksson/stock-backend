import Sku from '../infra/typeorm/entities/Sku';
import ICreateSkuDTO from '../dtos/ICreateSkuDTO';

export default interface ISkusRepository {
  findById(id: string): Promise<Sku | undefined>;
  findByCode(code: string): Promise<Sku | undefined>;
  findByProductId(id: string): Promise<Sku[]>;
  create(data: ICreateSkuDTO): Promise<Sku>;
  saveSeveral(data: Sku[]): Promise<Sku[]>;
}
