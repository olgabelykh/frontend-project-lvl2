import _ from 'lodash';
import { UNMODIFIED, MODIFIED, DELETED, ADDED, NESTED } from '../compare.js';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return typeof value === 'string' ? `'${value}'` : value;
};

const diffTypeMapping = {
  [UNMODIFIED]: () => [],
  [MODIFIED]: (path, { newValue, oldValue }) =>
    `Property '${path}' was updated. From ${stringify(oldValue)} to ${stringify(
      newValue
    )}`,
  [DELETED]: (path) => `Property '${path}' was removed`,
  [ADDED]: (path, { value }) =>
    `Property '${path}' was added with value: ${stringify(value)}`,
};

export default (diff) => {
  const helper = (pathParts, node) => {
    return node.flatMap((item) => {
      const { key, children, type } = item;
      const newPathParts = [...pathParts, key];

      if (type === NESTED) {
        return helper(newPathParts, children);
      }

      return diffTypeMapping[type](newPathParts.join('.'), item);
    });
  };

  return helper([], diff).join('\n');
};
