
import { AppThunk } from "../types";
import { API, API_CONFIG } from "../../apis";
import { requestWrapper } from "../../utils";
import { FETCH_CLIENT_DATA, FETCH_CLIENT_REQUIREMENT_DATA } from "./clientsActionTypes";

export const createClientData =(data?:any):AppThunk=> async (dispatch) => {
  const response = await requestWrapper(
    API.post(API_CONFIG.URLS.CLIENTS.CREATE_CLIENT,data),
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

export const updateClientData =(data?:any):AppThunk=> async (dispatch) => {
    const response = await requestWrapper(
      API.patch(API_CONFIG.URLS.CLIENTS.UPDATE_CLIENT,data),
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
  
  export const fetchClientData=(data?:any):AppThunk=> async (dispatch)=>{
  
    const response = await requestWrapper(
      API.get(API_CONFIG.URLS.CLIENTS.FETCH_CLIENT,data),
      dispatch,
      (res) => {
        dispatch({
          type: FETCH_CLIENT_DATA,
          payload: res.data,
        });
      },
      undefined,
      true
    );
    return response;
  }

  export const deleteClientData =(data?:any):AppThunk=> async (dispatch) => {
    const response = await requestWrapper(
      API.del(API_CONFIG.URLS.CLIENTS.DELETE_CLIENT,data),
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

  export const createClientRequirement =(data?:any):AppThunk=> async (dispatch) => {
    const response = await requestWrapper(
      API.post(API_CONFIG.URLS.CLIENTS.CREATE_CLIENT_REQUIREMENT,data),
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

  export const fetchClientRequirementData=(data?:any):AppThunk=> async (dispatch)=>{
  
    const response = await requestWrapper(
      API.get(API_CONFIG.URLS.CLIENTS.FETCH_CLIENT_REQUIREMENT,data),
      dispatch,
      (res) => {
        dispatch({
          type: FETCH_CLIENT_REQUIREMENT_DATA,
          payload: res.data,
        });
      },
      undefined,
      true
    );
    return response;
  }

  export const updateClientRequirementData =(data?:any):AppThunk=> async (dispatch) => {
    const response = await requestWrapper(
      API.patch(API_CONFIG.URLS.CLIENTS.UPDATE_CLIENT_REQUIREMENT,data),
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

  export const deleteClientRequirementData =(data?:any):AppThunk=> async (dispatch) => {
    const response = await requestWrapper(
      API.del(API_CONFIG.URLS.CLIENTS.DELETE_CLIENT_REQUIREMENT,data),
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
 