import yaml from 'js-yaml';
import ini from 'ini';

const parseJSON = (data) => JSON.parse(data);
const parseYAML = (data) => yaml.safeLoad(data);
const parseIni = (data) => ini.parse(data);

const formatMapping = {
  json: parseJSON,
  yml: parseYAML,
  yaml: parseYAML,
  ini: parseIni,
};

export default (data, format) => {
  const parse = formatMapping[format];

  if (!parse) {
    throw new Error(`Unsupported parse format: ${format}`);
  }

  return parse(data);
};
