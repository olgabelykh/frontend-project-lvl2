import {
  STATUS_NESTED,
  STATUS_MODIFIED,
  STATUS_DELETED,
  STATUS_ADDED,
  TYPE_COMPLEX,
} from '../compare.js';

export default (diff) => {
  const helper = (subDiff, level) => {
    const children = Object.entries(subDiff);

    if (children.length === 0) {
      return '{}';
    }

    const strs = ['{'];
    const valueIndent = ' '.repeat(level * 4 + 2);

    children.forEach(([key, item]) => {
      const { status, value = item, prevValue, type, prevType } = item;

      const valueStr = type === TYPE_COMPLEX ? helper(value, level + 1) : value;
      const prevValueStr = prevType === TYPE_COMPLEX ? helper(prevValue, level + 1) : prevValue;

      let str;
      switch (status) {
        case STATUS_NESTED:
          str = `${valueIndent}  ${key}: ${helper(value, level + 1)}`;
          strs.push(str);
          break;
        case STATUS_MODIFIED:
          str = `${valueIndent}- ${key}: ${prevValueStr}`;
          strs.push(str);
          str = `${valueIndent}+ ${key}: ${valueStr}`;
          strs.push(str);
          break;
        case STATUS_DELETED:
          str = `${valueIndent}- ${key}: ${valueStr}`;
          strs.push(str);
          break;
        case STATUS_ADDED:
          str = `${valueIndent}+ ${key}: ${valueStr}`;
          strs.push(str);
          break;
        default:
          str = `${valueIndent}  ${key}: ${valueStr}`;
          strs.push(str);
      }
    });

    strs.push(`${' '.repeat(level * 4)}}`);

    return strs.join('\n');
  };

  return helper(diff, 0);
};
