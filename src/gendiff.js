import path from 'path';
import fs from 'fs';

import compare from './compare.js';
import parse, { PARSE_JSON, PARSE_YAML, PARSE_INI } from './parsers.js';
import formatDiff from './formatters/index.js';

const getFileExtension = (filepath) => path.extname(filepath).toLowerCase();

const parseFormat = {
  '.': PARSE_JSON,
  '.json': PARSE_JSON,
  '.yml': PARSE_YAML,
  '.yaml': PARSE_YAML,
  '.ini': PARSE_INI,
};

export default (filepath1, filepath2, format) => {
  const data1 = fs.readFileSync(filepath1, 'utf8');
  const fileExtension1 = getFileExtension(filepath1);
  const obj1 = parse(data1, parseFormat[fileExtension1]);

  const data2 = fs.readFileSync(filepath2, 'utf8');
  const fileExtension2 = getFileExtension(filepath2);
  const obj2 = parse(data2, parseFormat[fileExtension2]);

  const diff = compare(obj1, obj2);

  return formatDiff(diff, format);
};
