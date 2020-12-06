import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import { sendSuccessful } from '@shared/formatters/responses';
import { ROLES } from '@shared/contants/roles';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<void> {
    const { role } = request.user;
    const { name, identifier_code } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      identifier_code,
      role: role as ROLES,
    });

    sendSuccessful(response, product);
  }
}
