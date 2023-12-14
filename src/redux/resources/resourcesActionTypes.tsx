
export const FETCH_RESOURCE_DATA="FETCH_RESOURCE_DATA";

export interface FetchResourceData{
  type: typeof FETCH_RESOURCE_DATA,
  payload:any;

}

export type ResourceActionTypes =FetchResourceData;