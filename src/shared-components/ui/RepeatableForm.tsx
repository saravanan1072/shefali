import { useEffect, useState } from "react";
import Form from "./Form";

const RepeatableForm = ({
  formLabel,
  repeatableElement,
  handleChange,
  formValues,
  formFields,
  setFormFields,
  fieldTouched,
  touched,
  setFieldTouched,
  handleBlur,
  errors,
  editForm,
  validations,
  updateErrors,
}) => {
  const copyRepeatableEle = repeatableElement.map((el) => ({ ...el }));
  const [finalArr, setFinalArr] = useState(copyRepeatableEle);
  const [repeatableArr, setRepeatableArr] = useState([]);
  const [touchedArr, setTouchedArr] = useState([]);
  const [count, setCount] = useState(1);

  const populateRepeatingElements = (
    array,
    addToFormVal?: boolean,
    prefilledArr?: boolean,
    removeElementIndex?: boolean
  ) => {
    const arr = [...repeatableArr];
    let duplicateArr;
    const obj = {};
    array.map((arrEl) => {
      if (arrEl.elementType !== "FormButton") {
        if (arrEl.elementType !== "FormToggleSwitch") {
          obj[arrEl.name] = "";
        } else {
          obj[arrEl.name] = false;
        }
      }
    });

    if (addToFormVal) {
      setFormFields({
        ...formFields,
        [formLabel]: formFields[formLabel] && [...formFields[formLabel], obj],
      });
    }
    arr.push(obj);
    const clonedArr = arr.map((el) => ({ ...el }));
    setTouchedArr(clonedArr);
    if (prefilledArr) {
      if (removeElementIndex) {
        duplicateArr =
          (repeatableArr && repeatableArr.map((el) => ({ ...el }))) ||
          array.map((el) => ({ ...el }));
        duplicateArr.splice(removeElementIndex, 1);
        setRepeatableArr(duplicateArr);
      } else {
        setRepeatableArr(array);
      }
    } else {
      setRepeatableArr(arr);
    }
  };

  useEffect(() => {
    if (editForm && Object.keys(editForm).length > 0 && editForm[formLabel]) {
      let count = 1;
      const len = editForm[formLabel].length;
      for (let i = 1; i < len; i++) {
        repeatableElement.map((ele) => {
          finalArr.push({ ...ele, formIndex: ele.formIndex + count });
        });
        count++;
      }
      setCount(count);
      setFinalArr(finalArr);
      populateRepeatingElements(editForm[formLabel], true, true);
    }
  }, [editForm]);

  useEffect(() => {
    if (!editForm) {
      populateRepeatingElements(finalArr);
    }
  }, []);

  const handleAddClick = () => {
    setCount(count + 1);
    repeatableElement.map((ele) => {
      if (
        ele.elementType === "FormAutosuggestDropdown" &&
        ele.secondaryPlaceholder
      ) {
        finalArr.push({
          ...ele,
          placeholder: ele.secondaryPlaceholder,
          formIndex: ele.formIndex + count,
        });
      } else {
        finalArr.push({ ...ele, formIndex: ele.formIndex + count });
      }
    });
    populateRepeatingElements(repeatableElement, true);
    setFinalArr(finalArr);
  };

  const handleRemoveClick = (index) => {
    const filteredFinalArr = finalArr.filter((ele) => {
      return index !== 0 ? ele.formIndex !== index : finalArr;
    });
    filteredFinalArr.map((ele) => {
      if (index !== 0 && ele.formIndex > index) {
        ele.formIndex = ele.formIndex - 1;
      }
    });
    setFinalArr(filteredFinalArr);
    setCount(count - 1);
    if (index !== 0) {
      if (editForm) {
        populateRepeatingElements(editForm[formLabel], false, true, index);
        const duplicateArr =
          (repeatableArr && repeatableArr.map((el) => ({ ...el }))) ||
          editForm[formLabel].map((el) => ({ ...el }));
        duplicateArr.splice(index, 1);
        setFormFields({
          ...formFields,
          [formLabel]: duplicateArr,
        });
      } else {
        repeatableArr.splice(index, 1);
        touchedArr.splice(index, 1);
        formFields[formLabel].splice(index, 1);
        setFormFields({
          ...formFields,
          [formLabel]: formFields[formLabel],
        });
      }
    }
  };

  return (
    <div>
      {finalArr.map((ele) => {
        if (
          ele.elementType === "FormAutosuggestDropdown" &&
          ele.formIndex === 0
        ) {
          let obj = repeatableElement.find(
            (val) => val.elementType === "FormAutosuggestDropdown"
          );
          ele.suggestionArray = obj.suggestionArray;
        }

        if (ele.elementType === "FormButton" && ele.goal === "ADD") {
          ele.handleClick = handleAddClick;
        } else if (ele.elementType === "FormButton" && ele.goal === "REMOVE") {
          if (ele.formIndex === 0) {
            ele.className = "hidden";
          } else {
            ele.handleClick = () => handleRemoveClick(ele.formIndex);
          }
        }
        return (
          <>
            <Form
              formData={ele}
              repeatableArr={repeatableArr}
              touchedArr={touchedArr}
              handleChange={handleChange}
              formValues={formValues}
              formFields={formFields}
              setFormFields={setFormFields}
              formLabel={formLabel}
              touched={touched}
              isRepeatable
              fieldTouched={fieldTouched}
              setFieldTouched={setFieldTouched}
              handleBlur={handleBlur}
              errors={errors}
              validations={validations}
              updateErrors={updateErrors}
              autofillArray={
                ele.elementAction === "autofill" && ele.suggestionArray
              }
            />
          </>
        );
      })}
    </div>
  );
};

export default RepeatableForm;
