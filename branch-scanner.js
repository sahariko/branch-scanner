#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const { version, description } = require('./package.json');
const { main, clean } = require('./commands');

const DIRECTORY_ARG_DEFAULT_MESSAGE = 'the current directory';

const getWorkingDirectory = () => {
    const { directory } = program;
    const directorySpecified = directory && directory !== DIRECTORY_ARG_DEFAULT_MESSAGE;
    if (!directorySpecified) return process.cwd();

    return path.resolve(process.cwd(), directory);
};

program
    .usage('[opts]')
    .description(description)
    .version(version, '-v, --version', 'print the program\'s version number')
    .option('-d, --directory [path]', 'specify a directory to scan', DIRECTORY_ARG_DEFAULT_MESSAGE);

program
    .command('scan')
    .description('Scans a directory\'s subdirectories for non-standard branches (default command)')
    .action(() => {
        const workingDirectory = getWorkingDirectory();

        main(workingDirectory);
    });

program
    .command('clean')
    .description('Clean those pesky leftover branches')
    .action(() => {
        const workingDirectory = getWorkingDirectory();

        clean(workingDirectory);
    });

program.parse(process.argv);

const commandUsed = program.args.some((arg) => arg instanceof program.Command);

if (!commandUsed) {
    const workingDirectory = getWorkingDirectory();

    main(workingDirectory);
}

