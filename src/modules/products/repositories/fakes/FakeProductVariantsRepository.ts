import { uuid } from 'uuidv4';

import IProductVariantsRepository from '@modules/products/repositories/IProductVariantsRepository';

import ICreateProductVariantDTO from '@modules/products/dtos/ICreateProductVariantDTO';
import IFindByProductIdAndVariantIdDTO from '@modules/products/dtos/IFindByProductIdAndVariantIdDTO';
import ProductVariant from '../../infra/typeorm/entities/ProductVariant';

class FakeProductVariantsRepository implements IProductVariantsRepository {
  private productVariants: ProductVariant[] = [];

  public async findById(id: string): Promise<ProductVariant | undefined> {
    const findProductVariant = this.productVariants.find(
      productVariants => productVariants.id === id,
    );

    return findProductVariant;
  }

  public async findByProductIdAndVariantId({
    product_id,
    variant_id,
  }: IFindByProductIdAndVariantIdDTO): Promise<ProductVariant | undefined> {
    const findProductVariant = this.productVariants.find(
      productVariants =>
        productVariants.product_id === product_id &&
        productVariants.variant_id === variant_id,
    );

    return findProductVariant;
  }

  public async create({
    product_id,
    variant_id,
  }: ICreateProductVariantDTO): Promise<ProductVariant> {
    const productvariants = new ProductVariant();

    Object.assign(productvariants, { id: uuid() }, { product_id, variant_id });

    this.productVariants.push(productvariants);

    return productvariants;
  }

  public async save(
    productVariantsData: ProductVariant,
  ): Promise<ProductVariant> {
    const findIndex = this.productVariants.findIndex(
      findProductVariant => findProductVariant.id === productVariantsData.id,
    );

    this.productVariants[findIndex] = productVariantsData;

    return productVariantsData;
  }
}

export default FakeProductVariantsRepository;
