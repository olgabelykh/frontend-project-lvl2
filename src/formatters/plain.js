import {
  STATUS_UNMODIFIED,
  STATUS_MODIFIED,
  STATUS_DELETED,
  STATUS_ADDED,
  STATUS_NESTED,
} from '../compare.js';

const getValueStr = (value, isComplex) => {
  if (isComplex) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

export default (diff) => {
  const helper = (nested, keys) => {
    return nested
      .filter(({ status }) => status !== STATUS_UNMODIFIED)
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

        const pathKeys = [...keys, key];
        const valuePath = pathKeys.join('.');

        const valueStr = getValueStr(value, isComplex);
        const prevValueStr = getValueStr(prevValue, isPrevComplex);

        switch (status) {
          case STATUS_NESTED:
            return helper(children, pathKeys);
          case STATUS_MODIFIED:
            return `Property '${valuePath}' was updated. From ${prevValueStr} to ${valueStr}`;
          case STATUS_DELETED:
            return `Property '${valuePath}' was removed`;
          case STATUS_ADDED:
            return `Property '${valuePath}' was added with value: ${valueStr}`;
          default:
            throw new Error('Unexpeted status');
        }
      })
      .join('\n');
  };

  return helper(diff, []);
};
