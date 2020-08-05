import _ from 'lodash';

import { UNMODIFIED, MODIFIED, DELETED, ADDED, NESTED } from '../compare.js';

const INDENT_COUNT = 4;

const getValueIndent = (depth) => ' '.repeat(depth * INDENT_COUNT + 2);
const getDepthIndent = (depth) => ' '.repeat(depth * INDENT_COUNT);

const diffTypeMapping = {
  [UNMODIFIED]: (depth, { key, value }, stringify) =>
    `${getValueIndent(depth)}  ${key}: ${stringify(depth, value)}`,
  [MODIFIED]: (depth, { key, newValue, oldValue }, stringify) => [
    `${getValueIndent(depth)}- ${key}: ${stringify(depth, oldValue)}`,
    `${getValueIndent(depth)}+ ${key}: ${stringify(depth, newValue)}`,
  ],
  [DELETED]: (depth, { key, value }, stringify) =>
    `${getValueIndent(depth)}- ${key}: ${stringify(depth, value)}`,
  [ADDED]: (depth, { key, value }, stringify) =>
    `${getValueIndent(depth)}+ ${key}: ${stringify(depth, value)}`,
};

const stringify = (depth, item) => {
  if (!_.isPlainObject(item)) {
    return item;
  }

  const entries = Object.entries(item);
  if (entries.length === 0) {
    return '{}';
  }

  const items = entries.flatMap(([key, value]) =>
    diffTypeMapping[UNMODIFIED](depth + 1, { key, value }, stringify)
  );

  return ['{', ...items, `${getDepthIndent(depth + 1)}}`].join('\n');
};

export default (diff) => {
  const helper = (depth, node) => {
    const items = node.flatMap((item) => {
      const { key, children, type } = item;

      if (type === NESTED) {
        const value = helper(depth + 1, children);
        return diffTypeMapping[UNMODIFIED](depth, { key, value }, stringify);
      }

      return diffTypeMapping[type](depth, item, stringify);
    });

    return ['{', ...items, `${getDepthIndent(depth)}}`].join('\n');
  };

  return helper(0, diff);
};
