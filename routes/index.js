const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { compare } = require('../helpers/crypt');

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

  res.sendStatus(200);
});

module.exports = router;
