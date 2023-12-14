
import { AppThunk } from "../types";
import { API, API_CONFIG } from "../../apis";
import { requestWrapper } from "../../utils";
import { FETCH_RESOURCE_DATA } from "./resourcesActionTypes";

export const saveResourceData = (data?:any):AppThunk=> async (dispatch)=>{
  const response = await requestWrapper(
    API.post(API_CONFIG.URLS.RESOURCES.CREATE_RESOURCE,data),
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

export const updateResourceData = (data?:any):AppThunk=> async (dispatch)=>{
  const response = await requestWrapper(
    API.patch(API_CONFIG.URLS.RESOURCES.UPDATE_RESOURCE,data),
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

export const fetchResourceData=(data?:any):AppThunk=> async (dispatch)=>{
  
    const response = await requestWrapper(
      API.get(API_CONFIG.URLS.RESOURCES.FETCH_RESOURCE,data),
      dispatch,
      (res) => {
        dispatch({
          type: FETCH_RESOURCE_DATA,
          payload: res.data,
        });
      },
      undefined,
      true
    );
    return response;
  }

  export const deleteResourceData = (data?:any):AppThunk=> async (dispatch)=>{
    const response = await requestWrapper(
      API.del(API_CONFIG.URLS.RESOURCES.DELETE_RESOURCE,data),
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