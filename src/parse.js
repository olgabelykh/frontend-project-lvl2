import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

const parseJSON = (data) => JSON.parse(data);
const parseYML = (data) => yaml.safeLoad(data);
const parseIni = (data) => ini.parse(data);

const mapping = {
  '.': parseJSON,
  '.json': parseJSON,
  '.yml': parseYML,
  '.yaml': parseYML,
  '.ini': parseIni,
};

export default (filepath) => {
  const extname = path.extname(filepath);
  const data = fs.readFileSync(filepath, 'utf8');

  const parsedData = mapping[extname](data);
  return parsedData;
};
