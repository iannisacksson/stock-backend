import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import { sendSuccessful } from '@shared/formatters/responses';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<void> {
    const { id: user_id } = request.user;
    const { name, identifier_code } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      identifier_code,
      user_id,
    });

    sendSuccessful(response, product);
  }
}
