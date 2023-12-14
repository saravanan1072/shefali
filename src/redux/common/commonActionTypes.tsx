import { PopupData } from "../../interfaces";

export const SAVE_LOCATION_DATA = "SAVE_LOCATION_DATA";
export const SAVE_EXPERTISE_DATA = "SAVE_EXPERTISE_DATA";
export const SHOW_POPUP = "SHOW_POPUP";
export const HIDE_POPUP = "HIDE_POPUP";
export const FORM_SUBMIT_CLICKED = "FORM_SUBMIT_CLICKED";
export const RESET_SUBMIT_CLICK = "RESET_SUBMIT_CLICK";
export const SHOW_LOADER = "SHOW_LOADER";
export const HIDE_LOADER = "HIDE_LOADER";
export const DOWNLOAD_FILE = "DOWNLOAD_FILE";
export const SAVE_ACCOUNT_MANAGER_DATA = "SAVE_ACCOUNT_MANAGER_DATA";
export const SHOW_TOAST = "SHOW_TOAST";
export const HIDE_TOAST = "HIDE_TOAST";
export const CREATE_NEW_ENTRY = "CREATE_NEW_ENTRY";
export const SHOW_HAMBURGER_MENU = "SHOW_HAMBURGER_MENU";
export const HIDE_HAMBURGER_MENU = "HIDE_HAMBURGER_MENU";

export interface SaveLocationData {
  type: typeof SAVE_LOCATION_DATA;
  payload: any;
}

export interface SaveExpertiseData {
  type: typeof SAVE_EXPERTISE_DATA;
  payload: any;
}

export interface ShowPopupAction {
  type: typeof SHOW_POPUP;
  payload: PopupData;
  className:any;
}

export interface HidePopupAction {
  type: typeof HIDE_POPUP;
}

export interface FormSubmitClicked {
  type: typeof FORM_SUBMIT_CLICKED;
}

export interface ResetSubmitClick {
  type: typeof RESET_SUBMIT_CLICK;
}

export interface ShowLoaderAction {
  type: typeof SHOW_LOADER;
}

export interface HideLoaderAction {
  type: typeof HIDE_LOADER;
}

export interface ShowHamburgerAction {
  type: typeof SHOW_HAMBURGER_MENU;
}

export interface HideHamburgerAction {
  type: typeof HIDE_HAMBURGER_MENU;
}

export interface SaveAccountManagerData {
  type: typeof SAVE_ACCOUNT_MANAGER_DATA;
  payload: any;
}

export interface ShowToastAction {
  type: typeof SHOW_TOAST;
  payload: any;
}

export interface HideToastAction {
  type: typeof HIDE_TOAST;
}

export interface CreateNewEntryAction {
  type: typeof CREATE_NEW_ENTRY;
}

export type CommonActionTypes =
  | SaveLocationData
  | SaveExpertiseData
  | ShowPopupAction
  | HidePopupAction
  | FormSubmitClicked
  | ResetSubmitClick
  | ShowLoaderAction
  | HideLoaderAction
  | SaveAccountManagerData
  | ShowToastAction
  | HideToastAction
  | ShowHamburgerAction
  | HideHamburgerAction
  | CreateNewEntryAction;
