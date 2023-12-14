import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formSubmitClicked, resetSubmitClick } from "../../redux/common";
import { RootState } from "../../redux/types";
import PreviewScreen from "../../shared-components/components/PreviewScreen";
import useValidation from "../../shared-components/components/useValidation";
import Button from "../../shared-components/ui/Button";
import Form from "../../shared-components/ui/Form";
import RepeatableForm from "../../shared-components/ui/RepeatableForm";

const FormRender = ({
  formHeading,
  formData,
  formLabelStyle = "text-xl mb-4",
  formColumn,
  headingStyle,
  initialStaticData,
  initialCustomStaticData,
  btnConfig,
  validations,
  updatedState,
  customUpdatedState,
  acknowledgementData,
  formResponse,
  formKeyDependent,
  editForm,
  submitForm,
  resetFormHandler,
  getFormVals,
}: {
  formHeading?: string;
  formData: any;
  formLabelStyle?: string;
  formColumn?: number;
  headingStyle: string;
  initialStaticData: any;
  initialCustomStaticData?: any;
  btnConfig?: any;
  formKeyDependent?: string;
  validations?: any;
  updatedState?: any;
  customUpdatedState?: any;
  acknowledgementData?: any;
  formResponse?: any;
  editForm?: boolean;
  submitForm?: (_) => void;
  resetFormHandler?: (_) => any;
  getFormVals?: (_) => any;
}) => {
  const [initialFormData, setInitialFormData] = useState({
    ...initialStaticData,
  });
  const [formFieldVals, setFormFieldVals] = useState({
    ...initialCustomStaticData,
  });
  const [
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
    updateFormErrors,
  ] = useValidation(initialFormData, validations, formFieldVals);

  useEffect(() => {
    if (commonState.formBtnClicked) {
      dispatch<any>(resetSubmitClick());
    }
  }, []);

  const [fieldTouched, setFieldTouched] = useState({});
  let formValues = { ...values, ...formFieldVals };
  const formTouched = { ...touched, ...fieldTouched };
  const [finalFormValues, setFinalFormValues] = useState(formValues);

  useEffect(() => {
    if (updatedState) {
      setInitialFormData(updatedState);
    }
    if (customUpdatedState) {
      setFormFieldVals(customUpdatedState);
    }
  }, [updatedState, customUpdatedState]);

  useEffect(() => {
    if (formKeyDependent) {
      getFormVals(formValues[formKeyDependent]);
    }
  }, [formValues[formKeyDependent]]);

  const dispatch = useDispatch();
  const commonState: any = useSelector((state: any): RootState => state.common);

  const markFieldsTouched = () => {
    const touchedData = {};
    Object.keys(formFieldVals).map((key) => {
      Array.isArray(formFieldVals[key]) &&
        formFieldVals[key].map((el) => {
          {
            Object.keys(el).forEach((val) => {
              touchedData[val] = true;
            });
          }
        });
    });
    setFieldTouched(touchedData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    markAllTouched();
    markFieldsTouched();
    let isValid = await validateFormData();
    if (!isValid) {
      return;
    }
    submitForm(formValues);
    setFinalFormValues(formValues);
  };

  const resetDataHandler = () => {
    const data = resetFormHandler(formValues);
    if (data.val) {
      if (data.function) {
        dispatch(data.function());
      }
      resetForm();
    }
  };

  const acknowledgementDataHandler = () => {
    let acknowledgementObj = {};
    console.log(finalFormValues);
    Object.keys(finalFormValues).length > 0 &&
      Object.keys(finalFormValues).map((el) => {
        acknowledgementData &&
          Object.keys(acknowledgementData).map((formLabel) => {
            if (
              typeof acknowledgementData[formLabel] !== "object" &&
              acknowledgementData[formLabel] === el &&
              finalFormValues[el]
            ) {
              acknowledgementObj = {
                ...acknowledgementObj,
                [formLabel]: finalFormValues[el],
              };
            } else if (
              typeof acknowledgementData[formLabel] === "object" &&
              acknowledgementData[formLabel].showPreview &&
              finalFormValues[acknowledgementData[formLabel].name]
            ) {
              acknowledgementObj = {
                ...acknowledgementObj,
                [formLabel]: {
                  val: finalFormValues[acknowledgementData[formLabel].name],
                  showPreview: true,
                },
              };
            } else if (
              typeof acknowledgementData[formLabel] === "object" &&
              acknowledgementData[formLabel].formatRange &&
              finalFormValues[acknowledgementData[formLabel].name]
            ) {
              acknowledgementObj = {
                ...acknowledgementObj,
                [formLabel]: {
                  val: finalFormValues[acknowledgementData[formLabel].name],
                  formatRange: true,
                  suffix: acknowledgementData[formLabel].suffix,
                },
              };
            }
          });
      });
    return acknowledgementObj;
  };

  const formRender = (formDataList, formFieldsLabel) => {
    let form;
    form =
      Array.isArray(formDataList) &&
      formDataList?.map((formEle) => {
        if (formEle.elementType === "RepeatableForm") {
          return (
            <RepeatableForm
              formLabel={formEle.name}
              repeatableElement={formEle.content}
              handleChange={handleChange}
              formValues={formValues}
              formFields={formFieldVals}
              setFormFields={setFormFieldVals}
              fieldTouched={fieldTouched}
              setFieldTouched={setFieldTouched}
              touched={formTouched}
              handleBlur={handleBlur}
              errors={errors}
              validations={validations}
              updateErrors={updateFormErrors}
              editForm={editForm}
            />
          );
        } else {
          return (
            <Form
              formData={formEle}
              handleChange={handleChange}
              formValues={formValues}
              formFields={formFieldVals}
              setFormFields={setFormFieldVals}
              touched={formTouched}
              handleBlur={handleBlur}
              errors={errors}
              validations={validations}
              updateErrors={updateFormErrors}
            />
          );
        }
      });

    return (
      <div>
        <div className={formLabelStyle}>
          {formFieldsLabel !== "noLabel" ? formFieldsLabel : ""}
        </div>
        <div>{form}</div>
      </div>
    );
  };

  return (
    <div>
      {commonState.formBtnClicked && !commonState.popup.visible ? (
        <PreviewScreen
          heading="Preview details"
          formData={acknowledgementDataHandler()}
          formColumn={formColumn}
          status={formResponse}
        />
      ) : (
        <div>
          {formHeading && (
            <h3 className={`font-bold text-3xl ${headingStyle}`}>
              {formHeading}
            </h3>
          )}
          <form noValidate>
            <div className={`grid form-grid w-full`}>
              {Object.keys(formData).map((formFieldsLabel) =>
                formRender(formData[formFieldsLabel], formFieldsLabel)
              )}
            </div>
            {btnConfig.map((btn) => (
              <Button
                type={btn.type}
                size={btn.size}
                onClick={
                  btn.type === "reset"
                    ? resetDataHandler
                    : btn.onClick || handleSubmit
                }
                variant={btn.variant}
                className={`${btn.className}`}
              >
                {btn.children}
              </Button>
            ))}
          </form>
        </div>
      )}
      <style jsx>{`
        .form-grid {
          grid-template-columns: repeat(${formColumn || 1}, 1fr);
          grid-auto-columns: 50px;
        }
        .label-font {
          font-size: 14px;
        }
        @media screen and (max-width: 768px) {
          .form-grid {
            grid-template-columns: repeat(1, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default FormRender;
