const fs = require('fs');
const { exec } = require('child_process');
const { GIT_FOLDER_NAME, IGNORED_BRANCHES } = require('../constants');

/**
 * Lists a given directory's git branches.
 * @param  {String}   directoryPath The directory's absolute path.
 * @return {String[]}               A list of all non-standard git branches under the provided directory.
 */
const listDirectoryBranches = (directoryPath) => {
    const directoryFiles = fs.readdirSync(directoryPath);

    if (!directoryFiles.includes(GIT_FOLDER_NAME)) {
        return new Promise((resolve) => resolve([]));
    }

    return new Promise((resolve) => {
        exec('git for-each-ref --format=\'%(refname:short)\' refs/heads', {
            cwd: directoryPath
        }, (error, stdout, stderr) => {
            if (error) throw new Error(error);
            if (stderr) throw new Error(stderr);

            const branches = stdout.split('\n').filter((branch) => {
                return (
                    branch && !IGNORED_BRANCHES.includes(branch)
                )
            });

            resolve(branches);
        });
    });
};

module.exports = listDirectoryBranches;
