const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const getAllSubdirectories = require('.');

const SUBDIR = '1';
const HIDDEN_SUBDIR = '.1';
const FILE_NAME = '2';

const tmpDir = path.resolve(__dirname, 'tmp');

describe('Lib', () => {
    describe('getAllSubdirectories', () => {
        let subdirectories;

        before(() => {
            try {
                fs.mkdirSync(tmpDir);
                fs.mkdirSync(path.join(tmpDir, SUBDIR));
                fs.mkdirSync(path.join(tmpDir, HIDDEN_SUBDIR));
                fs.writeFileSync(path.join(tmpDir, FILE_NAME));
            } catch (e) {
                /**/
            }
        });

        after(() => {
            rimraf.sync(tmpDir);
        });

        beforeEach(() => {
            subdirectories = getAllSubdirectories(tmpDir);
        });

        it('Fetches all subdirectories', () => {
            expect(subdirectories).to.include(SUBDIR);
        });

        it('Ignores hidden directories', () => {
            expect(subdirectories).to.have.lengthOf(1);
        });

        it('Ignores files', () => {
            expect(subdirectories).to.not.include(FILE_NAME);
        });
    });
});
