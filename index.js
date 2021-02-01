require('dotenv').config();
const express = require('express');
const localtunnel = require('localtunnel');

const server = express();

server.use(express.json()); // for parsing application/json

server.post('/register_device', async (req, res) => {
    console.log(req.body);
    res.send('foo');
});


server.listen(process.env.SERVER_PORT);

localtunnel({ port: process.env.SERVER_PORT, subdomain: process.env.SERVER_SUBDOMAIN });