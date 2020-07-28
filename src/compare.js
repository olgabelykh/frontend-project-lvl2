import has from "lodash.has";
import isPlainObject from "lodash.isplainobject";

export const STATUS_UNMODIFIED = "unmodified";
export const STATUS_MODIFIED = "modified";
export const STATUS_DELETED = "deleted";
export const STATUS_ADDED = "added";
export const STATUS_NESTED = "nested";

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
      return { key, value: value1, status: STATUS_UNMODIFIED };
    }

    if (isComplexValue1 && isComplexValue2 && hasKeyObj1 && hasKeyObj2) {
      return { key, children: compare(value1, value2), status: STATUS_NESTED };
    }

    if (hasKeyObj1 && hasKeyObj2) {
      return {
        key,
        value: value2,
        isComplex: isComplexValue2,
        prevValue: value1,
        isPrevComplex: isComplexValue1,
        status: STATUS_MODIFIED,
      };
    }

    if (hasKeyObj1) {
      return {
        key,
        value: value1,
        isComplex: isComplexValue1,
        status: STATUS_DELETED,
      };
    }

    return {
      key,
      value: value2,
      isComplex: isComplexValue2,
      status: STATUS_ADDED,
    };
  });
};

export default compare;
