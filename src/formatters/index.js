import formatPlain from './plain.js';
import formatStylish from './stylish.js';
import formatJSON from './json.js';

const mapping = {
  plain: formatPlain,
  stylish: formatStylish,
  json: formatJSON,
};

export default (format) => (diff) => mapping[format](diff);
