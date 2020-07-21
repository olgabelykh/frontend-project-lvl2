import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import parse from '../src/parse.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('parse', () => {
  it('should parse json file', () => {
    const filepath = path.resolve(__dirname, '__fixtures__', 'file1.json');

    const expected = {
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
      follow: false,
    };

    expect(parse(filepath)).toEqual(expected);
  });

  it('should parse yaml file', () => {
    const filepath = path.resolve(__dirname, '__fixtures__', 'file1.yml');

    const expected = {
      user: 'Tony Hawk',
      country: 'Italy',
      location: 'Rome',
    };

    expect(parse(filepath)).toEqual(expected);
  });

  it('should parse ini file', () => {
    const filepath = path.resolve(__dirname, '__fixtures__', 'file1.ini');

    const expected = {
      IconFile: 'install.ico',
      IconIndex: '0',
      InfoTip: 'Description',
    };

    expect(parse(filepath)).toEqual(expected);
  });
});
