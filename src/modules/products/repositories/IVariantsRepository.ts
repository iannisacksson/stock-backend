import Variant from '../infra/typeorm/entities/Variant';

import ICreateVariantDTO from '../dtos/ICreateVariantDTO';

export default interface IVariantsRepository {
  findById(id: string): Promise<Variant | undefined>;
  findByIds(ids: string[]): Promise<Variant[]>;
  findByIdentifierCode(code: string): Promise<Variant | undefined>;
  create(data: ICreateVariantDTO): Promise<Variant>;
  save(data: Variant): Promise<Variant>;
}
