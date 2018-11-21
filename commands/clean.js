const path = require('path');
const inquirer = require('inquirer');
const {
    colorizeFactory,
    clearConsole,
    git,
    scanAndExecute
} = require('../lib');

const colorizeBold = colorizeFactory(1);
const colorizeCyan = colorizeFactory(36);

/**
 * Interactively cleans a given directory from non-standard git branches.
 * @param {Object}   options
 * @param {Boolean}  options.recursive Whether the scan should run recursively or not.
 * @param {String}   options.directoryPath The absolute path to the directory.
 * @param {String[]} options.branches The directory's branches.
 */
const cleanDirectory = async ({directoryPath, parentDirectory, branches} = {}) => {
    console.log('asdas');
    clearConsole();

    const generalMessage = colorizeBold(`🤖  Scanning all directories under ${parentDirectory}\n`);
    const directory = path.basename(directoryPath);

    console.log(generalMessage);
    console.log(colorizeBold('Cleaning'), colorizeCyan(`${directory}\n`));

    const currentBranch = await git.getCurrentBranch(directoryPath);

    const answers = await inquirer
        .prompt([
            {
                name: 'branches',
                message: 'Which branches do you want to clean?',
                type: 'checkbox',
                pageSize: '20',
                choices: branches
            },
        ]);


    answers.branches.forEach((branch) => {
        try {
            if (branch === currentBranch) {
                git.checkoutBranch(directoryPath);
            }

            git.deleteBranch(branch, directoryPath);
        } catch (e) {
            console.error(e.message);
        }
    });
};

module.exports = async (workingDirectory, recursive = false) => {
    await scanAndExecute({
        workingDirectory,
        recursive,
        callback: cleanDirectory
    });
};
