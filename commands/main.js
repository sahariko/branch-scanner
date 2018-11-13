const path = require('path');
const {
    colorizeFactory,
    getAllSubdirectories,
    listDirectoryBranches,
    validateDirectory
} = require('../lib');

const colorizeBold = colorizeFactory(1);
const colorizeCyan = colorizeFactory(36);

let foundDirectories = false;

module.exports = (workingDirectory) => {
    validateDirectory(workingDirectory);

    console.log(colorizeBold(`🤖  Scanning all directories under ${workingDirectory}\n`));

    const directories = getAllSubdirectories(workingDirectory);

    if (!directories.length) {
        console.log('No directories found!');
        return;
    }

    directories.forEach(async(directory) => {
        const directoryPath = path.join(workingDirectory, directory);

        const branches = await listDirectoryBranches(directoryPath);

        if (!branches.length) return;

        console.log(colorizeCyan(`${directory} (${branches.length})`));
        console.log(branches.join('\n'), '\n');

        foundDirectories = true;
    });

    if (!foundDirectories) {
        console.log('Nothing special to see here!');
    }
};
