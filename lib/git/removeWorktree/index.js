const fs = require('fs');
const { exec, execSync } = require('child_process');

/**
 * Removes a linked worktree by deleting its directory and pruning the metadata.
 * Uses shell `rm -rf` instead of fs.promises.rm — faster on macOS for large trees (node_modules etc).
 * Avoids `git worktree remove` which triggers submodule network operations on large monorepos.
 * @param  {String} worktreePath  The absolute path to the worktree to remove.
 * @param  {String} directoryPath The main repo's absolute path.
 */
const removeWorktree = (worktreePath, directoryPath) => new Promise((resolve, reject) => {
    if (!fs.existsSync(worktreePath)) {
        execSync('git worktree prune', { cwd: directoryPath, stdio: 'pipe' });
        return resolve();
    }

    exec(`rm -rf "${worktreePath}"`, (error) => {
        if (error) return reject(error);

        execSync('git worktree prune', { cwd: directoryPath, stdio: 'pipe' });
        resolve();
    });
});

module.exports = removeWorktree;
