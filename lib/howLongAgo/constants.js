/**
 * How many milliseconds are in a second.
 * @type {Number}
 */
const SECOND_IN_MS = 1000;

/**
 * How many milliseconds are in a minute.
 * @type {Number}
 */
const MINUTE_IN_MS = 60 * SECOND_IN_MS;

/**
 * How many milliseconds are in an hour.
 * @type {Number}
 */
const HOUR_IN_MS = 60 * MINUTE_IN_MS;

/**
 * How many milliseconds are in a day.
 * @type {Number}
 */
const DAY_IN_MS = 24 * HOUR_IN_MS;

/**
 * How many milliseconds are in a week.
 * @type {Number}
 */
const WEEK_IN_MS = 7 * DAY_IN_MS;

/**
 * How many milliseconds are in a month.
 * @type {Number}
 */
const MONTH_IN_MS = 30 * DAY_IN_MS;

/**
 * How many milliseconds are in a year.
 * @type {Number}
 */
const YEAR_IN_MS = 365 * DAY_IN_MS;

/**
 * A time map containing each periods appropriate divisor and text.
 * @type {Object}
 */
const TIME_MAPPING = {
    minutes: {
        divisor: MINUTE_IN_MS,
        text: 'Minute% Ago'
    },
    hours: {
        divisor: HOUR_IN_MS,
        text: 'Hour% Ago'
    },
    days: {
        divisor: DAY_IN_MS,
        text: 'Day% Ago'
    },
    weeks: {
        divisor: WEEK_IN_MS,
        text: 'Week% Ago'
    },
    months: {
        divisor: MONTH_IN_MS,
        text: 'Month% Ago'
    },
    years: {
        divisor: YEAR_IN_MS,
        text: 'Year% Ago'
    }
};

module.exports = {
    HOUR_IN_MS,
    MINUTE_IN_MS,
    DAY_IN_MS,
    MONTH_IN_MS,
    WEEK_IN_MS,
    YEAR_IN_MS,
    TIME_MAPPING
};
