import { celebrate, Segments, Joi } from 'celebrate';
import { PRIORITIES } from '@shared/contants/priorities';

export const create = celebrate({
  [Segments.BODY]: {
    product_id: Joi.string().uuid().required(),
    categories: Joi.array()
      .items(
        Joi.object().keys({
          variant_category_id: Joi.string().uuid().required(),
          priority: Joi.string().valid(
            PRIORITIES.ONE,
            PRIORITIES.TWO,
            PRIORITIES.THREE,
          ),
        }),
      )
      .required(),
  },
});
