/**
* Returns true if expression contains any given word.
*
* @param  {String} expression
* @param  {String} ...words
* @return {Boolean}
*/
const contains = (expression, ...words) => {
  if (expression.constructor !== String) {
    throw TypeError('First parameter must be a string');
  }

  return words.some((word) => {
    if (word.constructor !== String) {
      const msg = 'The second and every following parameter must be a string';
      throw TypeError(msg);
    }

    if (expression.includes(word)) {
      return true;
    }
    return false;
  });
};

export default contains;
