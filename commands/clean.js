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

const WORKTREE_PREFIX = '🌿 ';

const cleanDirectory = async ({directoryPath, parentDirectory, branches, worktrees, removeWorktrees = false, debug = false} = {}) => {
    const log = debug ? (...args) => console.log('[debug]', ...args) : () => {};
    clearConsole();

    const generalMessage = colorizeBold(`🤖  Scanning all directories under ${parentDirectory}\n`);
    const directory = path.basename(directoryPath);

    console.log(generalMessage);
    console.log(colorizeBold('Cleaning'), colorizeCyan(`${directory}\n`));

    log('fetching branch dates and current branch...');
    const [branchesDates, currentBranch] = await Promise.all([
        getBranchesDates(directoryPath, branches),
        git.getCurrentBranch(directoryPath)
    ]);
    log('current branch:', currentBranch, '| branches:', branches);

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

    const worktreePrompts = worktrees.map((wt) => {
        return `${WORKTREE_PREFIX}${wt.branch}  ${colorizeGray(wt.path)}`;
    });

    const allChoices = [...branchPrompts, ...worktreePrompts];

    let selectedChoices;

    if (removeWorktrees) {
        selectedChoices = worktreePrompts;
    } else {
        selectedChoices = (await inquirer.prompt([{
            name: 'branches',
            message: 'Which branches/worktrees do you want to clean?',
            type: 'checkbox',
            pageSize: '20',
            choices: allChoices
        }])).branches;
    }

    for (const choice of selectedChoices) {
        try {
            if (choice.startsWith(WORKTREE_PREFIX)) {
                const wt = worktrees.find((wt) => choice.includes(wt.path));
                log('removing worktree:', wt ? wt.path : '(not found)');

                const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
                let i = 0;
                const spinner = setInterval(() => {
                    process.stdout.write(`\r${frames[i++ % frames.length]} Removing ${wt.path}`);
                }, 80);

                await git.removeWorktree(wt.path, directoryPath);

                clearInterval(spinner);
                process.stdout.write(`\r✓ Removed ${wt.path}\n`);
                log('done');
            } else {
                const branch = branches.find((branch) => choice.startsWith(branch));
                log('deleting branch:', branch);

                if (branch === currentBranch) {
                    git.checkoutBranch(directoryPath);
                }

                git.deleteBranch(branch, directoryPath);
            }
        } catch (e) {
            console.error(e.message);
        }
    }
};

module.exports = async (workingDirectory, recursive = false, {removeWorktrees = false, children = false, debug = false} = {}) => {
    await scanAndExecute({
        workingDirectory,
        recursive,
        children,
        callback: (opts) => cleanDirectory({...opts, removeWorktrees, debug})
    });
};
