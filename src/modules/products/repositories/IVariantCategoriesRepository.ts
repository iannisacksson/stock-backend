import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import VariantCategory from '../infra/typeorm/entities/VariantCategory';
import IVariantCategoriesPaginationDTO from '../dtos/IVariantCategoriesPaginationDTO';

export default interface IVariantCategoriesRepository {
  findById(id: string): Promise<VariantCategory | undefined>;
  findByIds(ids: string[]): Promise<VariantCategory[]>;
  findAll({
    limit,
    page,
  }: IPaginationDTO): Promise<IVariantCategoriesPaginationDTO>;
  findByName(name: string): Promise<VariantCategory | undefined>;
  create(name: string): Promise<VariantCategory>;
  save(data: VariantCategory): Promise<VariantCategory>;
}
