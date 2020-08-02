import path from 'path';
import fs from 'fs';

import compare from './compare.js';
import parse, { PARSE_JSON, PARSE_YAML, PARSE_INI } from './parsers.js';
import formatDiff from './formatters/index.js';

const parseFormat = {
  json: PARSE_JSON,
  yml: PARSE_YAML,
  yaml: PARSE_YAML,
  ini: PARSE_INI,
};

const getParsedData = (filepath) => {
  const data1 = fs.readFileSync(filepath, 'utf8');
  const fileExtension1 = path.extname(filepath).slice(1).toLowerCase();
  return parse(data1, parseFormat[fileExtension1]);
};

export default (filepath1, filepath2, format) => {
  const obj1 = getParsedData(filepath1);
  const obj2 = getParsedData(filepath2);

  const diff = compare(obj1, obj2);

  return formatDiff(diff, format);
};
