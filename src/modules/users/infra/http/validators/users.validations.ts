import { celebrate, Segments, Joi } from 'celebrate';
import { ROLES } from '@shared/contants/roles';

export const create = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid(ROLES.ADMIN, ROLES.USER).required(),
  },
});
