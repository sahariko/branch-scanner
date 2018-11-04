#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const { version } = require('./package.json');
const {
    colorizeFactory,
    gelAllSubdirectories,
    listDirectoryBranches,
    validateDirectory
} = require('./lib');

const colorizeBold = colorizeFactory(1);
const colorizeCyan = colorizeFactory(36);

program
  .version(version)
  .option('-d, --directory [path]', 'specify a directory to scan', 'the current directory')
  .parse(process.argv);

const { directory } = program;
const workingDirectory = directory ? path.resolve(__dirname, directory) : process.cwd();

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
