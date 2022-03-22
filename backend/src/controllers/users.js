import HttpStatus from 'http-status-codes';

import * as userService from '../services/userService';

/**
 * Create a new user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function create(req, res, next) {
  userService
    .createUser(req.body)
    .then((data) => res.status(HttpStatus.CREATED).json({ data }))
    .catch((err) => next(err));
}
