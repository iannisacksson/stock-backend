import Variant from '../infra/typeorm/entities/Variant';

import ICreateVariantDTO from '../dtos/ICreateVariantDTO';
import IVariantsPaginationDTO from '../dtos/IVariantsPaginationDTO';
import IFindByAllVariantsDTO from '../dtos/IFindByAllVariantsDTO';

export default interface IVariantsRepository {
  findById(id: string): Promise<Variant | undefined>;
  findByIds(ids: string[]): Promise<Variant[]>;
  findAll(data: IFindByAllVariantsDTO): Promise<IVariantsPaginationDTO>;
  findByIdentifierCode(code: string): Promise<Variant | undefined>;
  create(data: ICreateVariantDTO): Promise<Variant>;
  save(data: Variant): Promise<Variant>;
}
