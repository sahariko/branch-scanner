#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const { version, description } = require('./package.json');
const { main } = require('./commands');

const DIRECTORY_ARG_DEFAULT_MESSAGE = 'the current directory';

program
    .usage('[opts]')
    .description(description)
    .version(version, '-v, --version', 'Print the program\'s version number')
    .option('-d, --directory [path]', 'specify a directory to scan', DIRECTORY_ARG_DEFAULT_MESSAGE);

const { directory } = program;
const directorySpecified = directory && directory !== DIRECTORY_ARG_DEFAULT_MESSAGE;
const workingDirectory = directorySpecified ? path.resolve(__dirname, directory) : process.cwd();

program.parse(process.argv);

main(workingDirectory);
