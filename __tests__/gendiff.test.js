import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import genDiff from '../src/gendiff.js';

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

  it('should compare yaml files', () => {
    const filepath1 = path.resolve(__dirname, '__fixtures__', 'file1.yml');
    const filepath2 = path.resolve(__dirname, '__fixtures__', 'file2.yml');

    const expected = [
      '  user: Tony Hawk',
      '- country: Italy',
      '+ country: Germany',
      '- location: Rome',
      '+ age: 34',
    ].join('\n');

    expect(genDiff(filepath1, filepath2)).toBe(expected);
  });

  it('should compare ini files', () => {
    const filepath1 = path.resolve(__dirname, '__fixtures__', 'file1.ini');
    const filepath2 = path.resolve(__dirname, '__fixtures__', 'file2.ini');

    const expected = [
      '- IconFile: install.ico',
      '+ IconFile: hey.ico',
      '  IconIndex: 0',
      '- InfoTip: Description',
      '+ IconArea_Image: bkground.jpg',
      '+ IconArea_Text: 20123',
    ].join('\n');

    expect(genDiff(filepath1, filepath2)).toBe(expected);
  });
});
