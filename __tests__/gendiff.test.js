import fs from 'fs';

import getFixturePath from '../src/test-helpers/getFixturePath.js';
import genDiff from '../src/gendiff.js';

describe('genDiff', () => {
  test.each([
    ['file1.json', 'file2.json', 'stylish', 'diff-json.txt'],
    ['file1.json', 'file2.json', 'plain', 'diff-json.txt'],
    ['file1.json', 'file2.json', 'json', 'diff-json.txt'],
    ['file1.yml', 'file2.yml', 'stylish', 'diff-yml.txt'],
    ['file1.yml', 'file2.yml', 'plain', 'diff-yml.txt'],
    ['file1.yml', 'file2.yml', 'json', 'diff-yml.txt'],
    ['file1.ini', 'file2.ini', 'stylish', 'diff-ini.txt'],
    ['file1.ini', 'file2.ini', 'plain', 'diff-ini.txt'],
    ['file1.ini', 'file2.ini', 'json', 'diff-ini.txt'],
  ])(
    'should compare files %s, %s and return report in %s format',
    (filename1, filename2, format, diffFilename) => {
      const filepath1 = getFixturePath(filename1);
      const filepath2 = getFixturePath(filename2);

      const diffFilepath = getFixturePath('expected', format, diffFilename);
      const expected = fs.readFileSync(diffFilepath, 'utf8').trim();

      expect(genDiff(filepath1, filepath2, format)).toBe(expected);
    },
  );
});
