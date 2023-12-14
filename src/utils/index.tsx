import { SyntheticEvent } from "react";
import { Dispatch } from "redux";
import {
  hideLoader,
  HIDE_LOADER,
  showLoader,
  SHOW_LOADER,
  SHOW_TOAST,
} from "../redux/common";

export const noOperation = (e?: Event | SyntheticEvent): void => {
  // no operation;
  if (e && typeof e.preventDefault === "function") e.preventDefault();
};

export const getError = (
  statusCode: number,
  message = ""
): Record<any, any> => {
  let errorMessage;
  switch (statusCode) {
    case 500:
      errorMessage =
        "Oops! Something went wrong. Please try again after some time.";
      break;
    case 502:
    case 503:
    case 504:
      errorMessage =
        "We're currently experiencing technical difficulties. Please try again later.";
      break;
    case 400:
      errorMessage = "Bad Request";
      break;
    case 401:
      errorMessage = "Your session timed out. Please re-login.";
      break;
    case 404:
      errorMessage =
        "Sorry! No policy data was found for the entered details. Try again.";
      break;
    default:
      errorMessage =
        message ||
        "Oops! Something went wrong. Please try again after some time.";
  }
  return { errorMessage };
};

let count = 0;
export const requestWrapper = async (
  request: Promise<any>,
  dispatch?: Dispatch,
  onSuccess?: (res: any) => void,
  onFailure?: (err: any) => any,
  loader: boolean = false,
  showToast: boolean = true
): Promise<any> => {
  let defaultError;
  let customErrorMessage;
  try {
    if (loader) {
      count += 1;
      dispatch<any>(showLoader());
    }
    const res = await request;

    if (loader) {
      count -= 1;
      if (!count) {
        dispatch<any>(hideLoader());
      }
    }
    if (res?.error) {
      if (showToast) {
        dispatch({
          type: SHOW_TOAST,
          payload: res?.error,
          // {
          //     description: err.message,
          //     toasterCb: defaultError?.toasterCb,
          //     ...(toastTime && { timer: toastTime }),
          // },
        });
      }
      // if (typeof onFailure === "function") {
      //   const customFailureObj = onFailure(res?.error);
      //   customErrorMessage = customFailureObj?.customErrorMessage;
      // }
      // defaultError = getError(res?.error?.code, customErrorMessage);
      // throw Object.assign(
      //   new Error(customErrorMessage || defaultError.errorMessage),
      //   {
      //     code: res?.error?.code,
      //   }
      // );
    } else if (typeof onSuccess === "function") {
      onSuccess(res);
      return res;
    }
    return res;
  } catch (err) {
    console.log(new Error(err));
    if (showToast) {
      dispatch({
        type: SHOW_TOAST,
        payload: err.message,
        // {
        //     description: err.message,
        //     toasterCb: defaultError?.toasterCb,
        //     ...(toastTime && { timer: toastTime }),
        // },
      });
    }
    // throw err;
  }
};

export const customizeEvent = (
  event: SyntheticEvent | Event,
  name: string,
  value: string | boolean | any[] | {}
): void => {
  Object.defineProperty(event, "target", {
    writable: true,
    value: {
      name: name,
      value: value,
    },
  });
};

export const generalizeDropdownOptions = (data) => {
  const res = data?.map((ele) => {
    {
      ele.value = ele.name;
    }
    return ele;
  });
  return res;
};

export const createFormdata = (data) => {
  const formData = new FormData();
  Object.keys(data).map((key) => {
    if (Array.isArray(data[key])) {
      formData.append(key, JSON.stringify(data[key]));
    } else {
      formData.append(key, data[key]);
    }
  });
  return formData;
};

export const isArrayOfObjects = (array) => {
  const isObject =
    Array.isArray(array) &&
    array?.every((el) => {
      if (typeof el === "object" && el !== null) {
        return true;
      } else {
        return false;
      }
    });
  return isObject;
};

export const technologyArray = (expertiseArray) => {
  const technologyArr = [];
  let technologyObj = {};
  expertiseArray.map((expertise, index) => {
    technologyObj = {
      id: index,
      label: expertise,
      value: expertise,
    };
    technologyArr.push(technologyObj);
  });
  return technologyArr;
};
