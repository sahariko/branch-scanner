const fs = require('fs');
const { join } = require('path');
const { exec } = require('child_process');

const GIT_FOLDER_NAME = '.git';
const IGNORED_BRANCHES = ['master'];

const currentDirectory = process.cwd();

const colorizeFactory = (color) => (text) => `${color}${text}\x1b[0m`;

const colorizeCyan = colorizeFactory('\x1b[36m');

const colorizeBold = colorizeFactory('\x1b[1m');

const listDirectoryBranches = (directory) => {
    const directoryPath = join(currentDirectory, directory);
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
            console.log(colorizeCyan(`${directory} (${branches.length})`));
            console.log(branches.join('\n'), '\n');
        }

    });
};

const directories = fs.readdirSync(currentDirectory).filter((file) => {
    const isHiddenFile = file.charAt(0) === '.';
    const isDirectory = fs.statSync(file).isDirectory();

    return !isHiddenFile && isDirectory;
});

console.log(colorizeBold(`🤖  Scanning all directories under ${currentDirectory}\n`));

directories.forEach(listDirectoryBranches);
