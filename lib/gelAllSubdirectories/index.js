import fs from 'fs';

/**
 * Fetches all direct directories under a given directory.
 * @param  {String}   directory The path to the directory to scan.
 * @return {String[]}           A list of all sub-directories.
 */
const gelAllSubdirectories = (directory) => fs.readdirSync(directory).filter((file) => {
    const isHiddenFile = file.charAt(0) === '.';
    const isDirectory = fs.statSync(file).isDirectory();

    return !isHiddenFile && isDirectory;
});

export default gelAllSubdirectories;
