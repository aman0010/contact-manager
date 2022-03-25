import Joi from '@hapi/joi';

import validate from '../utils/validate';
import * as contactService from '../services/contactService';

// Validation schema
const schema = Joi.object({
  name: Joi.string().label('Name').max(90).required(),
  phone: Joi.array().label('Phone'),
  photograph: Joi.string().label('photograph').max(90),
  email: Joi.string().label('email').max(90),
  address: Joi.string().label('address').max(90),
  favourite: Joi.string().label('favourite').max(90),
});

/**
 * Validate create/update contact request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function contactValidator(req, res, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate contact existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findContact(req, res, next) {
  return contactService
    .getContact(req.params.id, req.user.id)
    .then(() => next())
    .catch((err) => next(err));
}

export { contactValidator, findContact };
