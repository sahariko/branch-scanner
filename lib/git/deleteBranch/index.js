const { execSync } = require('child_process');

/**
 * Deletes a specific branch in a git directory.
 * @param  {String} branch        The branch to delete.
 * @param  {String} directoryPath The directory's absolute path.
 */
const deleteBranch = (branch, directoryPath) => execSync(`git branch -D ${branch}`, {
    cwd: directoryPath
});

module.exports = deleteBranch;
