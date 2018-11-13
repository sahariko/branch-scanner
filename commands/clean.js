const path = require('path');
const { execSync } = require('child_process');
const inquirer = require('inquirer');
const {
    colorizeFactory,
    getAllSubdirectories,
    listDirectoryBranches,
    validateDirectory,
    clearConsole,
    getCurrentBranch
} = require('../lib');

const colorizeBold = colorizeFactory(1);
const colorizeCyan = colorizeFactory(36);

const checkoutBranch = (directoryPath) => execSync(`git stash && git checkout master`, {
    cwd: directoryPath
});
const deleteBranch = (branch, directoryPath) => execSync(`git branch -D ${branch}`, {
    cwd: directoryPath
});

module.exports = async (workingDirectory) => {
    validateDirectory(workingDirectory);
    const generalMessage = colorizeBold(`🤖  Scanning all directories under ${workingDirectory}\n`);

    const directories = getAllSubdirectories(workingDirectory);

    if (!directories.length) {
        console.log('No directories found!');
        return;
    }

    for (let i = 0; i < directories.length; i++) {
        const directory = directories[i];

        const directoryPath = path.join(workingDirectory, directory);

        const branches = await listDirectoryBranches(directoryPath);

        if (!branches.length) continue;

        clearConsole();

        console.log(generalMessage);
        console.log(colorizeBold('Cleaning'), colorizeCyan(`${directory}\n`));

        const currentBranch = await getCurrentBranch(directoryPath);

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
                    checkoutBranch(directoryPath);
                }

                deleteBranch(branch, directoryPath);
            } catch (e) {
                console.error(e.message);
            }
        });
    }
};
