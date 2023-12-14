import { useState, useRef, useEffect } from "react";
import useDeepEffect from "../../features/hooks/useDeepEffect";
import { validateForm, validateFormField } from "../../utils/validation";
import validationUtils from "../../utils/validation/validationUtils";

const useValidation: any = (formData,validationRules,customFormValues) => {
  const data = Array.isArray(formData) ? [...formData] : { ...formData };
  const [values, setValues] = useState(data);
  const [array,setArray]=useState();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  useDeepEffect(() => {
    setValues({ ...values, ...data });
  }, [data]);

  useEffect(()=>{
    Object.keys(values).map((el)=>{
        if(Array.isArray(values[el])){
            setArray(values[el]);
        }
      });
  },[data])

  const fieldDomRefs = {}; // use to focus fields upon error

  const init = () => {
    initFieldDomRefs();
  };

  const initFieldDomRefs = () => {
    Object.keys(data).forEach((key) => {
      fieldDomRefs[key] = useRef();
    });
  };

  init();

  const getFieldData = (event) => {
    const { name, value } = event.target;
    const fieldName = name;
    const fieldValue = value;
    return { fieldName, fieldValue };
  };

  const handleChange = (event) => {
    const { fieldName, fieldValue } = getFieldData(event);
    setValues({ ...values, [fieldName]: fieldValue });
  };

  const handleBlur = async (event) => {
      if (event.relatedTarget && event.relatedTarget.type === 'submit') {
          return; // prevent field level validation on submit click
      }
      const { fieldName, fieldValue } = getFieldData(event);
      updateTouched(fieldName);
      const fieldError = validateFormField(fieldName, fieldValue, validationRules[fieldName],values);
      updateFormErrors(fieldName, fieldError);
  };

  const updateTouched = (fieldName) => {
      if (Object.keys(touched).indexOf(fieldName) === -1) {
          setTouched({ ...touched, [fieldName]: true });
      }
  };

  const updateFormErrors = (fieldName, fieldError) => {
      if (validationUtils.isEmpty(fieldError)) {
          const updatedErrors = { ...errors };
          delete updatedErrors[fieldName];
          setErrors(updatedErrors);
      } else {
          setErrors({ ...errors, ...fieldError });
      }
  };

  const markAllTouched = () => {
    const touchedData = {};
    Object.keys(data).forEach((key) => {
      touchedData[key] = true;
    });
    setTouched(touchedData);
  };

  const validateFormData = async () => {
      let isValid = false;
      const valuesToValidate={...values,...customFormValues};
      const validationErrors = await validateForm(valuesToValidate, validationRules);
      setErrors(validationErrors);
      focusFirstFieldWithError(validationErrors);
      isValid = validationUtils.isEmpty(validationErrors);
      return isValid;
  };

  const focusFirstFieldWithError = (validationErrors) => {
      if (!validationUtils.isEmpty(validationErrors)) {
          const firstFieldWithError = Object.keys(validationErrors)[0];
          if (fieldDomRefs[firstFieldWithError] && fieldDomRefs[firstFieldWithError].current) {
              fieldDomRefs[firstFieldWithError].current.focus();
          }
      }
  };

  const resetForm = () => {
    setValues(data);
    setErrors({});
    setTouched({});
  };

  return [
    errors,
    values,
    touched,
    fieldDomRefs,
    markAllTouched,
    handleChange,
    handleBlur,
    resetForm,
    validateFormData,
    setErrors,
    updateFormErrors
  ];
};

export default useValidation;
