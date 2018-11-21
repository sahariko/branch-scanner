const path = require('path');
const listDirectoryBranches = require('../git/listDirectoryBranches');
const getAllSubdirectories = require('../getAllSubdirectories');
const validateDirectory = require('../validateDirectory');

/**
 * Scan a given directory and execute a function on each subdirectory.
 * @param {Object}   options
 * @param {String}   options.workingDirectory The absolute path to the directory.
 * @param {Boolean}  options.recursive Whether the scan should run recursively or not.
 * @param {Function} options.callback The function to execute.
 */
const scanAndExecute = async ({workingDirectory, recursive = false, callback}) => {
    const isValid = validateDirectory(workingDirectory);

    if (!isValid) return;

    const directories = getAllSubdirectories(workingDirectory);

    if (!directories.length) return;

    for (let i = 0; i < directories.length; i++) {
        const directory = directories[i];
        const directoryPath = path.join(workingDirectory, directory);

        if (recursive) {
            await scanAndExecute({
                workingDirectory:directoryPath,
                recursive: true,
                callback
            });
        }

        const branches = await listDirectoryBranches(directoryPath);

        if (!branches.length) continue;

        await callback({
            recursive,
            directoryPath,
            parentDirectory: workingDirectory,
            branches
        });
    }
};

module.exports = scanAndExecute;
