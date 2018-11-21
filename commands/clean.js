const path = require('path');
const inquirer = require('inquirer');
const {
    colorizeFactory,
    clearConsole,
    git,
    getLongestString,
    scanAndExecute,
    howLongAgo
} = require('../lib');

const colorizeBold = colorizeFactory(1);
const colorizeCyan = colorizeFactory(36);
const colorizeGray = colorizeFactory(90);

const getBranchesDates = async(directoryPath, branches) => {
    const branchesDates = [];

    for (let i = 0; i < branches.length; i++) {
        const branch = branches[i];
        const lastDate = await git.getBranchLastUpdatedDate(branch, directoryPath);

        branchesDates.push(lastDate);
    }

    return branchesDates;
};

const sortArrays = (branches, dates) => {
    const map = [];
    for (let i = 0; i < branches.length; i++) {
        map.push({name: branches[i], date: dates[i]});
    }

    map.sort((a, b) => a.date > b.date ? -1 : a.date == b.date ? 0 : 1);

    for (let i = 0; i < map.length; i++) {
        branches[i] = map[i].name;
        dates[i] = map[i].date;
    }
};

/**
 * Interactively cleans a given directory from non-standard git branches.
 * @param {Object}   options
 * @param {Boolean}  options.recursive Whether the scan should run recursively or not.
 * @param {String}   options.directoryPath The absolute path to the directory.
 * @param {String[]} options.branches The directory's branches.
 */
const cleanDirectory = async ({directoryPath, parentDirectory, branches} = {}) => {
    clearConsole();

    const generalMessage = colorizeBold(`🤖  Scanning all directories under ${parentDirectory}\n`);
    const directory = path.basename(directoryPath);

    console.log(generalMessage);
    console.log(colorizeBold('Cleaning'), colorizeCyan(`${directory}\n`));

    const branchesDates = await getBranchesDates(directoryPath, branches);
    const currentBranch = await git.getCurrentBranch(directoryPath);

    sortArrays(branches, branchesDates);

    const longestBranchName = getLongestString(branches);
    const branchPrompts = branches.map((branch, index) => {
        const lastDate = branchesDates[index];
        const humanReadableDate = howLongAgo(lastDate * 1000);
        const spacesAmount = longestBranchName.length - branch.length + 1;

        return [
            branch,
            ' '.repeat(spacesAmount),
            colorizeGray(`Updated ${humanReadableDate}`)
        ].join('');
    });

    const answers = await inquirer
        .prompt([
            {
                name: 'branches',
                message: 'Which branches do you want to clean?',
                type: 'checkbox',
                pageSize: '20',
                choices: branchPrompts
            },
        ]);

    answers.branches.forEach((branchPrompt) => {
        const branch = branches.find((branch) => branchPrompt.startsWith(branch));

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
