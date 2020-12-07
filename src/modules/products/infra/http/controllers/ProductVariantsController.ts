import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductVariantsService from '@modules/products/services/CreateProductVariantService';
import { sendSuccessful } from '@shared/formatters/responses';
import { ROLES } from '@shared/contants/roles';

export default class ProductVariantsController {
  public async create(request: Request, response: Response): Promise<void> {
    const { role } = request.user;
    const { product_id, variants, price, quantity } = request.body;

    const createProductVariant = container.resolve(
      CreateProductVariantsService,
    );

    const product = await createProductVariant.execute({
      product_id,
      variants,
      price,
      quantity,
      role: role as ROLES,
    });

    sendSuccessful(response, product);
  }
}
