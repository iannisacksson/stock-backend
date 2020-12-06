import VariantCategory from '../infra/typeorm/entities/VariantCategory';

export default interface IVariantCategoriesRepository {
  findById(id: string): Promise<VariantCategory | undefined>;
  findByName(name: string): Promise<VariantCategory | undefined>;
  create(name: string): Promise<VariantCategory>;
  save(data: VariantCategory): Promise<VariantCategory>;
}
