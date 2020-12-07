import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import Product from '../infra/typeorm/entities/Product';

import ICreateProductDTO from '../dtos/ICreateProductDTO';
import IProductsPaginationDTO from '../dtos/IProductsPaginationDTO';

export default interface IProductsRepository {
  findById(id: string): Promise<Product | undefined>;
  findByIdentifierCode(code: string): Promise<Product | undefined>;
  findAll(pagination: IPaginationDTO): Promise<IProductsPaginationDTO>;
  create(data: ICreateProductDTO): Promise<Product>;
  save(data: Product): Promise<Product>;
  remove(data: Product): Promise<void>;
}
