import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import variantCategoriesRouter from '@modules/products/infra/http/routes/variantCategories.routes';
import variantsRouter from '@modules/products/infra/http/routes/variants.routes';
import productVariantsRouter from '@modules/products/infra/http/routes/product-variants.routes';
import orderSkusRouter from '@modules/skus/infra/http/routes/orderSkus.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/products', productsRouter);
routes.use('/variant-categories', variantCategoriesRouter);
routes.use('/variants', variantsRouter);
routes.use('/product-variants', productVariantsRouter);
routes.use('/order-skus', orderSkusRouter);

export default routes;
