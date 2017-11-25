const mongoose = require('mongoose');
const chalk = require('chalk');

const log = require('../utils/log');
const { mongoose: config } = require('../config')(process.env.NODE_ENV);

const { host, name } = config.database;

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${host}/${name}`, config.options);

// MongoDB events handlers
let timeoutId = null;

mongoose.connection.on('error', (error) => {
  log(chalk.bgRed('MONGODB'), error);
}).on('disconnected', () => {
  log(
    chalk.bgYellow('MONGODB'),
    chalk.yellow('Mongoose disconnected\nTrying to reconnect…'),
  );

  // Wait for reconnect
  timeoutId = setTimeout(() => {
    log(
      chalk.bgRed('MONGODB'),
      chalk.red('Couldn’t reconnect to MongoDB — app terminated.'),
    );

    // Exit with error code
    process.exit(1);
  }, config.reconnectTimeoutMS);
}).on('connected', () => {
  log(chalk.bgGreen('MONGODB'), chalk.green('Mongoose connected'));

  if (timeoutId) {
    clearTimeout(timeoutId);
  }
});

module.exports = mongoose.connection;
