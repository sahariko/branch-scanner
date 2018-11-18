/**
 * The system's git folder name.
 * @type {String}
 */
exports.GIT_FOLDER_NAME = '.git';

/**
 * A list of default branches to ignore, since we assume they will always exist.
 * @type {String[]}
 */
exports.IGNORED_BRANCHES = ['master'];

/**
 * A list of directories not worth scanning.
 * @type {String[]}
 */
exports.IGNORED_DIRECTORIES = [
    'node_modules',
    'github.com',
    'tmp',
    'etc',
    'gopkg'
];
