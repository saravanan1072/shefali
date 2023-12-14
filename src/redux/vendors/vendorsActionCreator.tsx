
import { AppThunk } from "../types";
import { API, API_CONFIG } from "../../apis";
import { requestWrapper } from "../../utils";
import { FETCH_VENDOR_DATA } from "./vendorsActionTypes";

export const saveVendorData =(data?:any):AppThunk=> async (dispatch) => {
  const response = await requestWrapper(
    API.post(API_CONFIG.URLS.VENDORS.CREATE_VENDOR,data),
    dispatch,
    null,
    (err) => {
        if (err.code === 400) {
            return {
                customErrorMessage: "Wrong data entered",
            };
        }
        if (err.code === 409) {
            return {
                customErrorMessage: err.message,
            };
        }
        return { customErrorMessage: '' };
    }
  );
  return response;
};

export const updateVendorData =(data?:any):AppThunk=> async (dispatch) => {
  const response = await requestWrapper(
    API.patch(API_CONFIG.URLS.VENDORS.UPDATE_VENDOR,data),
    dispatch,
    null,
    (err) => {
        if (err.code === 400) {
            return {
                customErrorMessage: "Wrong data entered",
            };
        }
        if (err.code === 409) {
            return {
                customErrorMessage: err.message,
            };
        }
        return { customErrorMessage: '' };
    }
  );
  return response;
};

export const fetchVendorData=(data?:any):AppThunk=> async (dispatch)=>{
  const response = await requestWrapper(
    API.get(API_CONFIG.URLS.VENDORS.FETCH_VENDOR,data),
    dispatch,
    (res) => {
      dispatch({
        type: FETCH_VENDOR_DATA,
        payload: res.data,
      });
    },
    undefined
  );
  return response;
}

export const deleteVendorData =(data?:any):AppThunk=> async (dispatch) => {
  const response = await requestWrapper(
    API.del(API_CONFIG.URLS.VENDORS.DELETE_VENDOR,data),
    dispatch,
    null,
    (err) => {
        if (err.code === 400) {
            return {
                customErrorMessage: "Wrong data entered",
            };
        }
        if (err.code === 409) {
            return {
                customErrorMessage: err.message,
            };
        }
        return { customErrorMessage: '' };
    }
  );
  return response;
};