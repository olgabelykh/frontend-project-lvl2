import _ from 'lodash';

import { UNMODIFIED, MODIFIED, DELETED, ADDED, NESTED } from '../compare.js';

const INDENT_COUNT = 4;

const getValueIndent = (depth) => ' '.repeat(depth * INDENT_COUNT + 2);
const getDepthIndent = (depth) => ' '.repeat(depth * INDENT_COUNT);

const stringify = (depth, item, diffTypeMapping) => {
  if (!_.isPlainObject(item)) {
    return item;
  }

  const entries = Object.entries(item);
  if (entries.length === 0) {
    return '{}';
  }

  const items = entries.map(([key, value]) =>
    diffTypeMapping[UNMODIFIED](depth + 1, { key, value })
  );

  return ['{', ...items, `${getDepthIndent(depth + 1)}}`].join('\n');
};

const diffTypeMapping = {
  [UNMODIFIED]: (depth, { key, value }) =>
    `${getValueIndent(depth)}  ${key}: ${stringify(
      depth,
      value,
      diffTypeMapping
    )}`,
  [MODIFIED]: (depth, { key, newValue, oldValue }) => [
    `${getValueIndent(depth)}- ${key}: ${stringify(
      depth,
      oldValue,
      diffTypeMapping
    )}`,
    `${getValueIndent(depth)}+ ${key}: ${stringify(
      depth,
      newValue,
      diffTypeMapping
    )}`,
  ],
  [DELETED]: (depth, { key, value }) =>
    `${getValueIndent(depth)}- ${key}: ${stringify(
      depth,
      value,
      diffTypeMapping
    )}`,
  [ADDED]: (depth, { key, value }) =>
    `${getValueIndent(depth)}+ ${key}: ${stringify(
      depth,
      value,
      diffTypeMapping
    )}`,
  [NESTED]: (depth, { key, children }, iter) =>
    `${getValueIndent(depth)}  ${key}: ${stringify(
      depth,
      iter(depth + 1, children),
      diffTypeMapping
    )}`,
};

export default (diff) => {
  const iter = (depth, node) => {
    const items = node.flatMap((item) =>
      diffTypeMapping[item.type](depth, item, iter)
    );
    return ['{', ...items, `${getDepthIndent(depth)}}`].join('\n');
  };

  return iter(0, diff);
};
