const express = require('express');
const router = express.Router();
const { Board } = require('../models');

router.get('/', async (req, res) => {
  let boards = await Board.findAll();
  let data = boards.map((board) => board.serialize());
  res.send({ boards: data });
});

// Each board will use this route to register itself with the brain. Doesn't need to return any data
router.post('/', async (req, res) => {
  let { boardId: id, ipAddress } = req.body;
  try {
    await Board.upsert({ id, ipAddress });
  } catch (error) {
    return res.sendStatus(400);
  }

  res.sendStatus(200);
});

module.exports = router;
