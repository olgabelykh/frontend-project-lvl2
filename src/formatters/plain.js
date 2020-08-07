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
  [MODIFIED]: (pathParts, { newValue, oldValue }) =>
    `Property '${pathParts.join('.')}' was updated. From ${stringify(
      oldValue
    )} to ${stringify(newValue)}`,
  [DELETED]: (pathParts) => `Property '${pathParts.join('.')}' was removed`,
  [ADDED]: (pathParts, { value }) =>
    `Property '${pathParts.join('.')}' was added with value: ${stringify(
      value
    )}`,
  [NESTED]: (pathParts, { children }, helper) => helper(pathParts, children),
};

export default (diff) => {
  const helper = (pathParts, node) =>
    node.flatMap((item) =>
      diffTypeMapping[item.type]([...pathParts, item.key], item, helper)
    );

  return helper([], diff).join('\n');
};
