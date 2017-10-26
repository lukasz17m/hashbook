module.exports = (...args) => {
  if (process.env.NODE_ENV !== 'testing') {
    console.log(...args);
  }
};
