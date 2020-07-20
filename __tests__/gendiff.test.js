const path = require('path');
const genDiff = require('../gendiff.js');

describe('genDiff', () => {
  it('should compare json files', () => {
    const filepath1 = path.resolve(__dirname, '__fixtures__', 'file1.json');
    const filepath2 = path.resolve(__dirname, '__fixtures__', 'file2.json');

    const expected = [
      '  host: hexlet.io',
      '- timeout: 50',
      '+ timeout: 20',
      '- proxy: 123.234.53.22',
      '- follow: false',
      '+ verbose: true',
    ].join('\n');

    expect(genDiff(filepath1, filepath2)).toBe(expected);
  });
});
