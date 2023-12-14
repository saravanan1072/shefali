import {
  DOWNLOAD_FILE,
  FORM_SUBMIT_CLICKED,
  HIDE_LOADER,
  HIDE_POPUP,
  RESET_SUBMIT_CLICK,
  SAVE_ACCOUNT_MANAGER_DATA,
  SAVE_EXPERTISE_DATA,
  SAVE_LOCATION_DATA,
  SHOW_LOADER,
  SHOW_POPUP,
  HIDE_TOAST,
  SHOW_TOAST,
  CREATE_NEW_ENTRY,
  SHOW_HAMBURGER_MENU,
  HIDE_HAMBURGER_MENU,
} from "./commonActionTypes";
import { AppThunk } from "../types";
import { API, API_CONFIG } from "../../apis";
import { requestWrapper } from "../../utils";
import { PopupData } from "../../interfaces";

export const saveLocationDetails = (): AppThunk => async (dispatch) => {
  const response = await requestWrapper(
    API.get(API_CONFIG.URLS.VENDORS.FETCH_LOCATION),
    dispatch,
    (res) => {
      dispatch({
        type: SAVE_LOCATION_DATA,
        payload: res,
      });
    },
    undefined
  );
  return response;
};

export const saveExpertiseDetails = (): AppThunk => async (dispatch) => {
  const response = await requestWrapper(
    API.get(API_CONFIG.URLS.EXPERTISE),
    dispatch,
    (res) => {
      dispatch({
        type: SAVE_EXPERTISE_DATA,
        payload: res.data,
      });
    },
    undefined
  );
  return response;
};

export const saveAccountManagerDetails = (): AppThunk => async (dispatch) => {
  const response = await requestWrapper(
    API.get(API_CONFIG.URLS.ACCOUNT_MANAGER),
    dispatch,
    (res) => {
      dispatch({
        type: SAVE_ACCOUNT_MANAGER_DATA,
        payload: res,
      });
    },
    undefined
  );
  return response;
};

export const showPopup =
  (data: PopupData,classes?:any): AppThunk =>
  async (dispatch) => {
    dispatch({
      type: SHOW_POPUP,
      payload: data,
      className:classes
    });
  };

export const hidePopup = (): AppThunk => async (dispatch) => {
  dispatch({
    type: HIDE_POPUP,
  });
};

export const formSubmitClicked = (): AppThunk => async (dispatch) => {
  dispatch({
    type: FORM_SUBMIT_CLICKED,
  });
};

export const resetSubmitClick = (): AppThunk => async (dispatch) => {
  dispatch({
    type: RESET_SUBMIT_CLICK,
  });
};

export const showLoader = (): AppThunk => async (dispatch) => {
  dispatch({
    type: SHOW_LOADER,
  });
};

export const hideLoader = (): AppThunk => async (dispatch) => {
  dispatch({
    type: HIDE_LOADER,
  });
};

export const showHamburgerMenu = (): AppThunk => async (dispatch) => {
  dispatch({
    type: SHOW_HAMBURGER_MENU,
  });
};

export const hideHamburgerMenu = (): AppThunk => async (dispatch) => {
  dispatch({
    type: HIDE_HAMBURGER_MENU,
  });
};

export const showToaster = (data): AppThunk => async (dispatch) => {
  dispatch({
      type: SHOW_TOAST,
      payload: data,
  });
};

export const hideToaster = (): AppThunk => async (dispatch) => {
  dispatch({
      type: HIDE_TOAST,
  });
};

export const newEntryCreated = (): AppThunk => async (dispatch) => {
  dispatch({
      type: CREATE_NEW_ENTRY,
  });
};

