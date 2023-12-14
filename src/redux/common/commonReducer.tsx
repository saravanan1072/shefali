import { SAVE_LOCATION_DATA, CommonActionTypes, CommonState } from "../common";
import { INITIAL_COMMON_STATE } from "../common/commonState";
import { updateObject } from "../utils";
import {
  CREATE_NEW_ENTRY,
  DOWNLOAD_FILE,
  FORM_SUBMIT_CLICKED,
  HIDE_HAMBURGER_MENU,
  HIDE_LOADER,
  HIDE_POPUP,
  HIDE_TOAST,
  RESET_SUBMIT_CLICK,
  SAVE_ACCOUNT_MANAGER_DATA,
  SAVE_EXPERTISE_DATA,
  SHOW_HAMBURGER_MENU,
  SHOW_LOADER,
  SHOW_POPUP,
  SHOW_TOAST,
} from "./commonActionTypes";

const initialState: CommonState = {
  ...INITIAL_COMMON_STATE,
};

const saveLocationDetails = (state, action) => {
  return updateObject(state, {
    locationArray: action.payload,
  });
};

const saveExpertiseDetails = (state, action) => {
  return updateObject(state, {
    expertiseArray: action.payload,
  });
};

const saveAccountManagerDetails = (state, action) => {
  return updateObject(state, {
    accountManagerArray: action.payload,
  });
};

const showPopupData = (state, action) => {
  return updateObject(state, {
    popup: {
      visible: true,
      messageData: action.payload,
      classAdditions:action.className
    },
  });
};

const hidePopupData = (state, action) => {
  return updateObject(state, {
    popup: {
      visible: false,
      messageData: {},
    },
  });
};

const formBtnClicked = (state) => {
  return updateObject(state, {
    formBtnClicked: true,
  });
};

const resetSubmitClick = (state) => {
  return updateObject(state, {
    formBtnClicked: false,
  });
};

const showLoaderFn = (state) => {
  return updateObject(state, {
    loader: true,
  });
};

const hideLoaderFn = (state) => {
  return updateObject(state, {
    loader: false,
  });
};

const showToasterFn = (state, action) => {
  return updateObject(state, {
    toaster: {
      visible: true,
      messageData: action.payload,
    },
  });
};

const hideToasterFn = (state, action) => {
  return updateObject(state, {
    toaster: {
      visible: false,
    },
  });
};


const showHamburgerFn = (state, action) => {
  return updateObject(state, {
    hamburger:true
  });
};

const hideHamburgerFn = (state, action) => {
  return updateObject(state, {
    hamburger:false
  });
};

const newEntryCreatedFn = (state) => {
  return updateObject(state, {
    newEntry: true,
  });
};

const commonReducer = (state = initialState, action: CommonActionTypes) => {
  switch (action.type) {
    case SAVE_LOCATION_DATA:
      return saveLocationDetails(state, action);
    case SAVE_EXPERTISE_DATA:
      return saveExpertiseDetails(state, action);
    case SAVE_ACCOUNT_MANAGER_DATA:
      return saveAccountManagerDetails(state, action);
    case SHOW_POPUP:
      return showPopupData(state, action);
    case HIDE_POPUP:
      return hidePopupData(state, action);
    case FORM_SUBMIT_CLICKED:
      return formBtnClicked(state);
    case RESET_SUBMIT_CLICK:
      return resetSubmitClick(state);
    case SHOW_LOADER:
      return showLoaderFn(state);
    case HIDE_LOADER:
      return hideLoaderFn(state);
    case SHOW_TOAST:
      return showToasterFn(state, action);
      break;
    case HIDE_TOAST:
      return hideToasterFn(state, action);
      break;
    case SHOW_HAMBURGER_MENU:
      return showHamburgerFn(state, action);
      break;
    case HIDE_HAMBURGER_MENU:
      return hideHamburgerFn(state, action);
      break;
    case CREATE_NEW_ENTRY:
      return newEntryCreatedFn(state);
    default:
      return state;
  }
};

export default commonReducer;
