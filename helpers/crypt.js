const bcrypt = require('bcrypt');

function hash(str) {
  return bcrypt.hash(str, 10);
}

const compare = bcrypt.compare;

module.exports = { hash, compare };
