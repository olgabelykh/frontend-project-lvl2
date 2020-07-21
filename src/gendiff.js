import has from 'lodash.has';

import parse from './parse.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

  const diffs = [];

  const data = { ...data1, ...data2 };

  Object.keys(data).forEach((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (value1 === value2) {
      diffs.push(`  ${key}: ${value1}`);
      return;
    }

    if (has(data1, key)) {
      diffs.push(`- ${key}: ${value1}`);
    }
    if (has(data2, key)) {
      diffs.push(`+ ${key}: ${value2}`);
    }
  });

  return diffs.join('\n');
};

export default genDiff;