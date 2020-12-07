import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateVariantsService from '@modules/products/services/CreateVariantsService';
import ListVariantsService from '@modules/products/services/ListVariantsService';

import { sendSuccessful } from '@shared/formatters/responses';
import { ROLES } from '@shared/contants/roles';

export default class VariantsController {
  public async create(request: Request, response: Response): Promise<void> {
    const { role } = request.user;
    const { name, identifier_code, variant_category_id } = request.body;

    const createVariant = container.resolve(CreateVariantsService);

    const variantCategories = await createVariant.execute({
      name,
      identifier_code,
      variant_category_id,
      role: role as ROLES,
    });

    sendSuccessful(response, variantCategories);
  }

  public async list(request: Request, response: Response): Promise<void> {
    const { role } = request.user;
    const { limit = 10, page = 1, variant_category_id } = request.query;

    const listVariants = container.resolve(ListVariantsService);

    const variantCategories = await listVariants.execute({
      page: Number(page),
      limit: Number(limit),
      role: role as ROLES,
      variant_category_id: variant_category_id as string,
    });

    sendSuccessful(response, variantCategories);
  }
}
