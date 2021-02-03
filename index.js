require('dotenv').config();
const express = require('express');
// const localtunnel = require('localtunnel');
const boardRoutes = require('./routes/boards.js');

const server = express();

server.use(express.json()); // for parsing application/json

server.use('/boards', boardRoutes);

server.get('/', (req, res) => res.send('yeah'));

(async () => {
  await server.listen(process.env.SERVER_PORT);
  console.log('Server listening on port ' + process.env.SERVER_PORT);

  // let tunnel = await localtunnel({
  //   port: process.env.SERVER_PORT,
  //   subdomain: process.env.SERVER_SUBDOMAIN,
  // });
  // console.log('Localtunnel started at ' + tunnel.url);
})();
