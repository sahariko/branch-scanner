const fs = require('fs');
const path = require('path');

/**
 * Fetches all direct directories under a given directory.
 * @param  {String}   directory The path to the directory to scan.
 * @return {String[]}           A list of all sub-directories.
 */
const gelAllSubdirectories = (directory) => fs.readdirSync(directory).filter((file) => {
    const isHiddenFile = file.charAt(0) === '.';
    const filePath = path.join(directory, file);
    const isDirectory = fs.statSync(filePath).isDirectory();

    return !isHiddenFile && isDirectory;
});

module.exports = gelAllSubdirectories;
