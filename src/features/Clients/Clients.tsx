import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  formSubmitClicked,
  hidePopup,
  newEntryCreated,
  saveAccountManagerDetails,
  saveLocationDetails,
  showPopup,
} from "../../redux/common";
import { RootState } from "../../redux/types";
import { createFormdata, generalizeDropdownOptions } from "../../utils";
import { clientConfiguration, submitBtnConfig } from "../../constants/config";
import FormRender from "../utils/formRender";
import { clientAcknowledgementConfig } from "../../constants/AcknowledgementConfig";
import { useRouter } from "next/router";
import { clientValidations } from "./clientValidations";
import { createClientData, fetchClientData, updateClientData } from "../../redux/clients";

const Clients = ({
  clientClassName,
  prefilledVals,
  creatingNewEntry = false,
  setUpdateData,
}: {
  clientClassName?: string;
  prefilledVals?: any;
  creatingNewEntry?: boolean;
  setUpdateData?: any;
}) => {
  const dispatch = useDispatch();
  const commonState: any = useSelector((state: any): RootState => state.common);
  const [formFilledVals, setFormFilledVals] = useState();
  const [locationArr, setLocationArr] = useState(commonState.locationArray);
  const [response, setResponse] = useState({});
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    if (commonState.locationArray?.length === 0) {
      dispatch<any>(saveLocationDetails());
    }
    if (commonState.accountManagerArray?.length === 0) {
      dispatch<any>(saveAccountManagerDetails());
    }
    if (setUpdateData) {
      setUpdateData(false);
    }
  }, []);

  useEffect(() => {
    const locationData = commonState.locationArray?.data;
    const res = generalizeDropdownOptions(locationData);
    setLocationArr(res);
  }, [commonState.locationArray]);

  let prefilledData = prefilledVals || (id && formFilledVals);
  const copyObj = prefilledData && JSON.parse(JSON.stringify(prefilledData));

  useEffect(() => {
    (async () => {
      if (id) {
        const filter = { clientDetailsID: id };
        const response = await dispatch<any>(fetchClientData(filter));
        const managerArr = [];
        response?.data[0]?.accountManager.map((ele, index) => {
          managerArr[index] = { name: ele.managerID?.name };
        });
        setFormFilledVals({ ...response?.data[0], accountManager: managerArr });
      }
    })();
  }, [id]);

  const accountManagerArray = () => {
    const managerArr = [];
    commonState.accountManagerArray.data &&
      commonState.accountManagerArray.data.map((manager) => {
        managerArr.push(manager.name);
      });
    return managerArr;
  };

  const createClientHandler = async (data) => {
    let obj = {};
    let managerArr = [];
    Object.keys(data).map((ele) => {
      if (Array.isArray(data[ele])) {
        data[ele].map((val, index) => {
          if (typeof val === "object") {
            Object.keys(val).map((prop) => {
              if (val[prop] === "") {
                delete val[prop];
              }
              if (prop === "name") {
                const selectedManager =
                  commonState.accountManagerArray.data.length > 0 &&
                  commonState.accountManagerArray.data?.find(
                    (manager) => manager.name === val[prop]
                  );
                obj = { managerID: selectedManager?._id };
                managerArr[index] = obj;
              }
            });
          }
        });
      } else if (data[ele] === "") {
        delete data[ele];
      }
    });

    const paymentTerms = `${data.paymentTerms?.min}-${data.paymentTerms?.max} days`;
    const finalData =
      Object.keys(obj).length > 0
        ? {
            ...data,
            accountManager: managerArr,
            paymentTerms,
          }
        : {
            ...data,
            paymentTerms,
          };
    dispatch<any>(formSubmitClicked());
    const formData = createFormdata(finalData);
    // if (creatingNewEntry) {
    //   dispatch<any>(newEntryCreated());
    // }
    const response = await dispatch<any>(createClientData(formData));
    setResponse(response);
  };

  const updateClientHandler = async (data) => {
    const updateObject: any = {};
    let response;
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
        if(ele==="paymentTerms"){
         data[ele] = `${data[ele]?.min}-${data[ele].max} days`;
        }
        if (data[ele] !== prefilledData[ele]) {
          updateObject[ele] = data[ele];
        }
      }
    });
    updateObject["id"] = prefilledData["_id"];
    if (updateObject["accountManager"]?.length > 0) {
      let obj = {};
      let arr = [];
      updateObject["accountManager"].map((manager, index) => {
        const selectedManager =
          commonState.accountManagerArray.data.length > 0 &&
          commonState.accountManagerArray.data?.find(
            (managerData) => managerData.name === manager.name
          );
        obj = { managerID: selectedManager?._id };
        arr[index] = obj;
      });
      updateObject["accountManager"] = arr;
    }
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
      response = await dispatch<any>(updateClientData(formData));
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

  const finalPaymentTerms = (data) => {
    const arr = data?.split(" ");
    const finalArr = arr?.length > 0 && arr[0]?.split("-");
    return finalArr;
  };

  const paymentTermsArr = finalPaymentTerms(prefilledData?.paymentTerms);
  const accountManagerNames = accountManagerArray();
  const formData = clientConfiguration(locationArr, accountManagerNames);
  const columns = 2;

  return (
    <FormRender
      formHeading="Client details"
      formLabelStyle="text-xl mb-4"
      formData={formData}
      formColumn={columns}
      btnConfig={submitBtnConfig("Proceed")}
      headingStyle={clientClassName}
      initialStaticData={{
        clientName: "",
        location: "",
        nda: "",
        notes: "",
        paymentTerms: { min: 1, max: 45 },
      }}
      initialCustomStaticData={{
        contactDetails: [
          {
            name: "",
            email: "",
            phoneNumber: "",
            designation: "",
            isPrimary: false,
          },
        ],
        accountManager: [{ name: "" }],
      }}
      updatedState={
        prefilledData && {
          clientName: prefilledData.clientName,
          location: prefilledData.location,
          paymentTerms: { min: paymentTermsArr[0], max: paymentTermsArr[1] },
          nda: prefilledData.nda,
          notes: prefilledData.notes,
        }
      }
      customUpdatedState={
        prefilledData && {
          contactDetails: finalContactDetails(prefilledData?.contactDetails),
          accountManager: prefilledData.accountManager,
        }
      }
      submitForm={prefilledData ? updateClientHandler : createClientHandler}
      formResponse={response}
      validations={clientValidations}
      acknowledgementData={clientAcknowledgementConfig}
      editForm={prefilledData && prefilledData}
    />
  );
};

export default Clients;
