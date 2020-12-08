import { uuid } from 'uuidv4';

import IVariantsRepository from '@modules/products/repositories/IVariantsRepository';

import ICreateVariantDTO from '@modules/products/dtos/ICreateVariantDTO';
import IFindByAllVariantsDTO from '@modules/products/dtos/IFindByAllVariantsDTO';
import IVariantsPaginationDTO from '@modules/products/dtos/IVariantsPaginationDTO';
import Variant from '../../infra/typeorm/entities/Variant';

class FakeVariantsRepository implements IVariantsRepository {
  private variants: Variant[] = [];

  public async findById(id: string): Promise<Variant | undefined> {
    const findVariant = this.variants.find(variant => variant.id === id);

    return findVariant;
  }

  public async findByIds(ids: string[]): Promise<Variant[]> {
    const findVariants = this.variants.filter(variant =>
      ids.includes(variant.id),
    );

    return findVariants;
  }

  public async findAll({
    limit,
    page,
    variant_category_id,
  }: IFindByAllVariantsDTO): Promise<IVariantsPaginationDTO> {
    if (variant_category_id) {
      const variantsFilter = this.variants.filter(
        variant => variant.variant_category_id === variant_category_id,
      );
      const total = variantsFilter.length;
      const variants = variantsFilter.slice((page - 1) * limit, page * limit);

      return { variants, total };
    }

    const total = this.variants.length;
    const variants = this.variants.slice((page - 1) * limit, page * limit);

    return { variants, total };
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
