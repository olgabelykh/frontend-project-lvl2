import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import genDiff from '../gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
