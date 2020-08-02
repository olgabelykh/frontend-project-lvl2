import has from 'lodash.has';
import isPlainObject from 'lodash.isplainobject';

export const UNMODIFIED = 'unmodified';
export const MODIFIED = 'modified';
export const DELETED = 'deleted';
export const ADDED = 'added';

const compare = (obj1, obj2) => {
  const completeObj = { ...obj1, ...obj2 };
  return Object.keys(completeObj).map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    const isComplexValue1 = isPlainObject(value1);
    const isComplexValue2 = isPlainObject(value2);
    const hasKeyObj1 = has(obj1, key);
    const hasKeyObj2 = has(obj2, key);

    if (value1 === value2) {
      return { key, value: value1, type: UNMODIFIED };
    }

    if (isComplexValue1 && isComplexValue2 && hasKeyObj1 && hasKeyObj2) {
      return { key, children: compare(value1, value2) };
    }

    if (hasKeyObj1 && hasKeyObj2) {
      return {
        key,
        newValue: value2,
        oldValue: value1,
        type: MODIFIED,
      };
    }

    if (hasKeyObj1) {
      return {
        key,
        value: value1,
        type: DELETED,
      };
    }

    return {
      key,
      value: value2,
      type: ADDED,
    };
  });
};

export default compare;
