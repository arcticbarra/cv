const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

const routes = require('./config/routes');

app.use(express.json());
app.use('/', routes);

const port = 3000;
connect();

function listen() {
  app.listen(port);
  console.log('App running on port: ' + port);
}

function connect() {
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);
  return mongoose.connect(config.db, { keepAlive: 1, useNewUrlParser: true });
}
