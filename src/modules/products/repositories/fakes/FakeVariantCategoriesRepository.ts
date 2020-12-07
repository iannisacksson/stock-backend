import { uuid } from 'uuidv4';

import IVariantCategoriesRepository from '@modules/products/repositories/IVariantCategoriesRepository';

import IPaginationDTO from '@shared/dtos/IPaginationDTO';
import IVariantCategoriesPaginationDTO from '@modules/products/dtos/IVariantCategoriesPaginationDTO';
import VariantCategory from '../../infra/typeorm/entities/VariantCategory';

class FakeVariantCategoriesRepository implements IVariantCategoriesRepository {
  private variantCategories: VariantCategory[] = [];

  public async findById(id: string): Promise<VariantCategory | undefined> {
    const findVariantCategory = this.variantCategories.find(
      variantCategory => variantCategory.id === id,
    );

    return findVariantCategory;
  }

  public async findByIds(ids: string[]): Promise<VariantCategory[]> {
    const findVariantCategories = this.variantCategories.filter(
      variantCategory => ids.includes(variantCategory.id),
    );

    return findVariantCategories;
  }

  public async findAll({
    limit,
    page,
  }: IPaginationDTO): Promise<IVariantCategoriesPaginationDTO> {
    const total = this.variantCategories.length;

    const variantCategories = this.variantCategories.slice(
      (page - 1) * limit,
      page * limit,
    );

    return { variantCategories, total };
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
