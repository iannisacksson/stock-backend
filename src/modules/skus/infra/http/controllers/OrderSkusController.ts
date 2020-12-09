import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrderSkusService from '@modules/skus/services/CreateOrderSkusService';
import ShowOrderSkuByProductService from '@modules/skus/services/ShowOrderSkuByProductService';

import { sendSuccessful } from '@shared/formatters/responses';
import { ROLES } from '@shared/contants/roles';

export default class OrderSkusController {
  public async create(request: Request, response: Response): Promise<void> {
    const { role } = request.user;
    const { product_id, categories } = request.body;

    const createOrderSkus = container.resolve(CreateOrderSkusService);

    const product = await createOrderSkus.execute({
      product_id,
      role: role as ROLES,
      categories,
    });

    sendSuccessful(response, product);
  }

  public async show(request: Request, response: Response): Promise<void> {
    const { role } = request.user;
    const { product_id } = request.params;

    const ShowOrderSkuByProduct = container.resolve(
      ShowOrderSkuByProductService,
    );

    const product = await ShowOrderSkuByProduct.execute({
      product_id,
      role: role as ROLES,
    });

    sendSuccessful(response, product);
  }
}
