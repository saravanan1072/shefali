import validationUtils from "./validationUtils";

const errorObj = (nestedKey, key, object, message, formErrors) => {
  if (nestedKey && key) {
    object[key] = message;
  } else {
    formErrors[key] = message;
  }
};

export const validationLogic = (
  key,
  value,
  validationRules,
  formErrors,
  values,
  nestedKey?: any,
  object?: any
) => {
  if (
    validationRules &&
    validationRules[key]?.required &&
    validationUtils.isEmpty(value)
  ) {
    if (validationRules[key]?.customValidation?.type === "dependentField") {
      if (
        !validationUtils.isDependentField(
          values[validationRules[key]?.customValidation.dependentOn]
        )
      ) {
        errorObj(
          nestedKey,
          key,
          object,
          validationRules[key]?.customValidation.message,
          formErrors
        );
      } else {
        errorObj(
          nestedKey,
          key,
          object,
          validationRules[key]?.required.message,
          formErrors
        );
      }
    } else {
      errorObj(
        nestedKey,
        key,
        object,
        validationRules[key]?.required.message,
        formErrors
      );
    }
  }
  if (
    !validationUtils.isEmpty(value) &&
    validationRules &&
    validationRules[key]?.pattern
  ) {
    switch (validationRules[key]?.pattern.type) {
      case "name":
        if (!validationUtils.isName(value)) {
          errorObj(
            nestedKey,
            key,
            object,
            validationRules[key]?.pattern.message,
            formErrors
          );
        }
        break;
      case "company":
        if (!validationUtils.isCompanyName(value)) {
          errorObj(
            nestedKey,
            key,
            object,
            validationRules[key]?.pattern.message,
            formErrors
          );
        }
        break;
      case "email":
        if (!validationUtils.isEmail(value)) {
          errorObj(
            nestedKey,
            key,
            object,
            validationRules[key]?.pattern.message,
            formErrors
          );
        }
        break;
      case "mobile":
        if (!validationUtils.isMobile(value)) {
          errorObj(
            nestedKey,
            key,
            object,
            validationRules[key]?.pattern.message,
            formErrors
          );
        }
        break;
      case "positiveFloat":
        if (!validationUtils.isPositiveFloat(value)) {
          errorObj(
            nestedKey,
            key,
            object,
            validationRules[key]?.pattern.message,
            formErrors
          );
        }
        break;
      case "positiveNonzeroFloat":
        if (!validationUtils.isPositiveNonzeroFloat(value)) {
          errorObj(
            nestedKey,
            key,
            object,
            validationRules[key]?.pattern.message,
            formErrors
          );
        }
        break;
      default:
        return null;
    }
  }
  if (
    !validationUtils.isEmpty(value) &&
    validationRules &&
    validationRules[key]?.customValidation
  ) {
    if (validationRules[key]?.customValidation.type === "greaterThan") {
      if (
       !validationUtils.isGreaterThan(
          value,
          values[validationRules[key]?.customValidation.compareWith]
        )
      ) {
        errorObj(
          nestedKey,
          key,
          object,
          validationRules[key]?.customValidation.message,
          formErrors
        );
      }
    }
  }
};

export const validateFormField = (
  fieldName,
  fieldValue,
  validationRules,
  values?: any
) => {
  const fieldErrors = {};
  let arr = [];
  Array.isArray(fieldValue) &&
    fieldValue.map((el, index) => {
      const obj = {};
      typeof el === "object" &&
        Object.keys(el).map((prop) => {
          validationLogic(
            prop,
            el[prop],
            validationRules,
            fieldErrors,
            values,
            fieldName,
            obj
          );
        });
      arr[index] = obj;
      fieldErrors[fieldName] = arr;
    });
  if (validationRules && validationRules?.required) {
    if (validationUtils.isEmpty(fieldValue)) {
      fieldErrors[fieldName] = validationRules.required.message;
    }
  }
  if (
    !validationUtils.isEmpty(fieldValue) &&
    validationRules &&
    validationRules?.pattern
  ) {
    switch (validationRules?.pattern.type) {
      case "name":
        if (!validationUtils.isName(fieldValue)) {
          fieldErrors[fieldName] = validationRules.pattern.message;
        }
        break;
      case "company":
        if (!validationUtils.isCompanyName(fieldValue)) {
          fieldErrors[fieldName] = validationRules.pattern.message;
        }
        break;
      case "email":
        if (!validationUtils.isEmail(fieldValue)) {
          fieldErrors[fieldName] = validationRules.pattern.message;
        }
        break;
      case "mobile":
        if (!validationUtils.isMobile(fieldValue)) {
          fieldErrors[fieldName] = validationRules.pattern.message;
        }
        break;
      case "positiveFloat":
        if (!validationUtils.isPositiveFloat(fieldValue)) {
          fieldErrors[fieldName] = validationRules.pattern.message;
        }
        break;
      case "positiveNonzeroFloat":
        if (!validationUtils.isPositiveNonzeroFloat(fieldValue)) {
          fieldErrors[fieldName] = validationRules.pattern.message;
        }
        break;
      default:
        return null;
    }
  }
  return fieldErrors;
};

export const validateForm = (values, validationRules) => {
  const formErrors = {};
  Object.keys(values).map((key) => {
    const value = values[key];
    let arr = [];
    const valueArr = [];
    let fieldErr = {};
    Array.isArray(value) &&
      value.map((el, index) => {
        const obj = {};
        typeof el === "object" &&
          Object.keys(el).map((prop) => {
            validationLogic(
              prop,
              el[prop],
              validationRules[key],
              formErrors,
              values,
              key,
              obj
            );
          });
        validationRules[key] &&
          Object.keys(validationRules[key]).map((prop) => {
            if (validationRules[key][prop]?.primary) {
              Object.keys(el).map((ele) => {
                if (ele === prop) {
                  valueArr.push(el[prop]);
                  fieldErr[ele] = validationRules[key][prop]?.primary.message;
                }
              });
            }
          });
        arr[index] = obj;
        formErrors[key] = arr;
      });
    if (Object.keys(fieldErr).length > 0) {
      Object.keys(fieldErr).map((el) => {
        const trueValuesArr = valueArr.filter((value) => value === true);
        const arrIndex = values[key].length - 1;
        if (trueValuesArr.length > 1) {
          formErrors[key][arrIndex][el] = fieldErr[el].duplicateTrue;
        } else if (trueValuesArr.length === 0) {
          formErrors[key][arrIndex][el] = fieldErr[el].allFalse;
        }
      });
    }
    validationLogic(key, value, validationRules, formErrors, values);
  });

  Object.keys(formErrors).map((error) => {
    if (Array.isArray(formErrors[error])) {
      const value = formErrors[error].every(
        (el) => Object.keys(el).length === 0
      );
      value && delete formErrors[error];
    }
  });
  return formErrors;
};
