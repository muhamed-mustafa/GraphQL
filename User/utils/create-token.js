import jwt from 'jsonwebtoken';

const createToken = (payload) =>
  jwt.sign({ userId: payload }, 'JWT_SECRET_KEY', {
    expiresIn: '2d',
  });

export { createToken };
