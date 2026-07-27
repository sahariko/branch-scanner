const path = require('path');
const listDirectoryBranches = require('../git/listDirectoryBranches');
const listWorktrees = require('../git/listWorktrees');
const getAllSubdirectories = require('../getAllSubdirectories');
const validateDirectory = require('../validateDirectory');

/**
 * Scan a given directory and execute a function on each subdirectory.
 * @param {Object}   options
 * @param {String}   options.workingDirectory The absolute path to the directory.
 * @param {Boolean}  options.recursive Whether the scan should run recursively or not.
 * @param {Function} options.callback The function to execute.
 */
const scanAndExecute = async ({workingDirectory, recursive = false, children = false, callback}) => {
    const isValid = validateDirectory(workingDirectory);

    if (!isValid) return;

    const directories = children
        ? getAllSubdirectories(workingDirectory)
        : [path.basename(workingDirectory)];

    if (!directories.length) return;

    for (let i = 0; i < directories.length; i++) {
        const directory = directories[i];
        const directoryPath = children
            ? path.join(workingDirectory, directory)
            : workingDirectory;

        if (recursive) {
            await scanAndExecute({
                workingDirectory: directoryPath,
                recursive: true,
                children: true,
                callback
            });
        }

        const [allBranches, worktrees] = await Promise.all([
            listDirectoryBranches(directoryPath),
            listWorktrees(directoryPath)
        ]);

        const worktreeBranches = new Set(worktrees.map((wt) => wt.branch));
        const branches = allBranches.filter((b) => !worktreeBranches.has(b));

        if (!branches.length && !worktrees.length) continue;

        await callback({
            recursive,
            directoryPath,
            parentDirectory: workingDirectory,
            branches,
            worktrees
        });
    }
};

module.exports = scanAndExecute;
