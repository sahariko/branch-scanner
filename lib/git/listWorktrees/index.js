const fs = require('fs');
const { exec } = require('child_process');
const { GIT_FOLDER_NAME } = require('../../constants');

/**
 * Lists linked worktrees for a given git directory.
 * @param  {String} directoryPath The directory's absolute path.
 * @return {Array<{branch: String, path: String}>} Linked worktrees (excludes main worktree).
 */
const listWorktrees = (directoryPath) => new Promise((resolve) => {
    if (!fs.readdirSync(directoryPath).includes(GIT_FOLDER_NAME)) return resolve([]);

    exec('git worktree list --porcelain', { cwd: directoryPath }, (error, stdout) => {
        if (error) return resolve([]);

        const entries = stdout.trim().split('\n\n');

        // First entry is the main worktree — skip it
        const worktrees = entries.slice(1).map((entry) => {
            const lines = entry.split('\n');
            const worktreePath = lines[0].replace('worktree ', '');
            const branchLine = lines.find((l) => l.startsWith('branch '));
            const branch = branchLine ? branchLine.replace('branch refs/heads/', '') : '(detached)';
            return { path: worktreePath, branch };
        });

        resolve(worktrees);
    });
});

module.exports = listWorktrees;
