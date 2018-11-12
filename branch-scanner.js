#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const { version, description } = require('./package.json');
const { main } = require('./commands');

const DIRECTORY_ARG_DEFAULT_MESSAGE = 'the current directory';

program
    .usage('[opts]')
    .description(description)
    .version(version, '-v, --version', 'print the program\'s version number')
    .option('-d, --directory [path]', 'specify a directory to scan', DIRECTORY_ARG_DEFAULT_MESSAGE);

program.parse(process.argv);

const { directory } = program;
const directorySpecified = directory && directory !== DIRECTORY_ARG_DEFAULT_MESSAGE;
const workingDirectory = directorySpecified ? path.resolve(process.cwd(), directory) : process.cwd();

main(workingDirectory);
