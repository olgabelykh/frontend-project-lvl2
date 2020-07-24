import compare from './compare.js';
import parse from './parse.js';
import createFormatter from './formatters/index.js';

export default (filepath1, filepath2, format) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

  const diff = compare(data1, data2);

  const formatDiff = createFormatter(format);
  return formatDiff(diff);
};
