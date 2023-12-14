/* eslint-disable import/no-duplicates */

import validationRegex from "./validationRegex";

const isEmpty = (value: unknown): boolean => {
  const isFile = (input) => "File" in window && input instanceof File;
  const type = typeof value;
  if (value === null) return true;
  if (type === "undefined") return true;
  if (type === "boolean") return !value;
  if (type === "string") return !value;
  if (type === "number") return false;
  if (isFile(value)) return false;
  if (Array.isArray(value)) return !value.length;
  if (type === "object") return !Object.keys(value).length;
  return !value;
};

const isEmail = (value: string): boolean => {
  if (isDefined(value) && !validationRegex.emailRegex.test(value)) {
    return false;
  }
  return true;
};

const isName = (value: string): boolean => {
  if (isDefined(value) && !validationRegex.nameRegex.test(value)) {
    return false;
  }
  return true;
};

const isPositiveFloat = (value: string): boolean => {
  if (isDefined(value) && !validationRegex.floatRegex.test(value)) {
    return false;
  }
  return true;
};

const isPositiveNonzeroFloat = (value: string): boolean => {
  if (isDefined(value) && !validationRegex.nonzeroFloatRegex.test(value)) {
    return false;
  }
  return true;
};

const isCompanyName = (value: string): boolean => {
  if (isDefined(value) && !validationRegex.organisationRegex.test(value)) {
    return false;
  }
  return true;
};

const isFloat = (value: string): boolean => {
  if (!validationRegex.floatRegex.test(value)) {
    return false;
  }
  return true;
};
const isDefined = (obj: unknown): boolean => {
  return obj !== null && obj !== undefined;
};

const isValidNumber = (value: string, digits: number): boolean => {
  if (isDefined(value) && value.length === digits) {
    return false;
  }
  return true;
};

const isMobile = (value: string): boolean => {
  if (isDefined(value) && !validationRegex.mobileRegex.test(value)) {
    return false;
  }
  return true;
};

const isDuplicate = (
  value: Record<any, any> | string,
  ruleValue: Record<any, any> | string
): boolean => {
  let existingValue = ruleValue;
  let compareValue = value;
  if (typeof ruleValue === "object") {
    existingValue = ruleValue[0];
    compareValue = `+${ruleValue[1]} ${value}`;
  }
  if (isDefined(compareValue) && isDefined(existingValue)) {
    return compareValue === existingValue;
  }
  return true;
};

const isPatternValid = (value: string, pattern: RegExp): boolean => {
  if (isDefined(value) && !new RegExp(pattern).test(value)) {
    return false;
  }
  return true;
};

const isGreaterThan = (
  valueToBeCompared: string,
  valueToCompareWith: string
) => {
  if (
    isDefined(valueToBeCompared) &&
    isDefined(valueToCompareWith) &&
    +valueToBeCompared <= +valueToCompareWith
  ) {
    return false;
  }
  return true;
};

const isDependentField=(valueDependentOn:string)=>{
  if (
    isDefined(valueDependentOn) &&
    (valueDependentOn==="")
  ) {
    return false;
  }
  return true;
}

export default {
  isEmpty,
  isEmail,
  isName,
  isPositiveFloat,
  isPositiveNonzeroFloat,
  isFloat,
  isCompanyName,
  isMobile,
  isValidNumber,
  isDuplicate,
  isPatternValid,
  isDefined,
  isGreaterThan,
  isDependentField
};
