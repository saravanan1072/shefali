import Button from "./Button";
import Dropdown from "./Dropdown";
import Input from "./Input";
import TextArea from "./Textarea";
import UploadInput from "./UploadInput";
import CreatableSelect from "./CreatableSelect";
import ToggleSwitch from "./ToggleSwitch";
import Autosuggest from "./AutoSuggestDropdown";
import RadioList from "./RadioList";
import MultiRangeSlider from "./MultiRangeSlider";
import { validateFormField } from "../../utils/validation";

const Form = ({
  formData,
  handleChange,
  handleBlur,
  formValues,
  formFields,
  autofillArray,
  setFormFields,
  repeatableArr,
  touchedArr,
  isRepeatable,
  formLabel,
  fieldTouched,
  setFieldTouched,
  touched,
  errors,
  validations,
  updateErrors,
}: {
  formData: any;
  handleChange?: any;
  handleBlur?: any;
  formValues?: any;
  formFields?: any;
  setFormFields?: (...args: unknown[]) => unknown;
  autofillArray?: Array<any>;
  index?: number;
  repeatableArr?: any;
  touchedArr?: any;
  isRepeatable?: boolean;
  formLabel?: string;
  touched?: any;
  fieldTouched?: any;
  errors?: any;
  validations?: any;
  updateErrors?: (...args: unknown[]) => unknown;
  setFieldTouched?: (...args: unknown[]) => unknown;
}) => {
  const handleFormChange = (event) => {
    if (isRepeatable) {
      const repeatableForm = [...repeatableArr];
      if (autofillArray?.length > 0) {
        repeatableForm[formData.formIndex][event.target.name] =
          event.target.value;
        const selectedEntry = autofillArray.find(
          (entry) => entry[event.target.name] === event.target.value
        );
        Object.keys(repeatableForm[formData.formIndex]).map((el) => {
          if (el !== event.target.name) {
            repeatableForm[formData.formIndex][el] =
              selectedEntry && selectedEntry[el];
          }
        });
        setFormFields({ ...formFields, [formLabel]: repeatableForm });
      } else {
        if (formData.elementType !== "FormToggleSwitch") {
          repeatableForm[formData.formIndex][event.target.name] =
            event.target.value;
        } else {
          repeatableForm[formData.formIndex][event.target.name] =
            event.target.checked;
        }
        setFormFields({ ...formFields, [formLabel]: repeatableForm });
      }
    } else if (formData.elementType === "FormCreatableDropdown") {
      const creatableArr = [];
      event.map((value) => {
        creatableArr.push(value.value);
      });
      setFormFields({ ...formFields, [formData.name]: creatableArr });
    } else {
      handleChange(event);
    }
  };

  const handleFormBlur = (event) => {
    if (isRepeatable) {
      const array = [...touchedArr];
      array[formData.formIndex][event.target.name] = true;
      setFieldTouched({ ...fieldTouched, [formLabel]: array });
      const fieldError = validateFormField(
        formLabel,
        formFields[formLabel],
        validations[formLabel],
        formValues
      );
      updateErrors(formLabel, fieldError);
    } else if (formData.elementType === "FormCreatableDropdown") {
      setFieldTouched({ ...fieldTouched, [formData.name]: true });
      const fieldError = validateFormField(
        formLabel,
        formFields[formData.name],
        validations[formData.name],
        formValues
      );
      updateErrors(formData.name, fieldError);
    } else {
      handleBlur(event);
    }
  };

  const getInputValue = (element) => {
    let value;
    if (formValues[element.name] !== undefined) {
      value = formValues[element.name];
    } else {
      const repeatArr = formValues[formLabel];
      if (repeatArr?.length > 0 && repeatArr[formData.formIndex]) {
        if (repeatArr[element.formIndex][element.name]) {
          value = repeatArr[element.formIndex][element.name];
        } else {
          value = "";
        }
      } else {
        value = repeatArr || "";
      }
    }
    return value;
  };

  const getTouchedValue = (element) => {
    let touchVal;
    if (touched[element.name]) {
      touchVal = touched[element.name];
    } else {
      const repeatArr = touched[formLabel];
      touchVal =
        repeatArr?.length > 0 && repeatArr[element.formIndex]
          ? repeatArr[element.formIndex][element.name]
          : "";
    }
    return touchVal;
  };

  const getErrors = (element) => {
    let error;
    if (errors[element.name]) {
      error = errors[element.name];
    } else {
      const repeatArr = errors[formLabel];
      error =
        repeatArr?.length > 0 && repeatArr[element.formIndex]
          ? repeatArr[element.formIndex][element.name]
          : "";
    }
    return error;
  };

  const renderSwitch = (element) => {
    switch (element.elementType) {
      case "FormInput":
        return (
          <div key={element.id}>
            <Input
              key={element.id}
              type={element.type}
              label={element.label}
              placeholder={element.placeholder}
              onChange={handleFormChange}
              className={element.className}
              onBlur={handleFormBlur}
              disablePaste={element.disablePaste}
              value={getInputValue(element)}
              name={element.name}
              touched={getTouchedValue(element)}
              error={getErrors(element)}
              disabled={element.disabled}
              width={element.width}
            />
          </div>
        );
      case "FormDropdown":
        return (
          <div key={element.id}>
            <Dropdown
              name={element.name}
              options={element.options}
              height={element.height}
              onChange={handleFormChange}
              className={element.className}
              value={getInputValue(element)}
              placeholder={element.placeholder}
              width={element.width}
              onBlur={handleFormBlur}
              error={getErrors(element)}
              touched={getTouchedValue(element)}
              key={element.id}
            />
          </div>
        );
      case "FormTextarea":
        return (
          <div>
            <TextArea
              key={element.id}
              placeholder={element.placeholder}
              onChange={handleFormChange}
              classname={element.className}
              onBlur={handleBlur}
              width={element.width}
              disablePaste={element.disablePaste}
              value={getInputValue(element)}
              name={element.name}
              touched={touched[element.name]}
              error={errors[element.name]}
            />
          </div>
        );
      case "FormUploadInput":
        return (
          <div>
            <UploadInput
              key={element.id}
              type={element.type}
              onChange={handleFormChange}
              className={element.className}
              placeholder={element.placeholder}
              acceptedFileTypes={element.accept}
              onBlur={handleBlur}
              value={getInputValue(element)}
              name={element.name}
              multiple={element.multiple}
              touched={touched[element.name]}
              error={errors[element.name]}
            />
          </div>
        );
      case "FormCreatableDropdown":
        return (
          <div>
            <CreatableSelect
              options={element.options}
              placeholder={element.placeholder}
              onChange={handleFormChange}
              width={element.width}
              value={getInputValue(element)}
              name={element.name}
              error={errors[element.name]}
              onBlur={handleBlur}
              canCreateNew={element.canCreateNew}
            />
          </div>
        );
      case "FormToggleSwitch":
        return (
          <div>
            <ToggleSwitch
              label={element.label}
              type={element.type}
              switchOnText={element.activeText}
              switchOffText={element.inactiveText}
              name={element.name}
              handleToggle={handleFormChange}
              value={getInputValue(element)}
              error={getErrors(element)}
            />
          </div>
        );
      case "FormAutosuggestDropdown":
        return (
          <div key={element.id}>
            <Autosuggest
              uniqueKey={element.id}
              placeholder={element.placeholder}
              onChange={handleFormChange}
              className={element.className}
              onBlur={handleFormBlur}
              value={getInputValue(element) || ""}
              name={element.name}
              suggestions={element.suggestionArray}
              error={getErrors(element)}
              touched={getTouchedValue(element)}
              popupData={element.popupData}
              popupClasses={element.popupClasses}
              width={element.width}
              canAddEntry={element.canAddEntry}
            />
          </div>
        );
      case "FormRadio":
        return (
          <div key={element.id}>
            <RadioList
              options={element.options}
              name={element.name}
              onChange={handleFormChange}
            />
          </div>
        );
      case "FormRangeSlider":
        return (
          <div key={element.id}>
            <MultiRangeSlider
              min={element.min}
              max={element.max}
              onChange={handleFormChange}
              name={element.name}
              minValue={getInputValue(element).min}
              maxValue={getInputValue(element).max}
              width={element.width}
            />
          </div>
        );
      case "FormButton":
        return (
          <Button
            type={element.type}
            size={element.size}
            onClick={element.handleClick}
            className={element.className}
            variant={element.variant}
          >
            {element.placeholder}
          </Button>
        );
      default:
        return null;
    }
  };

  return <div>{renderSwitch(formData)}</div>;
};

export default Form;
