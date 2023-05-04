const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');
const rimraf = require('rimraf');
const listDirectoryBranches = require('.');

const BRANCH_NAME = 'branchie';

const tmpDir = path.resolve(__dirname, 'tmp');

describe('Lib', () => {
    describe('listDirectoryBranches', () => {
        let branches;

        before(async () => {
            rimraf.sync(tmpDir);
            fs.mkdirSync(tmpDir);
            fs.mkdirSync(path.join(tmpDir, '.git'));

            if (process.env.CI) {
                execSync(
                    [
                        'git config --global user.email "you@example.com"',
                        'git config --global user.name "Your Name"',
                    ].join(' && ')
                );
            }

            execSync(
                ['git init', 'touch 1', 'git add .', 'git commit -m "1"', `git checkout -b ${BRANCH_NAME}`].join(
                    ' && '
                ),
                {
                    cwd: tmpDir,
                }
            );
        });

        after(() => {
            rimraf.sync(tmpDir);
        });

        beforeEach(async () => {
            branches = await listDirectoryBranches(tmpDir);
        });

        it('Lists all branches', () => {
            expect(branches).to.include(BRANCH_NAME);
        });

        it('Ignores standard branches', () => {
            expect(branches).to.not.include('master');
        });
    });
});
