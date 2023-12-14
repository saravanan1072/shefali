export const FETCH_CLIENT_DATA = "FETCH_CLIENT_DATA";
export const FETCH_CLIENT_REQUIREMENT_DATA = "FETCH_CLIENT_REQUIREMENT_DATA";

export interface FetchClientData {
  type: typeof FETCH_CLIENT_DATA;
  payload: any;
}

export interface FetchClientRequirementData {
  type: typeof FETCH_CLIENT_REQUIREMENT_DATA;
  payload: any;
}

export type ClientActionTypes = FetchClientData|FetchClientRequirementData;
