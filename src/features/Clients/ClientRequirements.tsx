import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  formSubmitClicked,
  hidePopup,
  newEntryCreated,
  saveExpertiseDetails,
  showPopup,
} from "../../redux/common";
import { RootState } from "../../redux/types";
import { createFormdata, technologyArray } from "../../utils";
import {
  clientRequirementsConfiguration,
  submitBtnConfig,
} from "../../constants/config";
import FormRender from "../utils/formRender";
import { clientRequirementsAcknowledgementConfig } from "../../constants/AcknowledgementConfig";
import { useRouter } from "next/router";
import { contractDurationArray, workLocationArray } from "../../constants";
import { clientRequirementsValidations } from "./clientRequirementsValidations";
import {
  createClientRequirement,
  fetchClientData,
  fetchClientRequirementData,
  updateClientRequirementData,
} from "../../redux/clients";

const ClientRequirements = ({
  clientRequirementsClassName,
  prefilledVals,
  creatingNewEntry = false,
  setUpdateData,
}: {
  clientRequirementsClassName?: string;
  prefilledVals?: any;
  creatingNewEntry?: boolean;
  setUpdateData?: any;
}) => {
  const dispatch = useDispatch();
  const commonState: any = useSelector((state: any): RootState => state.common);
  const clientState: any = useSelector((state: any): RootState => state.client);
  const [formFilledVals, setFormFilledVals] = useState({});
  const [response, setResponse] = useState({});
  const [dependentValue, setDependentValue] = useState("");

  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (commonState.expertiseArray.length === 0) {
      dispatch<any>(saveExpertiseDetails());
    }

    if (clientState.clientArray.length === 0) {
      dispatch<any>(fetchClientData());
    }

    if (setUpdateData) {
      setUpdateData(false);
    }
  }, []);

  const clientNamesArray = () => {
    const clientArr = [];
    const clientObj = { id: "", name: "" };
    let finalObj = {};
    clientState.clientArray.map((client) => {
      finalObj = { ...clientObj, id: client._id, name: client.clientName };
      clientArr.push(finalObj);
    });
    return clientArr;
  };

  useEffect(() => {
    (async () => {
      if (id) {
        const filter = { clientRequirementId: id };
        const response = await dispatch<any>(
          fetchClientRequirementData(filter)
        );
        const name = response?.data[0].clientName.clientName;
        const budgetArr = response?.data[0].budget.split("-");
        setFormFilledVals({
          ...response?.data[0],
          clientName: name,
          minBudget: budgetArr[0],
          maxBudget: budgetArr[1],
        });
      }
    })();
  }, [id]);

  const prefilledData = prefilledVals || (id && formFilledVals);
  const copyObj = prefilledData && JSON.parse(JSON.stringify(prefilledData));

  const getFormVals = (formVal) => {
    setDependentValue(formVal);
  };

  const contactPersonNamesArray = () => {
    const contactArr = [];
    const contactObj = {
      id: "",
      name: "",
      email: "",
      phoneNumber: "",
      designation: "",
      isPrimary: false,
    };
    let finalObj = {};
    const selectedClient = clientState.clientArray.find(
      (client) => client.clientName === dependentValue
    );
    selectedClient?.contactDetails.map((el) => {
      finalObj = {
        ...contactObj,
        id: el._id,
        name: el.name,
        email: el.email,
        phoneNumber: el.phoneNumber !== 0 ? el.phoneNumber : "",
        designation: el.designation,
        isPrimary: el.isPrimary,
      };
      contactArr.push(finalObj);
    });
    return contactArr;
  };

  const createClientRequirementHandler = async (data) => {
    const contactDetailsArr = [];
    const selectedClient = clientList.find(
      (client) => client.name === data.clientName
    );
    Object.keys(data).map((ele) => {
      if (Array.isArray(data[ele])) {
        data[ele].map((val) => {
          if (typeof val === "object") {
            Object.keys(val).map((prop) => {
              if (val[prop] === "") {
                delete val[prop];
              }
              if (prop === "name") {
                const selectedContact = contactPersonsArray?.find(
                  (contact) => contact.name === val[prop]
                );
                contactDetailsArr.push(selectedContact?.id);
              }
            });
          }
        });
      } else if (data[ele] === "") {
        delete data[ele];
      }
    });
    const experience = `${data.experience?.min}-${data.experience?.max} years`;
    const budget = `${data.minBudget}-${data.maxBudget}`;
    const finalData = {
      clientName: selectedClient?.id,
      experience,
      budget,
      contactPersonDetails: contactDetailsArr,
      jd: data.jd,
      technology: data?.technology,
      workLocation: data?.workLocation,
      contractDuration: data?.contractDuration,
      openPositions: data?.openPositions,
    };
    dispatch<any>(formSubmitClicked());

    const formData = createFormdata(finalData);
    if (creatingNewEntry) {
      dispatch<any>(newEntryCreated());
    }
    const response = await dispatch<any>(createClientRequirement(formData));
    setResponse(response);
  };

  const updateClientRequirementHandler = async (data) => {
    const updateObject: any = {};
    let response;
    data.experience = `${data.experience?.min}-${data.experience?.max} years`;
    data.budget = `${data.minBudget}-${data.maxBudget}`;
    Object.keys(data).map((ele) => {
      if (Array.isArray(data[ele])) {
        data[ele].map((val, index) => {
          if (typeof val === "object") {
            Object.keys(val).map((prop) => {
              if (val[prop] === "" || prop === "_id") {
                delete val[prop];
              }
              if (
                prefilledData &&
                copyObj[ele][index] &&
                (copyObj[ele][index][prop] === "" || prop === "_id")
              ) {
                delete copyObj[ele][index][prop];
              }
              if (
                !copyObj[ele][index] ||
                (copyObj[ele][index] && val[prop] !== copyObj[ele][index][prop])
              ) {
                updateObject[ele] = data[ele];
                return;
              }
            });
          }
        });
        copyObj[ele].map((val, index) => {
          if (!data[ele][index]) {
            updateObject[ele] = data[ele];
          }
        });
      } else {
        if (data[ele] === "") {
          delete data[ele];
        }
        if (prefilledData[ele] === "") {
          delete prefilledData[ele];
        }
        if (ele === "minBudget") {
          delete data.minBudget;
        }
        if (ele === "maxBudget") {
          delete data.maxBudget;
        }
        if (data[ele] !== prefilledData[ele]) {
          updateObject[ele] = data[ele];
        }
      }
    });
    const selectedClient = clientList.find(
      (client) => client.name === updateObject?.clientName
    );
    if (selectedClient) {
      updateObject["clientName"] = selectedClient?.id;
    } else {
      delete updateObject["clientName"];
    }
    updateObject["id"] = prefilledData["_id"];
    if (id && Object.keys(updateObject).length === 1) {
      dispatch<any>(
        showPopup({
          title: "",
          description: "No entry has been updated.How do you want to proceed?",
          btnArray: [
            {
              variant: "secondary",
              onClick: () => {
                dispatch<any>(hidePopup());
                return;
              },
              children: "Continue editing",
            },
            {
              variant: "primary",
              onClick: () => {
                location.replace(location.pathname);
              },
              children: "Create new entry",
            },
          ],
        })
      );
    } else if (!id && Object.keys(updateObject).length === 1) {
      dispatch<any>(hidePopup());
    }
    if (Object.keys(updateObject).length > 1) {
      const formData = createFormdata(updateObject);
      dispatch<any>(formSubmitClicked());
      response = await dispatch<any>(updateClientRequirementData(formData));
      if (response && setUpdateData) {
        setUpdateData(true);
      }
    }
    setResponse(response);
  };

  const finalContactDetails = (data) => {
    data?.map((el) => {
      if (el["phoneNumber"] === 0) {
        el["phoneNumber"] = "";
      }
    });
    return data;
  };

  const finalValue = (data) => {
    const arr = data?.split(" ");
    const finalArr = arr?.length > 0 && arr[0]?.split("-");
    return finalArr;
  };

  const experienceArr = finalValue(prefilledData?.experience);
  const budgetArr = finalValue(prefilledData?.budget);
  const technologyList = technologyArray(commonState?.expertiseArray);
  const clientList = clientNamesArray();
  const contactPersonsArray = contactPersonNamesArray();
  const formData = clientRequirementsConfiguration(
    clientList,
    contactPersonsArray,
    technologyList,
    workLocationArray,
    contractDurationArray
  );
  const columns = 2;
  return (
    <FormRender
      formHeading="Client requirements"
      formLabelStyle="text-xl mb-4"
      formData={formData}
      formColumn={columns}
      btnConfig={submitBtnConfig("Proceed")}
      headingStyle={clientRequirementsClassName}
      initialStaticData={{
        clientName: "",
        minBudget: "",
        maxBudget: "",
        jd: "",
        openPositions: "",
        experience: { min: 0, max: 25 },
        contractDuration: "",
        workLocation: "",
      }}
      initialCustomStaticData={{
        contactPersonDetails: [
          {
            name: "",
            email: "",
            phoneNumber: "",
            designation: "",
            isPrimary: false,
          },
        ],
        technology: "",
      }}
      updatedState={
        prefilledData && {
          clientName:
            prefilledData.clientName?.clientName || prefilledData.clientName,
          minBudget: prefilledData?.minBudget || budgetArr[0],
          maxBudget: prefilledData?.maxBudget || budgetArr[1],
          jd: prefilledData.jd,
          openPositions: prefilledData.openPositions,
          contractDuration: prefilledData.contractDuration,
          workLocation: prefilledData.workLocation,
          experience: { min: experienceArr[0], max: experienceArr[1] },
        }
      }
      customUpdatedState={
        prefilledData && {
          contactPersonDetails: finalContactDetails(
            prefilledData?.clientName?.contactPersonDetails ||
              prefilledData?.contactPersonDetails
          ),
          technology: prefilledData.technology,
        }
      }
      formKeyDependent="clientName"
      submitForm={
        prefilledData
          ? updateClientRequirementHandler
          : createClientRequirementHandler
      }
      formResponse={response}
      validations={clientRequirementsValidations}
      acknowledgementData={clientRequirementsAcknowledgementConfig}
      editForm={prefilledData && prefilledData}
      getFormVals={getFormVals}
    />
  );
};

export default ClientRequirements;
