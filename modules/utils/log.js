module.exports = (...args) => {
  if (process.env.NODE_ENV !== 'test') {
    /* eslint-disable no-console */
    console.log(...args);
  }
};
