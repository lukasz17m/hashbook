const bodyParser = require('body-parser');
const chalk = require('chalk');
const express = require('express');
const path = require('path');

const apiRouter = require('./modules/router/api');
const config = require('./modules/config')(process.env.NODE_ENV);
const connection = require('./modules/mongoose/connection');
const log = require('./modules/utils/log');

const PORT = ((process.env.PORT || config.http.port) || 3000);

/**
 * Express
 */

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

if (process.env.NODE_ENV === 'test') {
  module.exports = app;
}
