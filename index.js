require('dotenv').config();
const express = require('express');
const localtunnel = require('localtunnel');
const { Board } = require('./models');

const server = express();

server.use(express.json()); // for parsing application/json

server.post('/register_device', async (req, res) => {
  let { boardId: id, ipAddress } = req.body;
  await Board.create({ id, ipAddress });
  res.sendStatus(200);
});

(async () => {
  await server.listen(process.env.SERVER_PORT);
  console.log('Server listening on port ' + process.env.SERVER_PORT);

  let tunnel = await localtunnel({
    port: process.env.SERVER_PORT,
    subdomain: process.env.SERVER_SUBDOMAIN,
  });
  console.log('Localtunnel started at ' + tunnel.url);
})();
