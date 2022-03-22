import Joi from '@hapi/joi';

import validate from '../utils/validate';
import * as userService from '../services/userService';

// Validation schema
const schema = Joi.object({
  email: Joi.string().label('Email').max(90).email().required(),
  password: Joi.string().label('Password').max(90).required(),
});

/**
 * Validate create/update user request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function userValidator(req, res, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch((err) => next(err));
}

/**
 * Validate users existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function checkUserExists(req, res, next) {
  return userService
    .checkEmail(req.body.email)
    .then(() => next())
    .catch((err) => next(err));
}

export { userValidator, checkUserExists };
