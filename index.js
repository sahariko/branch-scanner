import path from 'path';
import colorizeFactory from './lib/colorizeFactory';
import gelAllSubdirectories from './lib/gelAllSubdirectories';
import listDirectoryBranches from './lib/listDirectoryBranches';

const currentDirectory = process.cwd();

const colorizeBold = colorizeFactory('\x1b[1m');
const colorizeCyan = colorizeFactory('\x1b[36m');

console.log(colorizeBold(`🤖  Scanning all directories under ${currentDirectory}\n`));

const directories = gelAllSubdirectories(currentDirectory);

directories.forEach(async (directory) => {
    const directoryPath = path.join(currentDirectory, directory);

    const branches = await listDirectoryBranches(directoryPath);

    if (branches.length) {
        console.log(colorizeCyan(`${directory} (${branches.length})`));
        console.log(branches.join('\n'), '\n');
    }
});
