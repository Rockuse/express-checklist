/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */

const jwt = require('jsonwebtoken');
const { env } = require('./config');

const generateAccessToken = (data) => jwt.sign(data, env('TOKEN_SECRET'), { expiresIn: '1800s' });

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, env('TOKEN_SECRET'), (err, user) => {
      console.log(err);

      if (err) return res.status(403).json({ message: 'Auth Error' });

      req.user = user;

      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: 'Token Expired' });
  }
};

module.exports = { generateAccessToken, authenticateToken };
