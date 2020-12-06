import VariantCategory from '../infra/typeorm/entities/VariantCategory';

export default interface IVariantCategoriesPaginationDTO {
  variantCategories: VariantCategory[];
  total: number;
}
