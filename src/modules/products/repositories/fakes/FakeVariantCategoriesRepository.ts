import { uuid } from 'uuidv4';

import IVariantCategoriesRepository from '@modules/products/repositories/IVariantCategoriesRepository';

import VariantCategory from '../../infra/typeorm/entities/VariantCategory';

class FakeVariantCategoriesRepository implements IVariantCategoriesRepository {
  private variantCategories: VariantCategory[] = [];

  public async findById(id: string): Promise<VariantCategory | undefined> {
    const findVariantCategory = this.variantCategories.find(
      variantCategory => variantCategory.id === id,
    );

    return findVariantCategory;
  }

  public async findByName(name: string): Promise<VariantCategory | undefined> {
    const findVariantCategory = this.variantCategories.find(
      variantCategory => variantCategory.name === name,
    );

    return findVariantCategory;
  }

  public async create(name: string): Promise<VariantCategory> {
    const variantCategory = new VariantCategory();

    Object.assign(variantCategory, { id: uuid() }, { name });

    this.variantCategories.push(variantCategory);

    return variantCategory;
  }

  public async save(
    variantCategoryData: VariantCategory,
  ): Promise<VariantCategory> {
    const findIndex = this.variantCategories.findIndex(
      findVariantCategory => findVariantCategory.id === variantCategoryData.id,
    );

    this.variantCategories[findIndex] = variantCategoryData;

    return variantCategoryData;
  }
}

export default FakeVariantCategoriesRepository;
