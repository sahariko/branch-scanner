const fs = require('fs');

const colorizeFactory = require('../colorizeFactory');

const colorizeRed = colorizeFactory(31);

const validateDirectory = (directoryPath) => {
    if (!fs.existsSync(directoryPath)) {
        throw new Error(colorizeRed(`The directory you specified (${directoryPath}) does not exist.`));
    }
};

module.exports = validateDirectory;
