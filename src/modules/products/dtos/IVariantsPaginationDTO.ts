import Variant from '../infra/typeorm/entities/Variant';

export default interface IVariantsPaginationDTO {
  variants: Variant[];
  total: number;
}
