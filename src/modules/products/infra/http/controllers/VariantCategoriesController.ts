import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateVariantCategoryService from '@modules/products/services/CreateVariantCategoryService';
import ListVariantCategoriesService from '@modules/products/services/ListVariantCategoriesService';

import { sendSuccessful } from '@shared/formatters/responses';
import { ROLES } from '@shared/contants/roles';

export default class VariantCategoriesController {
  public async create(request: Request, response: Response): Promise<void> {
    const { role } = request.user;
    const { name } = request.body;

    const createVariantCategory = container.resolve(
      CreateVariantCategoryService,
    );

    const product = await createVariantCategory.execute({
      name,
      role: role as ROLES,
    });

    sendSuccessful(response, product);
  }

  public async list(request: Request, response: Response): Promise<void> {
    const { role } = request.user;
    const { limit = 10, page = 1 } = request.query;

    const listVariantCategories = container.resolve(
      ListVariantCategoriesService,
    );

    const variantCategories = await listVariantCategories.execute({
      page: Number(page),
      limit: Number(limit),
      role: role as ROLES,
    });

    sendSuccessful(response, variantCategories);
  }
}
