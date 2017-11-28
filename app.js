const bodyParser = require('body-parser');
const compression = require('compression');
const chalk = require('chalk');
const express = require('express');
const path = require('path');

const apiRouter = require('./modules/router/api');
const config = require('./modules/config')(process.env.NODE_ENV);
// const connection = require('./modules/mongoose/connection');
const log = require('./modules/utils/log');

const port = process.env.PORT || config.http.port || 3000;

const app = express();

app.use(compression({ level: 9 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRouter);

// 500 Middleware
/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  log(chalk.bgRed('500'), chalk.red(err.stack));
  res.status(500).sendFile(path.join(__dirname, 'dist', '500.html'));
});

// Restrict direct access to *.html files
app.use((req, res, next) => {
  const { url } = req;

  if (new RegExp(/\/.+\.html/).test(url)) {
    res.status(403).sendFile(path.join(__dirname, 'dist', '403.html'));
  }
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), {
    headers: { 'X-UA-Compatible': 'IE=edge,chrome=1' },
  });
});

app.use(express.static('dist'));

// 404 Middleware
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'dist', '404.html'));
});

// connection.once('open', () => {
//   app.listen(port, () => log(
//     chalk.bgBlue('HTTP'),
//     chalk.blue(`Listening on ${port}…`),
//   ));
// });

app.listen(port, () => log(
  chalk.bgBlue('HTTP'),
  chalk.blue(`Listening on ${port}…`),
));

if (process.env.NODE_ENV === 'test') {
  module.exports = app;
}
