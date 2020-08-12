import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (...paths) =>
  path.resolve(__dirname, '../__fixtures__', path.join(...paths));

describe('genDiff', () => {
  test.each([
    ['file1.json', 'file2.json', 'stylish', 'diff-json.txt'],
    ['file1.yml', 'file2.yaml', 'plain', 'diff-yml.txt'],
    ['file1.ini', 'file2.ini', 'json', 'diff-ini.txt'],
  ])(
    'should compare files %s, %s and return report in %s format',
    (filename1, filename2, format, diffFilename) => {
      const filepath1 = getFixturePath(filename1);
      const filepath2 = getFixturePath(filename2);

      const diffFilepath = getFixturePath('expected', diffFilename);
      const expected = fs.readFileSync(diffFilepath, 'utf8').trim();

      expect(genDiff(filepath1, filepath2, format)).toBe(expected);
    }
  );
});
