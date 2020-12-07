import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import ListProductsService from '@modules/products/services/ListProductsService';
import ShowProductService from '@modules/products/services/ShowProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';

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

  public async list(request: Request, response: Response): Promise<void> {
    const { role } = request.user;
    const { limit = 10, page = 1 } = request.query;

    const listProducts = container.resolve(ListProductsService);

    const products = await listProducts.execute({
      limit: Number(limit),
      page: Number(page),
      role: role as ROLES,
    });

    sendSuccessful(response, products);
  }

  public async show(request: Request, response: Response): Promise<void> {
    const { role } = request.user;
    const { product_id } = request.params;

    const showProduct = container.resolve(ShowProductService);

    const product = await showProduct.execute({
      product_id,
      role: role as ROLES,
    });

    sendSuccessful(response, product);
  }

  public async delete(request: Request, response: Response): Promise<void> {
    const { role } = request.user;
    const { product_id } = request.params;

    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute({
      product_id,
      role: role as ROLES,
    });

    sendSuccessful(response, {}, 204);
  }
}
