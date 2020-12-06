import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.BODY]: {
    product_id: Joi.string().uuid().required(),
    variant_id: Joi.string().uuid().required(),
  },
});
