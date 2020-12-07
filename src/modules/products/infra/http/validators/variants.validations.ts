import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    identifier_code: Joi.string().required(),
    variant_category_id: Joi.string().uuid().required(),
  },
});
