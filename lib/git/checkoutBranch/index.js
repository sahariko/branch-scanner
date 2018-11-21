const { execSync } = require('child_process');

/**
 * Checkouts a branch in a git directory.
 * @param  {String} directoryPath The directory's absolute path.
 */
const checkoutBranch = (directoryPath) => execSync('git stash && git checkout master', {
    cwd: directoryPath
});

module.exports = checkoutBranch;
