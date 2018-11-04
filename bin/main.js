const path = require('path');
const { colorizeFactory, gelAllSubdirectories, listDirectoryBranches } = require('../lib');

const colorizeBold = colorizeFactory('\x1b[1m');
const colorizeCyan = colorizeFactory('\x1b[36m');

module.exports = () => {
    const currentDirectory = process.cwd();

    console.log(colorizeBold(`🤖  Scanning all directories under ${currentDirectory}\n`));

    const directories = gelAllSubdirectories(currentDirectory);

    directories.forEach((directory) => {
        const directoryPath = path.join(currentDirectory, directory);

        listDirectoryBranches(directoryPath)
            .then((branches) => {
                if (branches.length) {
                    console.log(colorizeCyan(`${directory} (${branches.length})`));
                    console.log(branches.join('\n'), '\n');
                }
            });
    });
};
