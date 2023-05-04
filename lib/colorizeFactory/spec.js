const colorizeFactory = require('.');
const { COLOR_CLOSING_TAG } = require('./constants');

const CYAN_TAG = 36;

describe('Lib', () => {
    describe('colorizeFactory', () => {
        it('Generates a colorize function', () => {
            const colorizeCyan = colorizeFactory(CYAN_TAG);

            expect(colorizeCyan).to.be.an.instanceof(Function);
        });

        it('Generated colorize function closes with a closing tag', () => {
            const colorizeCyan = colorizeFactory(CYAN_TAG);
            const string = colorizeCyan('');

            expect(string.endsWith(COLOR_CLOSING_TAG)).to.equal(true);
        });
    });
});
