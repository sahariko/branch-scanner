const path = require('path');
const {
    colorizeFactory,
    gelAllSubdirectories,
    listDirectoryBranches,
    validateDirectory
} = require('../lib');

const colorizeBold = colorizeFactory(1);
const colorizeCyan = colorizeFactory(36);

module.exports = (workingDirectory) => {
    validateDirectory(workingDirectory);

    console.log(colorizeBold(`🤖  Scanning all directories under ${workingDirectory}\n`));

    const directories = gelAllSubdirectories(workingDirectory);

    directories.forEach((directory) => {
        const directoryPath = path.join(workingDirectory, directory);

        listDirectoryBranches(directoryPath)
            .then((branches) => {
                if (branches.length) {
                    console.log(colorizeCyan(`${directory} (${branches.length})`));
                    console.log(branches.join('\n'), '\n');
                }
            });
    });
};
