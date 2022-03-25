import Boom from '@hapi/boom';
import jwt from 'jsonwebtoken';

export const verifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(Boom.unauthorized('Authentication info not found'));
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.Secret, (err, payload) => {
    if (err) return next(Boom.unauthorized(err.message));

    req.user = payload;
    next();
  });
};
