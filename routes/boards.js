require('dotenv').config();
const express = require('express');
const router = express.Router();
const { Board } = require('../models');
const { compare } = require('../helpers/crypt');

router.get('/', async (req, res) => {
  let boards = await Board.findAll();
  let data = boards.map((board) => board.serialize());
  res.send({ boards: data });
});

// Each board will use this route to register itself with the brain. Doesn't need to return any data
router.post('/register', async (req, res) => {
  let { id, ipAddress } = req.body;
  let password = req.headers.auth.split(' ')[1];

  if (!(await compare(password, process.env.BOARD_PASSWORD_HASH))) {
    return res.sendStatus(401);
  }

  try {
    await Board.upsert({ id, ipAddress });
  } catch (error) {
    return res.sendStatus(400);
  }

  res.sendStatus(200);
});

module.exports = router;
