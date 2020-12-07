import ProductVariant from '../infra/typeorm/entities/ProductVariant';

import ICreateProductVariantDTO from '../dtos/ICreateProductVariantDTO';
// import IFindByProductIdAndVariantIdDTO from '../dtos/IFindByProductIdAndVariantIdDTO';

export default interface IProductProductVariantsRepository {
  findById(id: string): Promise<ProductVariant | undefined>;
  findByProductId(id: string): Promise<ProductVariant[]>;
  create(data: ICreateProductVariantDTO[]): Promise<ProductVariant[]>;
  save(data: ProductVariant): Promise<ProductVariant>;
}
