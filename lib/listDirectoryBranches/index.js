import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { GIT_FOLDER_NAME, IGNORED_BRANCHES } from '../constants';
import colorizeFactory from '../colorizeFactory';

const colorizeCyan = colorizeFactory('\x1b[36m');

/**
 * Lists a given directory's git branches.
 * @param {String} directoryPath The directory's absolute path.
 */
const listDirectoryBranches = (directoryPath) => {
    const directoryName = path.basename(directoryPath);
    const directoryFiles = fs.readdirSync(directoryPath);

    if (!directoryFiles.includes(GIT_FOLDER_NAME)) return;

    exec('git for-each-ref --format=\'%(refname:short)\' refs/heads', {
        cwd: directoryPath
    }, (error, stdout, stderr) => {
        if (error) throw new Error(error);
        if (stderr) throw new Error(stderr);

        const branches = stdout.split('\n').filter((branch) => (
            branch && !IGNORED_BRANCHES.includes(branch)
        ));

        if (branches.length) {
            console.log(colorizeCyan(`${directoryName} (${branches.length})`));
            console.log(branches.join('\n'), '\n');
        }

    });
};

export default listDirectoryBranches;
