/**
 * Generates a text colorization function, which in turn wraps the provided text in the specified color.
 * @param {String} color The generated function's intended color. @see https://misc.flogisoft.com/bash/tip_colors_and_formatting
 * @example
 * const colorizeCyan = colorizeFactory('\x1b[36m');
 * colorizeCyan('yo'); // Would be printed out in cyan.
 */
const colorizeFactory = (color) => (text) => `${color}${text}\x1b[0m`;

export default colorizeFactory;
