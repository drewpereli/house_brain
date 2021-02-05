const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { compare } = require('../helpers/crypt');

router.post('/login', async (req, res) => {
  let user = await User.findOne({ where: { username: req.body.username } });
  let passwordCorrect = await compare(req.body.password, user.password);

  if (passwordCorrect) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
