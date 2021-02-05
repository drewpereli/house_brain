require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const HASH_ALGORITHM = 'HS256';

function hash(str) {
  return bcrypt.hash(str, 10);
}

const compare = bcrypt.compare;

function signJWT(payload) {
  return jwt.sign(payload, process.env.APP_SECRET, { algorithm: HASH_ALGORITHM });
}

module.exports = { hash, compare, signJWT, HASH_ALGORITHM };
