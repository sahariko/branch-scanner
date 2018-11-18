const path = require('path');
const {
    colorizeFactory,
    scanAndExecute
} = require('../lib');

const colorizeBold = colorizeFactory(1);
const colorizeCyan = colorizeFactory(36);

let foundDirectories = false;

/**
 * Scan a given directory for non-standard git branches and prints them to the console.
 * @param {Object}   options
 * @param {Boolean}  options.recursive Whether the scan should run recursively or not.
 * @param {String}   options.directoryPath The absolute path to the directory.
 * @param {String[]} options.branches The directory's branches.
 */
const scanDirectory = async ({recursive = false, directoryPath, branches} = {}) => {
    const directory = path.basename(directoryPath);
    const directoryName = recursive ? directoryPath : directory;

    console.log(colorizeCyan(`${directoryName} (${branches.length})`));
    console.log(branches.join('\n'), '\n');

    foundDirectories = true;
};

module.exports = async (workingDirectory, recursive = false) => {
    console.log(colorizeBold(`🤖  Scanning all directories under ${workingDirectory}\n`));

    await scanAndExecute({
        workingDirectory,
        recursive,
        callback: scanDirectory
    });

    if (!foundDirectories) {
        console.log('Nothing special to see here!');
    }
};
