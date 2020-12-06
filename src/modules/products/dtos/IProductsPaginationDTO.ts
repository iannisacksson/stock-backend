import Product from '../infra/typeorm/entities/Product';

export default interface IProductsPaginationDTO {
  products: Product[];
  total: number;
}
