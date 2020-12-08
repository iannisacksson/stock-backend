import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListSkusService from '@modules/skus/services/ListSkusService';

import { sendSuccessful } from '@shared/formatters/responses';
import { ROLES } from '@shared/contants/roles';

export default class SkusController {
  public async list(request: Request, response: Response): Promise<void> {
    const { role } = request.user;
    const { limit = 10, page = 1 } = request.query;

    const listSkus = container.resolve(ListSkusService);

    const product = await listSkus.execute({
      limit: Number(limit),
      page: Number(page),
      role: role as ROLES,
    });

    sendSuccessful(response, product);
  }
}
