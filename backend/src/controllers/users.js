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

/**
 * Login a user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export function login(req, res, next) {
  userService
    .loginUser(req.body)
    .then((token) => res.status(HttpStatus.CREATED).json({ token }))
    .catch((err) => next(err));
}
