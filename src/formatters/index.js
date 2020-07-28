import formatPlain from './plain.js';
import formatStylish from './stylish.js';
import formatJSON from './json.js';

export default (diff, format) => {
  switch (format) {
    case 'stylish':
      return formatStylish(diff);
    case 'plain':
      return formatPlain(diff);
    case 'json':
      return formatJSON(diff);
    default:
      throw new Error('unsupported output format');
  }
};
