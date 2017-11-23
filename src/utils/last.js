/**
* Returns the last element of the array.
*
* @param  {Array} arr
* @return {Mixed}
*/
const last = (arr) => {
  if (arr === null || typeof arr === 'undefined' || arr.constructor !== Array) {
    throw TypeError('First parameter must be an array');
  }

  const { length } = arr;

  return arr[length - 1];
};

export default last;
