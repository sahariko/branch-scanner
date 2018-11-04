const { COLOR_CLOSING_TAG } = require('./constants');

/**
 * Generates a text colorization function, which in turn wraps the provided text in the specified color.
 * @param {String|Number} color The generated function's intended color. @see https://misc.flogisoft.com/bash/tip_colors_and_formatting
 * @return {Function}
 * @example
 * const colorizeCyan = colorizeFactory(36);
 * colorizeCyan('yo'); // Would be printed out in cyan.
 */
const colorizeFactory = (color) => (text) => [
    `\x1b[${color}m`,
    text,
    COLOR_CLOSING_TAG
].join('');

module.exports = colorizeFactory;
