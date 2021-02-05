const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { compare, signJWT } = require('../helpers/crypt');

router.post('/login', async (req, res, next) => {
  let user;

  try {
    user = await User.findOne({ where: { username: req.body.username } });
  } catch (error) {
    return next({ message: 'invalid username', status: 401 });
  }

  if (!(await compare(req.body.password, user.password))) {
    return next({ message: 'incorrect password', status: 401 });
  }

  let serializedUser = user.serialize();
  let token = await signJWT(serializedUser);

  res.status(200).send({ ...serializedUser, token });
});

module.exports = router;
