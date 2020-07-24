import has from 'lodash.has';
import isPlainObject from 'lodash.isplainobject';
import difference from 'lodash.difference';
import isnan from 'lodash.isnan';

export const STATUS_UNMODIFIED = 'unmodified';
export const STATUS_NESTED = 'nested';
export const STATUS_MODIFIED = 'modified';
export const STATUS_DELETED = 'deleted';
export const STATUS_ADDED = 'added';

export const TYPE_STRING = 'string';
export const TYPE_ARRAY = 'array';
export const TYPE_COMPLEX = 'complex';

const getValueType = (value) => {
  if (Array.isArray(value)) {
    return TYPE_ARRAY;
  }

  if (isPlainObject(value)) {
    return TYPE_COMPLEX;
  }

  return typeof value;
};

const getValue = (value) => {
  const num = parseFloat(value);
  return isnan(num) ? value : num;
};

const compare = (obj1, obj2) => {
  const diffs = {};
  const completeObj = { ...obj1, ...obj2 };

  Object.keys(completeObj).forEach((key) => {
    const value1 = getValue(obj1[key]);
    const value2 = getValue(obj2[key]);
    const valueType1 = getValueType(value1);
    const valueType2 = getValueType(value2);
    const hasKeyObj1 = has(obj1, key);
    const hasKeyObj2 = has(obj2, key);

    const isEqual =
      value1 === value2 ||
      (valueType1 === TYPE_ARRAY &&
        valueType2 === TYPE_ARRAY &&
        difference(value1, value2).length === 0);
    if (isEqual) {
      diffs[key] = { status: STATUS_UNMODIFIED, value: value1, type: valueType1 };
      return;
    }

    const isPersistComplex =
      valueType1 === TYPE_COMPLEX && valueType2 === TYPE_COMPLEX && hasKeyObj1 && hasKeyObj2;
    if (isPersistComplex) {
      diffs[key] = { status: STATUS_NESTED, value: compare(value1, value2) };
      return;
    }

    if (hasKeyObj1 && hasKeyObj2) {
      diffs[key] = {
        status: STATUS_MODIFIED,
        value: value2,
        prevValue: value1,
        type: valueType2,
        prevType: valueType1,
      };
      return;
    }

    if (hasKeyObj1) {
      diffs[key] = { status: STATUS_DELETED, value: value1, type: valueType1 };
    }

    if (hasKeyObj2) {
      diffs[key] = { status: STATUS_ADDED, value: value2, type: valueType2 };
    }
  });

  return diffs;
};

export default compare;
