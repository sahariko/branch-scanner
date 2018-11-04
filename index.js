#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const { version } = require('./package.json');
const { colorizeFactory, gelAllSubdirectories, listDirectoryBranches } = require('./lib');

const colorizeBold = colorizeFactory('\x1b[1m');
const colorizeCyan = colorizeFactory('\x1b[36m');

program
  .version(version)
  .option('-d, --directory [path]', 'specify a directory to scan', 'the current directory')
  .parse(process.argv);

const { directory } = program;

const currentDirectory = directory ? path.resolve(__dirname, directory) : process.cwd();

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
