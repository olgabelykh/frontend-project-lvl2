import {
  STATUS_NESTED,
  STATUS_MODIFIED,
  STATUS_DELETED,
  STATUS_ADDED,
  TYPE_STRING,
  TYPE_ARRAY,
  TYPE_COMPLEX,
} from '../compare.js';

const COMPLEX_VALUE = '[complex value]';

const valueToStr = (value, type) => {
  switch (type) {
    case TYPE_COMPLEX:
      return COMPLEX_VALUE;
    case TYPE_STRING:
      return `'${value}'`;
    case TYPE_ARRAY:
      return `[${value.join(', ')}]`;
    default:
      return value;
  }
};

export default (diff) => {
  const helper = (subDiff, keys, strs) => {
    const children = Object.entries(subDiff);

    if (children.length === 0) {
      return '';
    }

    children.forEach(([key, { status, value, prevValue, type, prevType }]) => {
      const pathKeys = [...keys, key];
      const valuePath = pathKeys.join('.');
      const valueStr = valueToStr(value, type);
      const prevValueStr = valueToStr(prevValue, prevType);

      let str;
      switch (status) {
        case STATUS_NESTED:
          strs.push(helper(value, pathKeys, []));
          break;
        case STATUS_MODIFIED:
          str = `Property '${valuePath}' was updated. From ${prevValueStr} to ${valueStr}`;
          strs.push(str);
          break;
        case STATUS_DELETED:
          str = `Property '${valuePath}' was removed`;
          strs.push(str);
          break;
        case STATUS_ADDED:
          str = `Property '${valuePath}' was added with value: ${valueStr}`;
          strs.push(str);
          break;
        default:
          break;
      }
    });

    return strs.join('\n');
  };

  return helper(diff, [], []);
};
