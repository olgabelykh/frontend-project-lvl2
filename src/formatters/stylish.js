import isPlainObject from 'lodash.isplainobject';

import { UNMODIFIED, MODIFIED, DELETED, ADDED } from '../compare.js';

const getValueIndent = (level) => ' '.repeat(level * 4 + 2);
const getLevelIndent = (level) => ' '.repeat(level * 4);

const getComplexText = (complex, level) => {
  const entries = Object.entries(complex);
  if (entries.length === 0) {
    return '{}';
  }

  const valueIndent = getValueIndent(level);
  const entriesStr = entries
    .map(([key, value]) => {
      const valueStr = isPlainObject(value) ? getComplexText(value) : value;
      return `${valueIndent}  ${key}: ${valueStr}`;
    })
    .join('\n');
  const levelIndent = getLevelIndent(level);
  return `{\n${entriesStr}\n${levelIndent}}`;
};

const getValueText = (value, level) =>
  isPlainObject(value) ? getComplexText(value, level + 1) : value;

const diffTypeMapping = {
  [UNMODIFIED]: (level, { key, value }) =>
    `${getValueIndent(level)}  ${key}: ${getValueText(value, level)}`,
  [MODIFIED]: (level, { key, newValue, oldValue }) =>
    `${getValueIndent(level)}- ${key}: ${getValueText(
      oldValue,
      level
    )}\n${getValueIndent(level)}+ ${key}: ${getValueText(newValue, level)}`,
  [DELETED]: (level, { key, value }) =>
    `${getValueIndent(level)}- ${key}: ${getValueText(value, level)}`,
  [ADDED]: (level, { key, value }) =>
    `${getValueIndent(level)}+ ${key}: ${getValueText(value, level)}`,
};

export default (diff) => {
  const helper = (nested, level) => {
    const nestedText = nested
      .map((item) => {
        const { key, children, type } = item;

        if (children) {
          return `${getValueIndent(level)}  ${key}: ${helper(
            children,
            level + 1
          )}`;
        }

        return diffTypeMapping[type](level, item);
      })
      .join('\n');

    const levelIndent = getLevelIndent(level);
    return `{\n${nestedText}\n${levelIndent}}`;
  };

  return helper(diff, 0);
};
