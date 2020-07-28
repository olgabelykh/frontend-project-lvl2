import yaml from 'js-yaml';
import ini from 'ini';

export const PARSE_JSON = 'json';
export const PARSE_YAML = 'yaml';
export const PARSE_INI = 'ini';

const parseJSON = (data) => JSON.parse(data);
const parseYAML = (data) => yaml.safeLoad(data);
const parseIni = (data) => ini.parse(data);

export default (data, format) => {
  switch (format) {
    case PARSE_JSON:
      return parseJSON(data);
    case PARSE_YAML:
      return parseYAML(data);
    case PARSE_INI:
      return parseIni(data);
    default:
      throw new Error('unsupported parse format');
  }
};
