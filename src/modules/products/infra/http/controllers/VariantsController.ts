import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateVariantsService from '@modules/products/services/CreateVariantsService';
import { sendSuccessful } from '@shared/formatters/responses';
import { ROLES } from '@shared/contants/roles';

export default class VariantsController {
  public async create(request: Request, response: Response): Promise<void> {
    const { role } = request.user;
    const { name, identifier_code, variant_category_id } = request.body;

    const createVariant = container.resolve(CreateVariantsService);

    const product = await createVariant.execute({
      name,
      identifier_code,
      variant_category_id,
      role: role as ROLES,
    });

    sendSuccessful(response, product);
  }
}
