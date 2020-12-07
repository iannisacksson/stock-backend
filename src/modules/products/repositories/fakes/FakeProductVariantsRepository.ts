import { uuid } from 'uuidv4';

import IProductVariantsRepository from '@modules/products/repositories/IProductVariantsRepository';

import ICreateProductVariantDTO from '@modules/products/dtos/ICreateProductVariantDTO';
import ProductVariant from '../../infra/typeorm/entities/ProductVariant';

class FakeProductVariantsRepository implements IProductVariantsRepository {
  private productVariants: ProductVariant[] = [];

  public async findById(id: string): Promise<ProductVariant | undefined> {
    const findProductVariant = this.productVariants.find(
      productVariants => productVariants.id === id,
    );

    return findProductVariant;
  }

  public async findByProductId(id: string): Promise<ProductVariant[]> {
    const findProductVariants = this.productVariants.filter(
      productVariants => productVariants.id === id,
    );

    return findProductVariants;
  }

  public async create(
    productVariantData: ICreateProductVariantDTO[],
  ): Promise<ProductVariant[]> {
    const productvariants = new ProductVariant();

    Object.assign(productvariants, { id: uuid() }, { productVariantData });

    this.productVariants.push(productvariants);

    return this.productVariants;
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
