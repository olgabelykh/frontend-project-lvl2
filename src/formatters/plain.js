import isPlainObject from 'lodash.isplainobject';
import { UNMODIFIED, MODIFIED, DELETED, ADDED } from '../compare.js';

const getValueText = (value) => {
  if (isPlainObject(value)) {
    return '[complex value]';
  }

  return typeof value === 'string' ? `'${value}'` : value;
};

const diffTypeMapping = {
  [UNMODIFIED]: () => [],
  [MODIFIED]: (path, { newValue, oldValue }) =>
    `Property '${path}' was updated. From ${getValueText(
      oldValue
    )} to ${getValueText(newValue)}`,
  [DELETED]: (path) => `Property '${path}' was removed`,
  [ADDED]: (path, { value }) =>
    `Property '${path}' was added with value: ${getValueText(value)}`,
};

export default (diff) => {
  const helper = (nested, pathParts) => {
    return nested.flatMap((item) => {
      const { key, children, type } = item;
      const newPathParts = [...pathParts, key];

      if (children) {
        return helper(children, newPathParts);
      }

      return diffTypeMapping[type](newPathParts.join('.'), item);
    });
  };

  return helper(diff, []).join('\n');
};
