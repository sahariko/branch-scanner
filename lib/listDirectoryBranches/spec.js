import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import rimraf from 'rimraf';
import listDirectoryBranches from '.';

const BRANCH_NAME = 'branchie';

const tmpDir = path.resolve(__dirname, 'tmp');

describe('Lib', () => {
    describe('listDirectoryBranches', () => {
        let branches;

        before(async () => {
            rimraf.sync(tmpDir);
            fs.mkdirSync(tmpDir);
            fs.mkdirSync(path.join(tmpDir, '.git'));
            execSync([
                'git init',
                'touch 1',
                'git add .',
                'git commit -m "1"',
                `git checkout -b ${BRANCH_NAME}`
            ].join(' && '), {
                cwd: tmpDir
            });
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
