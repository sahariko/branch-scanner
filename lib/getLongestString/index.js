/**
 * Gets the longest string in an array of strings.
 * @param  {String[]} array The array to check.
 * @return {String}         The longest string
 */
const getLongestString = (array) => array.reduce((a, b) => a.length > b.length ? a : b);

module.exports = getLongestString;
