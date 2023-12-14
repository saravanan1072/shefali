import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/types";
import {
  fetchResourceData,
  saveResourceData,
  updateResourceData,
} from "../../redux/resources";
import {
  resourceConfiguration,
  submitBtnConfig,
} from "../../constants/config";
import FormRender from "../utils/formRender";
import { useEffect, useState } from "react";
import { fetchVendorData } from "../../redux/vendors";
import {
  formSubmitClicked,
  hidePopup,
  saveExpertiseDetails,
  showPopup,
} from "../../redux/common";
import { createFormdata, technologyArray } from "../../utils";
import { resourceValidations } from "./resourceValidations";
import { resourceAcknowledgementConfig } from "../../constants/AcknowledgementConfig";
import { useRouter } from "next/router";

const Resources = ({
  resourceClassName,
  prefilledVals,
  setUpdateData,
}: {
  resourceClassName?: string;
  prefilledVals?: any;
  setUpdateData?: any;
}) => {
  const dispatch = useDispatch();
  const [response, setResponse] = useState({});
  const { vendorArray }: any = useSelector(
    (state: any): RootState => state.vendor
  );
  const common: any = useSelector((state: any): RootState => state.common);
  const vendor: any = useSelector((state: any): RootState => state.vendor);
  const {
    query: { id },
  } = useRouter();
  const [formFilledVals, setFormFilledVals] = useState({});

  const vendorNamesArray = () => {
    const vendorArr = [];
    const vendorObj = { id: "", name: "" };
    let finalObj = {};
    vendorArray.map((vendor) => {
      finalObj = { ...vendorObj, id: vendor._id, name: vendor.companyName };
      vendorArr.push(finalObj);
    });
    return vendorArr;
  };

  const vendorList = vendorNamesArray();
  const technologyList = technologyArray(common?.expertiseArray);
  const prefilledData = prefilledVals || (id && formFilledVals);

  useEffect(() => {
    if (vendor.vendorArray.length === 0) {
      dispatch<any>(fetchVendorData());
    }
    if (common.expertiseArray.length === 0) {
      dispatch<any>(saveExpertiseDetails());
    }
    if (setUpdateData) {
      setUpdateData(false);
    }
  }, []);

  useEffect(() => {
    if (common.newEntry) {
      dispatch<any>(fetchVendorData());
    }
  }, [common.newEntry]);

  useEffect(() => {
    (async () => {
      if (id) {
        const filter = { resourceId: id };
        const response = await dispatch<any>(fetchResourceData(filter));
        setFormFilledVals({...response?.data[0],vendor:response.data[0].vendor.companyName})
      }
    })();
  }, [id]);

  const createResourceHandler = async (data) => {
    Object.keys(data).map((ele) => {
      if (data[ele] === "") {
        delete data[ele];
      }
    });
    const selectedVendor = vendorList.find(
      (vendor) => vendor.name === data.vendor
    );
    const finalData = { ...data, vendor: selectedVendor?.id };
    dispatch<any>(formSubmitClicked());
    const formData = createFormdata(finalData);
    const response = await dispatch<any>(saveResourceData(formData));
    setResponse(response);
  };

  const updateResourceHandler = async (data) => {
    let response;
    const updateObject: any = {};
    Object.keys(data).map((ele) => {
      if (data[ele] === "") {
        delete data[ele];
      }
      if (
        prefilledData[ele] === "" ||
        (ele === "vendorCosting" && prefilledData[ele] === 0)
      ) {
        delete prefilledData[ele];
      }
      if (Array.isArray(data[ele])) {
        if (JSON.stringify(data[ele]) !== JSON.stringify(prefilledData[ele])) {
          updateObject[ele] = data[ele];
        }
      } else {
        if (data[ele] !== prefilledData[ele]) {
          updateObject[ele] = data[ele];
        }
      }
    });
    const selectedVendor = vendorList.find(
      (vendor) => vendor.name === updateObject?.vendor
    );
    if (selectedVendor) {
      updateObject["vendor"] = selectedVendor?.id;
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
      response = await dispatch<any>(updateResourceData(formData));
      if (response && setUpdateData) {
        setUpdateData(true);
      }
    }
    setResponse(response);
  };

  const formData = resourceConfiguration(vendorList, technologyList);

  return (
    <>
      <FormRender
        formHeading="Developer details"
        formData={formData}
        formColumn={2}
        formLabelStyle="text-xl mb-4"
        headingStyle={resourceClassName}
        btnConfig={submitBtnConfig("Register")}
        initialStaticData={{
          resourceName: "",
          experience: "",
          vendorCosting: "",
          contactNumber: "",
          emailId: "",
          vendor: "",
          resume: "",
          availability: "",
          notes: "",
        }}
        initialCustomStaticData={{
          technology: "",
        }}
        updatedState={
          prefilledData && {
            resourceName: prefilledData.resourceName,
            experience: prefilledData.experience,
            vendorCosting:
              prefilledData.vendorCosting !== 0
                ? prefilledData.vendorCosting
                : "",
            contactNumber: prefilledData.contactNumber,
            emailId: prefilledData.emailId,
            vendor: prefilledData.vendor,
            resume: prefilledData.resume,
            availability: prefilledData.availability,
            notes: prefilledData.notes,
          }
        }
        formResponse={response}
        customUpdatedState={
          prefilledData && {
            technology: prefilledData.technology,
          }
        }
        submitForm={
          prefilledData ? updateResourceHandler : createResourceHandler
        }
        validations={resourceValidations}
        acknowledgementData={resourceAcknowledgementConfig}
      />
    </>
  );
};

export default Resources;
