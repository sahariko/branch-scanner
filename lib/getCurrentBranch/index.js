const { exec } = require('child_process');

/**
 * Gets the current branch in a git directory.
 * @param  {String}   directoryPath The directory's absolute path.
 * @return {String}                 The current active branch.
 */
const getCurrentBranch = (directoryPath) => new Promise((resolve) => {
    exec('git rev-parse --abbrev-ref HEAD', {
        cwd: directoryPath
    }, (error, stdout, stderr) => {
        if (error) throw new Error(error);
        if (stderr) throw new Error(stderr);

        resolve(stdout.trim());
    });
});

module.exports = getCurrentBranch;
