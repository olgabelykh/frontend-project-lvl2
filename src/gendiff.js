import path from 'path';
import fs from 'fs';

import compare from './compare.js';
import parse from './parsers.js';
import formatDiff from './formatters/index.js';

const getParsedData = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf8');
  const format = path.extname(filepath).slice(1).toLowerCase();
  return parse(data, format);
};

export default (filepath1, filepath2, format) => {
  const obj1 = getParsedData(filepath1);
  const obj2 = getParsedData(filepath2);

  const diff = compare(obj1, obj2);

  return formatDiff(diff, format);
};
