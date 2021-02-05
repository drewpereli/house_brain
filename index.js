require('dotenv').config();
const express = require('express');
const indexRoutes = require('./routes/index.js');
const boardRoutes = require('./routes/boards.js');
const errorMiddleware = require('./middleware/error.js');

const server = express();

server.use(express.json()); // for parsing application/json

server.use('/', indexRoutes);
server.use('/boards', boardRoutes);

server.use(errorMiddleware);

(async () => {
  await server.listen(process.env.SERVER_PORT);
  console.log('Server listening on port ' + process.env.SERVER_PORT);
})();
