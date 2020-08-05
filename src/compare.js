import _ from 'lodash';

export const UNMODIFIED = 'unmodified';
export const MODIFIED = 'modified';
export const DELETED = 'deleted';
export const ADDED = 'added';
export const NESTED = 'nested';

const compare = (obj1, obj2) => {
  const completeObj = { ...obj1, ...obj2 };
  return Object.keys(completeObj).map((key) => {
    if (obj1[key] === obj2[key]) {
      return { key, value: obj1[key], type: UNMODIFIED };
    }

    if (
      _.isPlainObject(obj1[key]) &&
      _.isPlainObject(obj2[key]) &&
      _.has(obj1, key) &&
      _.has(obj2, key)
    ) {
      return { key, children: compare(obj1[key], obj2[key]), type: NESTED };
    }

    if (_.has(obj1, key) && _.has(obj2, key)) {
      return {
        key,
        newValue: obj2[key],
        oldValue: obj1[key],
        type: MODIFIED,
      };
    }

    if (_.has(obj1, key)) {
      return {
        key,
        value: obj1[key],
        type: DELETED,
      };
    }

    return {
      key,
      value: obj2[key],
      type: ADDED,
    };
  });
};

export default compare;
