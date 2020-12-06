import { uuid } from 'uuidv4';

import IVariantsRepository from '@modules/products/repositories/IVariantsRepository';

import ICreateVariantDTO from '@modules/products/dtos/ICreateVariantDTO';
import Variant from '../../infra/typeorm/entities/Variant';

class FakeVariantsRepository implements IVariantsRepository {
  private variants: Variant[] = [];

  public async findById(id: string): Promise<Variant | undefined> {
    const findVariant = this.variants.find(variant => variant.id === id);

    return findVariant;
  }

  public async findByIdentifierCode(
    code: string,
  ): Promise<Variant | undefined> {
    const findVariant = this.variants.find(
      variant => variant.identifier_code === code,
    );

    return findVariant;
  }

  public async create({
    name,
    identifier_code,
    variant_category_id,
  }: ICreateVariantDTO): Promise<Variant> {
    const variant = new Variant();

    Object.assign(
      variant,
      { id: uuid() },
      { name, identifier_code, variant_category_id },
    );

    this.variants.push(variant);

    return variant;
  }

  public async save(variantData: Variant): Promise<Variant> {
    const findIndex = this.variants.findIndex(
      findVariant => findVariant.id === variantData.id,
    );

    this.variants[findIndex] = variantData;

    return variantData;
  }
}

export default FakeVariantsRepository;
