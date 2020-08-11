import _ from 'lodash';

export const UNMODIFIED = 'unmodified';
export const MODIFIED = 'modified';
export const DELETED = 'deleted';
export const ADDED = 'added';
export const NESTED = 'nested';

const compare = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  return keys.map((key) => {
    if (!_.has(obj2, key)) {
      return {
        key,
        value: obj1[key],
        type: DELETED,
      };
    }

    if (!_.has(obj1, key)) {
      return {
        key,
        value: obj2[key],
        type: ADDED,
      };
    }

    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return { key, children: compare(obj1[key], obj2[key]), type: NESTED };
    }

    if (obj1[key] === obj2[key]) {
      return { key, value: obj1[key], type: UNMODIFIED };
    }

    return {
      key,
      newValue: obj2[key],
      oldValue: obj1[key],
      type: MODIFIED,
    };
  });
};

export default compare;
