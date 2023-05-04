const getLongestString = require('.');

const STRINGS = ['a', 'abc', 'abcdefg', 'abcde', 'ab', 'abcdef'];

describe('Lib', () => {
    describe('getLongestString', () => {
        it('Gets the longest string in an array', () => {
            const longest = getLongestString(STRINGS);

            expect(longest).to.equal('abcdefg');
        });
    });
});
