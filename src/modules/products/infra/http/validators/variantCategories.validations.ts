import { celebrate, Segments, Joi } from 'celebrate';

export const create = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
  },
});
