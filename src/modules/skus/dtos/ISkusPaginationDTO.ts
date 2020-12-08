import Sku from '../infra/typeorm/entities/Sku';

export default interface ISkusPaginationDTO {
  skus: Sku[];
  total: number;
}
