const express = require('express');
const chalk = require('chalk');
const path = require('path');

const apiRouter = require('./modules/router/api');
const config = require('./modules/config')(process.env.NODE_ENV);
const connection = require('./modules/mongoose/connection');
const log = require('./modules/log');

const PORT = ((process.env.PORT || config.http.port) || 3000);

/**
 * Express
 */

const app = express();

app.use(express.static('dist'));
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'), {
    headers: {
      'X-UA-Compatible': 'IE=edge',
    },
  });
});

// 404 Middleware
app.use((req, res) => res.redirect('/'));

/**
 * Mongoose
 */

connection.once('open', () => {
  // HTTP listen
  app.listen(PORT, () => log(
    chalk.bgBlue('HTTP'),
    chalk.blue(`Listening on ${PORT}…`),
  ));
});

// Process termination — Disconnect from MongoDB
// Not sure if this is necessary…
// const exitHandler = () => {
//   connection.close(() => {
//     log.info('MONGODB', 'Mongoose disconnected on app termination');
//
//     process.exit(0);
//   });
// }
// process.on('SIGINT', exitHandler.bind(null));
// process.on('SIGUSR1', exitHandler.bind(null));
// process.on('SIGUSR2', exitHandler.bind(null));

if (process.env.NODE_ENV === 'testing') {
  module.exports = app;
}
