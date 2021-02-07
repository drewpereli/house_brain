require('dotenv').config();
const express = require('express');
const localtunnel = require('localtunnel');
const jwt = require('express-jwt');
const cors = require('cors');
const indexRoutes = require('./routes/index.js');
const boardRoutes = require('./routes/boards.js');
const applianceRoutes = require('./routes/appliances.js');
const errorMiddleware = require('./middleware/error.js');
const { HASH_ALGORITHM } = require('./helpers/crypt.js');

const server = express();

server.use(cors());
server.use(express.json()); // for parsing application/json

server.use(jwt({ secret: process.env.APP_SECRET, algorithms: [HASH_ALGORITHM] }).unless({ path: '/login' }));

server.use('/', indexRoutes);
server.use('/boards', boardRoutes);
server.use('/appliances', applianceRoutes);

server.use(errorMiddleware);

(async () => {
  await server.listen(process.env.SERVER_PORT);
  console.log('Server listening on port ' + process.env.SERVER_PORT);

  let tunnel = await localtunnel({
    port: process.env.SERVER_PORT,
    subdomain: process.env.SERVER_SUBDOMAIN,
  });
  console.log('Localtunnel started at ' + tunnel.url);
})();
