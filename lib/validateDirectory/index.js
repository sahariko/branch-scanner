const fs = require('fs');

const { IGNORED_DIRECTORIES } = require('../constants');
const colorizeFactory = require('../colorizeFactory');

const colorizeRed = colorizeFactory(31);

const validateDirectory = (directoryPath, recursive = false) => {
    if (!fs.existsSync(directoryPath)) {
        throw new Error(colorizeRed(`The directory you specified (${directoryPath}) does not exist.`));
    }

    for (let i = 0; i < IGNORED_DIRECTORIES.length; i++) {
        if (directoryPath.includes(IGNORED_DIRECTORIES[i])) return false;
    }

    const isSymlink = recursive && fs.lstatSync(directoryPath).isSymbolicLink();

    return !isSymlink;
};

module.exports = validateDirectory;
