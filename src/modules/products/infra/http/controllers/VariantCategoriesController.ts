import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateVariantCategoryService from '@modules/products/services/CreateVariantCategoryService';
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
}
