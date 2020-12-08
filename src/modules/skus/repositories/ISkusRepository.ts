import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import Sku from '../infra/typeorm/entities/Sku';
import ICreateSkuDTO from '../dtos/ICreateSkuDTO';
import ISkusPaginationDTO from '../dtos/ISkusPaginationDTO';

export default interface ISkusRepository {
  findById(id: string): Promise<Sku | undefined>;
  findByCode(code: string): Promise<Sku | undefined>;
  findByProductId(id: string): Promise<Sku[]>;
  findAll(data: IPaginationDTO): Promise<ISkusPaginationDTO>;
  create(data: ICreateSkuDTO): Promise<Sku>;
  saveSeveral(data: Sku[]): Promise<Sku[]>;
}
