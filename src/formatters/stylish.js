import isPlainObject from 'lodash.isplainobject';

import {
  STATUS_UNMODIFIED,
  STATUS_MODIFIED,
  STATUS_DELETED,
  STATUS_ADDED,
  STATUS_NESTED,
} from '../compare.js';

const getValueIndent = (level) => ' '.repeat(level * 4 + 2);
const getLevelIndent = (level) => ' '.repeat(level * 4);

const getComplexStr = (complex, level) => {
  const entries = Object.entries(complex);
  if (entries.length === 0) {
    return '{}';
  }

  const valueIndent = getValueIndent(level);
  const entriesStr = entries
    .map(([key, value]) => {
      const valueStr = isPlainObject(value) ? getComplexStr(value) : value;
      return `${valueIndent}  ${key}: ${valueStr}`;
    })
    .join('\n');
  const levelIndent = getLevelIndent(level);
  return `{\n${entriesStr}\n${levelIndent}}`;
};

export default (diff) => {
  const helper = (nested, level) => {
    const valueIndent = getValueIndent(level);
    const nestedStr = nested
      .map((item) => {
        const {
          key,
          value,
          prevValue,
          isComplex,
          isPrevComplex,
          children,
          status,
        } = item;

        const valueStr = isComplex ? getComplexStr(value, level + 1) : value;
        const prevValueStr = isPrevComplex
          ? getComplexStr(prevValue, level + 1)
          : prevValue;

        switch (status) {
          case STATUS_NESTED:
            return `${valueIndent}  ${key}: ${helper(children, level + 1)}`;
          case STATUS_UNMODIFIED:
            return `${valueIndent}  ${key}: ${valueStr}`;
          case STATUS_MODIFIED:
            return `${valueIndent}- ${key}: ${prevValueStr}\n${valueIndent}+ ${key}: ${valueStr}`;
          case STATUS_DELETED:
            return `${valueIndent}- ${key}: ${valueStr}`;
          case STATUS_ADDED:
            return `${valueIndent}+ ${key}: ${valueStr}`;
          default:
            throw new Error('Unexpected status');
        }
      })
      .join('\n');

    const levelIndent = getLevelIndent(level);
    return `{\n${nestedStr}\n${levelIndent}}`;
  };

  return helper(diff, 0);
};
