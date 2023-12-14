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
import {
  fetchVendorData,
  saveVendorData,
  updateVendorData,
} from "../../redux/vendors";
import {
  submitBtnConfig,
  vendorConfiguration,
} from "../../constants/config";
import FormRender from "../utils/formRender";
import { vendorValidations } from "./vendorValidations";
import { vendorAcknowledgementConfig } from "../../constants/AcknowledgementConfig";
import { useRouter } from "next/router";

const Vendors = ({
  vendorClassName,
  prefilledVals,
  creatingNewEntry = false,
  setUpdateData,
}: {
  vendorClassName?: string;
  prefilledVals?: any;
  creatingNewEntry?: boolean;
  setUpdateData?: any;
}) => {
  const dispatch = useDispatch();
  const commonState: any = useSelector((state: any): RootState => state.common);
  const [formFilledVals, setFormFilledVals] = useState({});
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

  useEffect(() => {
    (async () => {
      if (id) {
        const filter = { vendorID: id };
        const response = await dispatch<any>(fetchVendorData(filter));
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
  const prefilledData = prefilledVals || (id && formFilledVals);
  const copyObj = prefilledData && JSON.parse(JSON.stringify(prefilledData));

  const createVendorHandler = async (data) => {
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

    const finalData =
      Object.keys(obj).length > 0
        ? { ...data, accountManager: managerArr }
        : data;
    dispatch<any>(formSubmitClicked());

    const formData = createFormdata(finalData);
    if (creatingNewEntry) {
      dispatch<any>(newEntryCreated());
    }
    const response = await dispatch<any>(saveVendorData(formData));
    setResponse(response);
  };

  const updateVendorHandler = async (data) => {
    const updateObject: any = {};
    let response;
    Object.keys(data).map((ele) => {
      if (Array.isArray(data[ele])) {
        data[ele].map((val, index) => {
          if (typeof val === "object") {
            Object.keys(val).map((prop) => {
              if (val[prop] === ""||prop==="_id") {
                delete val[prop];
              }
              if (
                prefilledData &&
                copyObj[ele][index] &&
                (copyObj[ele][index][prop] === ""||prop==="_id")
              ) {
                delete copyObj[ele][index][prop];
              }
              if (
                !copyObj[ele][index] ||
                (copyObj[ele][index] &&
                  val[prop] !== copyObj[ele][index][prop])
              ) {
                updateObject[ele] = data[ele];
                return;
              }
            });
          }
        });
        copyObj[ele].map((val,index)=>{
          if(!data[ele][index]){
            updateObject[ele] = data[ele];
          }
        })
      } else {
        if (data[ele] === "") {
          delete data[ele];
        }
        if (prefilledData[ele] === "") {
          delete prefilledData[ele];
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
    if (id && Object.keys(updateObject).length===1) {
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
      response = await dispatch<any>(updateVendorData(formData));
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

  const accountManagerNames = accountManagerArray();
  const formData = vendorConfiguration(locationArr, accountManagerNames);
  const columns = 2;
  return (
    <FormRender
      formHeading="Vendor details"
      formLabelStyle="text-xl mb-4"
      formData={formData}
      formColumn={columns}
      btnConfig={submitBtnConfig("Proceed")}
      headingStyle={vendorClassName}
      initialStaticData={{
        companyName: "",
        location: "",
        paymentTerms: "",
        nda: "",
        notes: "",
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
          companyName: prefilledData.companyName,
          location: prefilledData.location,
          paymentTerms: prefilledData.paymentTerms,
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
      submitForm={prefilledData ? updateVendorHandler : createVendorHandler}
      formResponse={response}
      validations={vendorValidations}
      acknowledgementData={vendorAcknowledgementConfig}
      editForm={prefilledData && prefilledData}
    />
  );
};

export default Vendors;
