import { celebrate, Segments, Joi } from 'celebrate';

export const create = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    identifier_code: Joi.string().max(3).required(),
  },
});

export const showAndDelete = celebrate({
  [Segments.PARAMS]: {
    product_id: Joi.string().uuid().required(),
  },
});
