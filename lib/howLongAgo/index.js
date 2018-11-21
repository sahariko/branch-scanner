const {
    HOUR_IN_MS,
    MINUTE_IN_MS,
    DAY_IN_MS,
    MONTH_IN_MS,
    WEEK_IN_MS,
    YEAR_IN_MS,
    TIME_MAPPING
} = require('./constants');

const getPlural = (amount) => amount > 1 ? 's' : '';

const createPrettyDate = (time, period) => {
    const {
        divisor,
        text
    } = TIME_MAPPING[period];

    const roundedDate = Math.round(time / divisor);
    const plural = getPlural(roundedDate);
    return `${roundedDate} ${text.replace('%', plural)}`;
};

/**
 * return the time that has passed since the current time
 * @param  {Date|Number|String} date Point in time to describe in words. Ticks can be accepted as a number or string.
 * @return {String} Descriptive, relative time
 */
const howLongAgo = (date = new Date()) => {
    const now = Date.now();
    const t = now - date;

    if (Number.isNaN(t)) return '';
    if (t < MINUTE_IN_MS) return 'Just Now';
    if (t < HOUR_IN_MS) return createPrettyDate(t, 'minutes');
    if (t < DAY_IN_MS) return createPrettyDate(t, 'hours');
    if (t < WEEK_IN_MS) return createPrettyDate(t, 'days');
    if (t < MONTH_IN_MS) return createPrettyDate(t, 'weeks');
    if (t < YEAR_IN_MS) return createPrettyDate(t, 'months');
    return createPrettyDate(t, 'years');
};

module.exports = howLongAgo;
