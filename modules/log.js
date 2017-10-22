'use strict';

module.exports = (...args) => {
  if (process.env.NODE_ENV !== 'testing') {
    console.log.apply(null, args);
  }
}
