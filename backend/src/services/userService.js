import Boom from '@hapi/boom';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

/**
 * Login a email.
 *
 * @param   {Object}  user
 * @returns {Promise}
 */
export function loginUser(user) {
  return new User()
    .where('email', user.email)
    .fetch()
    .then((model) => {
      return bcrypt.compare(user.password, model.get('password')).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: model.get('id'),
            email: model.get('email'),
            name: model.get('name'),
          };

          return jwt.sign(payload, process.env.Secret, { expiresIn: 60 * 60 * 60 });
        } else {
          throw Boom.unauthorized('Password did not match');
        }
      });
    })
    .catch(User.NotFoundError, () => {
      throw Boom.unauthorized('User not found');
    });
}
