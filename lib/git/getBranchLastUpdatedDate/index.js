const { exec } = require('child_process');

/**
 * Fetches a specific branch's last updated date in a git directory.
 * @param  {String} branch        The branch to check.
 * @param  {String} directoryPath The directory's absolute path.
 */
const getBranchLastUpdatedDate = (branch, directoryPath) => new Promise((resolve) => {
    exec(`git show ${branch} -s --format=%at`, {
        cwd: directoryPath
    }, (error, stdout, stderr) => {
        if (error) throw new Error(error);
        if (stderr) throw new Error(stderr);

        resolve(stdout.trim());
    });
});

module.exports = getBranchLastUpdatedDate;
