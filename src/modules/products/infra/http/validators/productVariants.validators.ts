import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.BODY]: {
    product_id: Joi.string().uuid().required(),
    quantity: Joi.number().required(),
    price: Joi.number().positive().required(),
    variants: Joi.array().items(Joi.string().uuid()).required(),
  },
});
