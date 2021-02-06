const express = require('express');
const router = express.Router();
const { Appliance, Board } = require('../models');

router.get('/', async (req, res) => {
  let models = await Appliance.findAll();
  let data = await Promise.all(models.map((model) => model.serialize()));
  res.send({ appliances: data });
});

// Each board will use this route to register itself with the brain. Doesn't need to return any data
router.post('/', async (req, res, next) => {
  let {
    appliance: { name, type, board: boardId },
  } = req.body;

  let appliance, board;

  try {
    appliance = await Appliance.create({ name, type });
  } catch (error) {
    console.log(error);
    return next({ message: 'invalid request', status: 400 });
  }

  if (boardId !== null) {
    try {
      board = await Board.findByPk(boardId);

      if (!board) {
        return next({ message: 'invalid board id', status: 400 });
      }

      await appliance.setBoard(board);
    } catch (error) {
      console.log(error);
      return next({ message: 'there was an error', status: 500 });
    }
  }

  let response = { appliance: await appliance.serialize() };

  if (board) response.board = await board.serialize();

  res.status(201).send(response);
});

router.put('/:id', async (req, res, next) => {
  let {
    appliance: { name, type, board: boardId },
  } = req.body;

  let id = req.params.id;

  let appliance;

  try {
    appliance = await Appliance.findByPk(id);
  } catch (error) {
    console.log(error);
    return next({ message: 'invalid appliance id', status: 400 });
  }

  try {
    await appliance.update({ name, type });
  } catch (error) {
    console.log(error);
    return next({ message: 'invalid appliance attributes', status: 400 });
  }

  let currentBoard = await appliance.getBoard();

  let boardChanged = currentBoard ? currentBoard.id !== boardId : boardId !== null;

  let oldBoard = currentBoard;
  let newBoard;

  if (boardChanged) {
    try {
      if (boardId === null) {
        newBoard = null;
      } else {
        newBoard = await Board.findByPk(boardId);

        if (!newBoard) {
          return next({ message: 'invalid board id', status: 400 });
        }
      }

      await appliance.setBoard(newBoard);

      if (oldBoard) {
        await oldBoard.reload();
      }
    } catch (error) {
      console.log(error);
      next({ message: 'error updating board', status: 400 });
    }
  }

  let response = { appliance: await appliance.serialize() };

  if (boardChanged) {
    let boards = [];

    if (oldBoard) {
      boards.push(await oldBoard.serialize());
    }

    if (newBoard) {
      boards.push(await newBoard.serialize());
    }

    response.boards = boards;
  }

  res.status(200).send(response);
});

router.delete('/:id', async (req, res, next) => {
  let id = req.params.id;

  let appliance;

  try {
    appliance = await Appliance.findByPk(id);
  } catch (error) {
    console.log(error);
    return next({ message: 'invalid appliance id', status: 400 });
  }

  try {
    await appliance.destroy();
  } catch (error) {
    console.log(error);
    return next({ message: 'error destroying record', status: 400 });
  }

  res.status(200).send({});
});

module.exports = router;
