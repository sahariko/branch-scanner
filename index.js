import path from 'path';
import colorizeFactory from './lib/colorizeFactory';
import gelAllSubdirectories from './lib/gelAllSubdirectories';
import listDirectoryBranches from './lib/listDirectoryBranches';

const currentDirectory = process.cwd();

const colorizeBold = colorizeFactory('\x1b[1m');

console.log(colorizeBold(`🤖  Scanning all directories under ${currentDirectory}\n`));

const directories = gelAllSubdirectories(currentDirectory);

directories.forEach((directory) => {
    const directoryPath = path.join(currentDirectory, directory);

    listDirectoryBranches(directoryPath);
});
