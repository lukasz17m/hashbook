'use strict';

const log = require('npmlog');
const mongoose = require('mongoose');

const config = require('../config')(process.env.NODE_ENV).mongoose;
const { host, name } = config.database;

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${host}/${name}`, config.options);

// MongoDB events handlers
let timeoutId = null;

mongoose.connection.on('error', (error) => {
  log.error('MONGODB', error);
}).on('disconnected', () => {
  log.warn('MONGODB', 'Mongoose disconnected\nTrying to reconnect…');

  // Wait for reconnect
  timeoutId = setTimeout(() => {
    log.error('MONGODB', 'Couldn’t reconnect to MongoDB — app terminated.');

    // Exit with error code
    process.exit(1);
  }, config.reconnectTimeoutMS);
}).on('connected', () => {
  log.info('MONGODB', 'Mongoose connected');

  if (timeoutId) {
    clearTimeout(timeoutId);
  }
});

module.exports = mongoose.connection;
