import Boom from '@hapi/boom';
import bcrypt from 'bcryptjs';

import User from '../models/user';

/**
 * Create new user.
 *
 * @param   {Object}  user
 * @returns {Promise}
 */
export function createUser(user) {
  const hashedPassword = bcrypt.hashSync(user.password, 10);

  return new User({
    email: user.email,
    password: hashedPassword,
  }).save();
}

/**
 * Check email exists.
 *
 * @param   {String}  email
 * @returns {Promise}
 */
export function checkEmail(email) {
  return new User()
    .where('email', email)
    .count()
    .then((count) => {
      if (count === 0) return true;
      else throw Boom.conflict('User already exists');
    })
    .catch();
}
