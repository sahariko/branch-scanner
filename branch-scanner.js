#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const { version, description } = require('./package.json');
const { main, clean } = require('./commands');

const getWorkingDirectory = () => {
    const { directory } = program;

    return directory ? path.resolve(process.cwd(), directory) : process.cwd();
};

program
    .usage('[opts]')
    .description(description)
    .version(version, '-v, --version', 'print the program\'s version number')
    .option('-d, --directory [path]', 'specify a directory to scan (default: the current directory)')
    .option('-r, --recursive', 'whether to include subdirectories or not (default: false)');

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
    const { recursive } = program;

    main(workingDirectory, recursive);
}

