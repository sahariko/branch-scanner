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

module.exports = async (workingDirectory) => {
    validateDirectory(workingDirectory);

    console.log(colorizeBold(`🤖  Scanning all directories under ${workingDirectory}\n`));

    const directories = getAllSubdirectories(workingDirectory);

    if (!directories.length) {
        console.log('No directories found!');
        return;
    }

    for (let i = 0; i < directories.length; i++) {
        const directory = directories[i];
        const directoryPath = path.join(workingDirectory, directory);

        const branches = await listDirectoryBranches(directoryPath);

        if (!branches.length) return;

        console.log(colorizeCyan(`${directory} (${branches.length})`));
        console.log(branches.join('\n'), '\n');

        foundDirectories = true;
    }

    if (!foundDirectories) {
        console.log('Nothing special to see here!');
    }
};
