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
    .option('-r, --recursive', 'whether to keep running recursively or not. include subdirectories or not (default: false)');

program
    .command('scan')
    .description('Scans a directory for non-standard branches (default command)')
    .option('-c, --children', 'scan the directory\'s children instead of the directory itself')
    .action((cmd) => {
        const workingDirectory = getWorkingDirectory();
        const { recursive } = program;

        main(workingDirectory, recursive, {children: cmd.children});
    });

program
    .command('clean')
    .description('Clean those pesky leftover branches')
    .option('-c, --children', 'target the directory\'s children instead of the directory itself')
    .option('--worktrees', 'non-interactive: remove all worktrees without prompting')
    .option('--debug', 'print debug information')
    .action((cmd) => {
        const workingDirectory = getWorkingDirectory();
        const { recursive } = program;

        clean(workingDirectory, recursive, {children: cmd.children, removeWorktrees: cmd.worktrees, debug: cmd.debug});
    });

program.parse(process.argv);

const commandUsed = program.args.some((arg) => arg instanceof program.Command);

if (!commandUsed) {
    const workingDirectory = getWorkingDirectory();
    const { recursive } = program;

    main(workingDirectory, recursive);
}

